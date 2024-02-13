import { id_schema } from '@/app/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Media, Type } from '@prisma/client';
import { UseMutationResult } from '@tanstack/react-query';
import { FileVideo, X } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { TableCell, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';

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
          <img className="w-fit" src={thumbnail} alt="thumbnail" />
        ) : (
          <FileVideo />
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
