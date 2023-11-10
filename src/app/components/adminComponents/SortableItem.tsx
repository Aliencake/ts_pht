import { id_schema } from "@/app/types";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Link } from "@prisma/client";
import { UseMutationResult } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

type SortableItemProps = { item: Link, deleteLinksMutation: UseMutationResult<any, Error, z.infer<typeof id_schema>, unknown> }


export default function SortableItem(props: SortableItemProps) {

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

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <p>{props.item.title}</p>
            {/* <X onClick={() => { props.deleteLinksMutation.mutate({ _id: props.item.id }) }} /> */}

        </div>
    )
}