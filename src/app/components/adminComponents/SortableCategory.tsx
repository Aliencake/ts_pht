import { id_schema } from "@/app/types";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Category } from "@prisma/client";
import { QueryClient, UseMutationResult } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { MediaBoardDialog } from "./MediaBoard";

type SortableCategoryProps = {
    item: Category,
    deleteLinksMutation: UseMutationResult<any, Error, z.infer<typeof id_schema>, unknown>,
    isActiveMutation: UseMutationResult<any, Error, z.infer<typeof id_schema>, unknown>,
    index: number,
    queryClient: QueryClient
}


export default function SortableCategory(props: SortableCategoryProps) {
    const [ischecked, setChecked] = useState<boolean>(props.item.isActive)


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.item.id });


    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    function onChecked(checked: boolean) {
        setChecked(checked)
        props.isActiveMutation.mutate({ _id: props.item.id })
    }
    return (
        <TableRow key={props.item.id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TableCell className="font-medium">{props.index}</TableCell>
            <TableCell className="font-medium">{props.item.title}</TableCell>
            <TableCell className="">
                <MediaBoardDialog category={props.item} queryClient={props.queryClient}/>
            </TableCell>
            <TableCell className="">
                <Checkbox checked={ischecked} onCheckedChange={onChecked} id={"ch" + props.item.title} />
            </TableCell>
            <TableCell>
                <X className="float-right" size={18} onClick={() => { props.deleteLinksMutation.mutate({ _id: props.item.id }) }} />
            </TableCell>
        </TableRow>
    )
}