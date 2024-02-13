import axios from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { useState } from 'react';
import { Link } from '@prisma/client';
import {
  add_social_link_schema,
  id_schema,
  update_array_index_schema,
} from '@/app/types';
import dynamic from 'next/dynamic';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Skeleton } from '../ui/skeleton';
import { AddLinksDialog } from './AddLinksDialog';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToParentElement,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

const SortableLink = dynamic(() => import('./SortableLink'), {
  ssr: false,
});

type LinksBoardProps = { queryClient: QueryClient };

export default function LinksBoard({ queryClient }: LinksBoardProps) {
  const [links, setLinks] = useState<Link[]>();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const AddLinksMutation = useMutation({
    mutationFn: async (form: z.infer<typeof add_social_link_schema>) => {
      const res = await axios.put('api/links', form);
      let updatedLinks = links;
      updatedLinks?.push(res.data);
      setLinks(updatedLinks);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });

  const DeleteLinksMutation = useMutation({
    mutationFn: async (form: z.infer<typeof id_schema>) => {
      const res = await axios.delete('api/links', { data: form });
      return res.data;
    },
    onMutate: async (form) => {
      await queryClient.cancelQueries({ queryKey: ['links'] });

      const previousLinks = queryClient.getQueryData(['links']);

      setLinks(links?.filter((item) => item.id !== form._id));

      return { previousLinks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });

  const UpdateLinksMutation = useMutation({
    mutationFn: async (form: z.infer<typeof update_array_index_schema>) => {
      const res = await axios.post('api/links', { data: form });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });

  const IsActiveLinksMutation = useMutation({
    mutationFn: async (form: z.infer<typeof id_schema>) => {
      const res = await axios.put('api/links/active', { data: form });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const res = await axios.get('api/links').then((res) => res.data);
      return res;
    },
    staleTime: Infinity,
    retry: 10,
  });

  if (isLoading) return <Skeleton className="w-[300px] h-[200px]" />;

  if (error) {
    console.log(error);
    return <h1>Сталася помилка, натисни F12 щоб переглянути.</h1>;
  }

  function handlerDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (links === undefined) return;
    let linksToMove: Link[] = links;

    if (active.id !== over?.id) {
      let activeLinkIndex = 0;
      let overLinkIndex = 0;
      for (let n in linksToMove) {
        if (linksToMove[n].id == active.id) {
          activeLinkIndex = Number(n);
        }
        if (linksToMove[n].id == over?.id) {
          overLinkIndex = Number(n);
        }
      }
      linksToMove = arrayMove(linksToMove, activeLinkIndex, overLinkIndex);
      let newLinks = [];
      for (let x in linksToMove) {
        newLinks.push({ _id: linksToMove[x].id, index: Number(x) });
      }
      setLinks(linksToMove);
      UpdateLinksMutation.mutate(newLinks);
    }
  }

  if (!links) {
    setLinks(data);
  }

  return (
    <div className="flex flex-col items-center justify-between shrink ">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handlerDragEnd}
        modifiers={[restrictToWindowEdges, restrictToParentElement]}
        sensors={sensors}
      >
        {links ? (
          <SortableContext items={links} strategy={verticalListSortingStrategy}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Індекс</TableHead>
                  <TableHead className="w-[100px]">Назва</TableHead>
                  <TableHead>Посилання</TableHead>
                  <TableHead>Активне</TableHead>
                  <TableHead className="text-right">Видалити</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((item, index) => (
                  <SortableLink
                    key={item.id}
                    item={item}
                    deleteLinksMutation={DeleteLinksMutation}
                    isActiveMutation={IsActiveLinksMutation}
                    index={index + 1}
                  />
                ))}
              </TableBody>
            </Table>
            <Skeleton />
          </SortableContext>
        ) : (
          <Skeleton className="w-[300px] h-[200px]" />
        )}
      </DndContext>
      <AddLinksDialog mutation={AddLinksMutation} />
    </div>
  );
}
