import { id_schema } from '@/app/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Media, Type } from '@prisma/client';
import { UseMutationResult } from '@tanstack/react-query';
import { FileVideo, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { TableCell, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';

type SortableMediaProps = {
  item: Media;
  deleteMediaMutation: UseMutationResult<
    any,
    Error,
    z.infer<typeof id_schema>,
    unknown
  >;
  isActiveMutation: UseMutationResult<
    any,
    Error,
    z.infer<typeof id_schema>,
    unknown
  >;
  index: number;
};

export default function SortableMedia(props: SortableMediaProps) {
  const [ischecked, setChecked] = useState<boolean>(props.item.isActive);

  const [isLoading, setIsLoading] = useState(true);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function onChecked(checked: boolean) {
    setChecked(checked);
    props.isActiveMutation.mutate({ _id: props.item.id });
  }

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
          <div className='h-16 w-auto'>
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            <div className="flex justify-center">
              <Image
                height={60}
                width={60}
                src={thumbnail}
                alt="thumbnail"
                onLoad={handleImageLoad}
                className='rounded-md'
              />
            </div>
          </div>
        ) : (
          // 
          <div className="flex justify-center">
            <FileVideo className='rounded-md h-14 ' />
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{props.item.type}</TableCell>
      <TableCell>
        <Checkbox
          checked={ischecked}
          onCheckedChange={onChecked}
          id={'ch' + props.item.id}
        />
      </TableCell>
      <TableCell>
        <X
          className="float-right"
          size={18}
          onClick={() => {
            props.deleteMediaMutation.mutate({ _id: props.item.id });
          }}
        />
      </TableCell>
    </TableRow>
  );
}
