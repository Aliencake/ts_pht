import axios from "axios"
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { z } from "zod"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { Link } from '@prisma/client'
import { add_social_link_schema, id_schema, update_social_link_index_schema } from "@/app/types"
import dynamic from 'next/dynamic';
import Grid from "./Grid";
import { Skeleton } from "../ui/skeleton"
import { AddLinksDialog } from "./Dialog"
import {
    DndContext,
    DragEndEvent,
    MouseSensor,
    closestCenter,
    useSensor,
    useSensors
} from "@dnd-kit/core"

import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable"


const SortableItem = dynamic(() => import("./SortableItem"), {
    ssr: false,
});


type LinksBoardProps = { queryClient: QueryClient }

export default function LinksBoard({ queryClient }: LinksBoardProps) {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    })

    const sensors = useSensors(mouseSensor)

    const AddLinksMutation = useMutation({
        mutationFn: async (form: z.infer<typeof add_social_link_schema>) => {
            const res = await axios
                .put("api/links", form)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["links"] })
        }
    })

    const DeleteLinksMutation = useMutation({
        mutationFn: async (form: z.infer<typeof id_schema>) => {
            const res = await axios
                .delete("api/links", { data: form })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["links"] })
        }
    })

    const UpdateLinksMutation = useMutation({
        mutationFn: async (form: z.infer<typeof update_social_link_index_schema>) => {
            const res = await axios
                .post("api/links", { data: form })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["links"] })
        }
    })

    const { data, error, isLoading } = useQuery({
        queryKey: ["links"],
        queryFn: async () => {
            return axios
                .get("api/links")
                .then(res => res.data)
        },
        staleTime: Infinity
    })
    if (isLoading) return <Skeleton className="w-[200px] h-[100px]" />

    if (error) {
        return <h1>{JSON.stringify(error)}</h1>
    }
    // if (data?.name == 'PrismaClientInitializationError') return "База даних не робе"

    const links: Link[] = data


    function handlerDragEnd(event: DragEndEvent) {
        const { active, over } = event
        let linksToMove: Link[] = links
        let activeLink
        let overLink
        
        if (active.id !== over?.id) {
            for (let n in linksToMove){
                if (linksToMove[n].id == active.id){
                    activeLink = linksToMove[n]
                }
                if (linksToMove[n].id == over?.id){
                    overLink = linksToMove[n]
                }
            }
            console.log(activeLink)
            // const activeIndex = links.indexOf(active.id)
            // const overIndex = links.indexOf()
            // return arrayMove(links, activeIndex, overIndex)

        }
    }

    return (
        <main className="flex flex-col items-center justify-between mt-[200px]">
            {/* flex flex-col items-center justify-between mt-[200px] */}
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handlerDragEnd}
                sensors={sensors}
            >
                <h1>Посилання</h1>
                <SortableContext
                    items={links}
                    strategy={rectSortingStrategy}
                >
                    <div className="box-border border-solid rounded border-2">
                        <Grid columns={6}>
                            {links.map((item) =>
                                <SortableItem key={item.id} item={item} deleteLinksMutation={DeleteLinksMutation} />
                            )
                            }
                        </Grid>
                    </div>
                </SortableContext>
            </DndContext>
            <AddLinksDialog mutation={AddLinksMutation} />
        </main>
    )
}   
