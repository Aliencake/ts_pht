import { id_schema } from '@/app/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Media, Type } from '@prisma/client';
import { UseMutationResult } from '@tanstack/react-query';
import { FileVideo, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { TableCell, TableRow } from '../ui/table';
import Image from 'next/image';

type SortableMediaProps = {
  item: Media;
  deleteMediaMutation: UseMutationResult<
    any,
    Error,
    z.infer<typeof id_schema>,
    unknown
  >;
  index: number;
};

export default function SortableMedia(props: SortableMediaProps) {
  const [isLoading, setIsLoading] = useState(true);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const thumbnail =
    props.item.type === Type.PHOTO ? props.item.thumbnail : false;

  return (
    <TableRow
      key={props.item.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TableCell className="font-medium">{props.index}</TableCell>
      <TableCell>
        {thumbnail ? (
          <div className="h-16 w-auto">
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              <Image
                height={50}
                width={50}
                src={thumbnail}
                alt="thumbnail"
                onLoad={handleImageLoad}
                className="rounded-md"
              />
          </div>
        ) : (
            <FileVideo className="rounded-md h-14 " />
        )}
      </TableCell>
      <TableCell className="font-medium">{props.item.type}</TableCell>
      <TableCell>
      <div className="flex justify-center">

        <X
          className="float-right"
          size={18}
          onClick={() => {
            props.deleteMediaMutation.mutate({ _id: props.item.id });
          }}
        />
      </div>
      </TableCell>
    </TableRow>
  );
}
