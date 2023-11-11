import { id_schema } from "@/app/types";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Link } from "@prisma/client";
import { UseMutationResult } from "@tanstack/react-query";
import { ExternalLink, Trash2, X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";

type SortableItemProps = {
    item: Link,
    deleteLinksMutation: UseMutationResult<any, Error, z.infer<typeof id_schema>, unknown>,
    isActiveMutation: UseMutationResult<any, Error, z.infer<typeof id_schema>, unknown>
}


export default function SortableItem(props: SortableItemProps) {
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
            <TableCell className="font-medium">{props.item.index}</TableCell>
            <TableCell className="font-medium">{props.item.title}</TableCell>
            <TableCell>
                <a target="_blank" href={props.item.href}><ExternalLink size={18} color="#000000" /></a>
            </TableCell>
            <TableCell className=""><Checkbox checked={ischecked} onCheckedChange={onChecked} id={"ch" + props.item.title} /></TableCell>
            <TableCell>
                <X className="float-right" size={18} onClick={() => { props.deleteLinksMutation.mutate({ _id: props.item.id }) }} />
            </TableCell>
        </TableRow>
    )
}