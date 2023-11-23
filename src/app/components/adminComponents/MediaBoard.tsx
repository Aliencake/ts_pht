import { Category, Media, Type } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { AlertCircle, FolderOpen } from "lucide-react"

import { MultiFileDropzoneUsage } from "./UploadFiles";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { add_media_schema, id_schema, update_array_index_schema } from "@/app/types";
import { z } from "zod";
import axios from "axios";
import {
    DndContext,
    DragEndEvent,
    closestCenter,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { restrictToParentElement, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useEdgeStore } from "@/lib/edgestore";


type MediaBoardDialogProps = { category: Category, queryClient: QueryClient, };

const SortableMedia = dynamic(() => import("./SortableMedia"), {
    ssr: false,
});


export function MediaBoardDialog(props: MediaBoardDialogProps) {
    const [media, setMedia] = useState<Media[]>()
    const { edgestore } = useEdgeStore();

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    })
    const sensors = useSensors(
        mouseSensor,
        touchSensor,
    )

    const DeleteMediaMutation = useMutation(
        {
            mutationFn: async (form: z.infer<typeof id_schema>) => {
                const res = await axios
                    .delete("api/media", { data: form })
                return res.data
            },
            onMutate: async (form) => {
                await props.queryClient.cancelQueries({ queryKey: [`media${props.category.id}`] })

                const previousCategories = props.queryClient.getQueryData([`media${props.category.id}`])

                setMedia(media?.filter((item) => item.id !== form._id))

                return previousCategories
            },
            onSuccess: () => {
                props.queryClient.invalidateQueries({ queryKey: [`media${props.category.id}`] })
            },
        })

    const UpdateMediaMutation = useMutation({
        mutationFn: async (form: z.infer<typeof update_array_index_schema>) => {
            const res = await axios
                .post("api/media", { data: form })
            return res.data
        },
        onSuccess: () => {
            props.queryClient.invalidateQueries({ queryKey: [`media${props.category.id}`] })
        },
    })

    const IsActiveMediasMutation = useMutation({
        mutationFn: async (form: z.infer<typeof id_schema>) => {
            const res = await axios
                .put("api/media/active", { data: form })
            return res.data
        },
        onSuccess: () => {
            props.queryClient.invalidateQueries({ queryKey: [`media${props.category.id}`] })
        },
    })

    const AddMediaMutation = useMutation(
        {
            mutationFn: async (form: z.infer<typeof add_media_schema>) => {
                const res = await axios
                    .put("api/media", form)
                let updatedMedia = media
                updatedMedia?.push(res.data)
                setMedia(updatedMedia)
                return res.data
            },
            onSuccess: () => {
                props.queryClient.invalidateQueries({ queryKey: [`media${props.category.id}`] })
            },
        })

    function handlerDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (media === undefined) return
        let MediaToMove: Media[] = media

        if (active.id !== over?.id) {
            let activeMediaIndex = 0
            let overMediaIndex = 0
            for (let n in MediaToMove) {
                if (MediaToMove[n].id == active.id) {
                    activeMediaIndex = Number(n)
                }
                if (MediaToMove[n].id == over?.id) {
                    overMediaIndex = Number(n)
                }
            }
            MediaToMove = arrayMove(MediaToMove, activeMediaIndex, overMediaIndex)
            let newMedia = []
            for (let x in MediaToMove) {
                newMedia.push({ '_id': MediaToMove[x].id, 'index': Number(x) })
            }
            setMedia(MediaToMove)
            UpdateMediaMutation.mutate(newMedia)
        }
    }

    const { data, error, isLoading } = useQuery({
        queryKey: [`media${props.category.id}`],
        queryFn: async () => {
            const res = await axios
                .get("api/media", {
                    params: {
                        Category_ID: props.category.id
                    }
                })
                .then(res => res.data)
            return res
        },
        staleTime: Infinity,
        retry: 10
    })

    if (isLoading) return


    if (error) {
        console.log(error)
        return <AlertCircle color="#c72e2e" />
    }

    if (!media) {
        setMedia(data)
    }


    return (
        <Dialog>

            <DialogTrigger asChild>
                <FolderOpen color="#000000" strokeWidth={1.5} />
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center overflow-y-auto" >
                <DialogHeader>
                    <DialogTitle>{props.category.title}</DialogTitle>
                </DialogHeader>
                <MultiFileDropzoneUsage categoryId={props.category.id} mutation={AddMediaMutation} />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Індекс</TableHead>
                            <TableHead>Превью</TableHead>
                            <TableHead>Тип</TableHead>
                            <TableHead>Активне</TableHead>
                            <TableHead className="text-right">Видалити</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handlerDragEnd}
                            modifiers={[restrictToWindowEdges, restrictToParentElement]}
                            sensors={sensors}
                        >
                            {media ? <SortableContext
                                items={media}
                                strategy={verticalListSortingStrategy}
                            >
                                {media.map((item, index) =>
                                    <SortableMedia key={item.id} item={item} deleteMediaMutation={DeleteMediaMutation} isActiveMutation={IsActiveMediasMutation} index={index + 1} />
                                )
                                }
                            </SortableContext> :
                                <Skeleton className="w-[100px] h-[50px]" />}
                        </DndContext>
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    )
}