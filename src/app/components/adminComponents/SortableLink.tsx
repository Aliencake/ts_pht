import { id_schema } from '@/app/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from '@prisma/client';
import { UseMutationResult } from '@tanstack/react-query';
import { ExternalLink, X } from 'lucide-react';
import { z } from 'zod';
import { TableCell, TableRow } from '../ui/table';

type SortableLinkProps = {
  item: Link;
  deleteLinksMutation: UseMutationResult<
    any,
    Error,
    z.infer<typeof id_schema>,
    unknown
  >;
  index: number;
};

export default function SortableLink(props: SortableLinkProps) {
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
      <TableCell className="font-medium">{props.index}</TableCell>
      <TableCell className="font-medium max-w-11 truncate">
        {props.item.title}
      </TableCell>
      <TableCell>
        <div className="flex justify-center ">
          <a target="_blank" href={props.item.href}>
            <ExternalLink size={18} color="#000000" />
          </a>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex justify-center">
          <X
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
