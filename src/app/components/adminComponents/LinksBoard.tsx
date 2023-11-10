import axios, { formToJSON } from "axios"
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { z } from "zod"
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
    closestCenter,
} from "@dnd-kit/core"

import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable"
import { restrictToWindowEdges } from '@dnd-kit/modifiers'



const SortableItem = dynamic(() => import("./SortableItem"), {
    ssr: false,
});


type LinksBoardProps = { queryClient: QueryClient }

export default function LinksBoard({ queryClient }: LinksBoardProps) {
    const [links, setLinks] = useState<Link[]>()
    

    const AddLinksMutation = useMutation(
        {
            mutationFn: async (form: z.infer<typeof add_social_link_schema>) => {
                const res = await axios
                    .put("api/links", form)
                return res.data
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['links'] })
            },
        })

    const DeleteLinksMutation = useMutation(
        {
            mutationFn: async (form: z.infer<typeof id_schema>) => {
                const res = await axios
                    .delete("api/links", { data: form })
                return res.data
            },
            onMutate: async (form) => {
                await queryClient.cancelQueries({ queryKey: ['links'] })
            
                const previousLinks = queryClient.getQueryData(['links'])
            
                setLinks(links?.filter((item) => item.id !== form._id))
            
                return { previousLinks }
              },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['links'] })
            },
        })

    const UpdateLinksMutation = useMutation({
        mutationFn: async (form: z.infer<typeof update_social_link_index_schema>) => {
            const res = await axios
                .post("api/links", { data: form })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] })
        },
    })

    const { data, error, isLoading } = useQuery({
        queryKey: ["links"],
        queryFn: async () => {
            const res = await axios
            .get("api/links")
            .then(res => res.data)
            setLinks(res)
            return res
        },
        // staleTime: Infinity
    })
    if (isLoading) return <Skeleton className="w-[200px] h-[100px]" />

    if (error) {
        return <h1>{JSON.stringify(error)}</h1>
    }

    // if (data?.name == 'PrismaClientInitializationError') return "База даних не робе"

    function handlerDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (links === undefined) return
        let linksToMove: Link[] = links

        if (active.id !== over?.id) {
            let activeLinkIndex = 0
            let overLinkIndex = 0
            for (let n in linksToMove) {
                if (linksToMove[n].id == active.id) {
                    activeLinkIndex = Number(n)
                }
                if (linksToMove[n].id == over?.id) {
                    overLinkIndex = Number(n)
                }
            }
            linksToMove = arrayMove(linksToMove, activeLinkIndex, overLinkIndex)
            let newLinks = []
            for (let x in linksToMove) {
                newLinks.push({ '_id': linksToMove[x].id, 'index': Number(x) })
            }
            setLinks(linksToMove)
            UpdateLinksMutation.mutate(newLinks)
        }
    }

    return (
        <div className="flex flex-col items-center justify-between">
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handlerDragEnd}
                modifiers={[restrictToWindowEdges]}
            >
               {links? <SortableContext
                    items={links}
                    strategy={rectSortingStrategy}
                >
                    <div className="box-border border-solid rounded-xl border-2">
                        {links.length?<Grid columns={6}>
                            {links.map((item) =>
                                <SortableItem key={item.id} item={item} deleteLinksMutation={DeleteLinksMutation} />
                            )
                            }
                        </Grid>: 
                        <p>Список посилань ще порожній, проте можеш їх додати за допомогою кнопки нижче.</p>}
                    </div>
                </SortableContext>:
                <Skeleton className="w-[200px] h-[100px]" />}
            </DndContext>
            <AddLinksDialog mutation={AddLinksMutation} />
        </div>
    )
}   
