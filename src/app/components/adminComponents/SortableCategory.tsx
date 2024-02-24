import { id_schema } from '@/app/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Category } from '@prisma/client';
import { UseMutationResult } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { z } from 'zod';
import { TableCell, TableRow } from '../ui/table';
import { MediaBoardDialog } from './MediaBoard';

type SortableCategoryProps = {
  item: Category;
  deleteLinksMutation: UseMutationResult<
    any,
    Error,
    z.infer<typeof id_schema>,
    unknown
  >;
  index: number;
};

export default function SortableCategory(props: SortableCategoryProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      key={props.item.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TableCell className="font-medium">
        {props.index}
      </TableCell>
      <TableCell className="font-medium">{props.item.title}</TableCell>
      <TableCell className="">
        <div className="flex justify-center">
          <MediaBoardDialog category={props.item} />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex justify-center">
          <X
            className="float-right"
            size={18}
            onClick={() => {
              props.deleteLinksMutation.mutate({ _id: props.item.id });
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
