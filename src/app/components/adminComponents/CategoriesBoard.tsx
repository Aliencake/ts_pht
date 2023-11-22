import axios from "axios"
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { z } from "zod"
import { useState } from "react"
import { Category } from '@prisma/client'
import { add_category_schema, id_schema, update_array_index_schema } from "@/app/types"
import dynamic from 'next/dynamic';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { Skeleton } from "../ui/skeleton"
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
import { AddCategoryDialog } from "./AddCategoryDialog"


const SortableCategory = dynamic(() => import("./SortableCategory"), {
    ssr: false,
});


type CategoriesBoardProps = { queryClient: QueryClient }

export default function CategoriesBoard({ queryClient }: CategoriesBoardProps) {
    const [categories, setCategories] = useState<Category[]>()

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


    const AddCategoriesMutation = useMutation(
        {
            mutationFn: async (form: z.infer<typeof add_category_schema>) => {
                const res = await axios
                    .put("api/categories", form)
                let updatedCategories = categories
                updatedCategories?.push(res.data)
                setCategories(updatedCategories)
                return res.data
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['categories'] })
            },
        })

    const DeleteCategoriesMutation = useMutation(
        {
            mutationFn: async (form: z.infer<typeof id_schema>) => {
                const res = await axios
                    .delete("api/categories", { data: form })
                return res.data
            },
            onMutate: async (form) => {
                await queryClient.cancelQueries({ queryKey: ['categories'] })

                const previousCategories = queryClient.getQueryData(['categories'])

                setCategories(categories?.filter((item) => item.id !== form._id))

                return previousCategories 
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['categories'] })
            },
        })

    const UpdateCategoriesMutation = useMutation({
        mutationFn: async (form: z.infer<typeof update_array_index_schema>) => {
            const res = await axios
                .post("api/categories", { data: form })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    const IsActiveCategoriesMutation = useMutation({
        mutationFn: async (form: z.infer<typeof id_schema>) => {
            const res = await axios
                .put("api/categories/active", { data: form })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    const { data, error, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axios
                .get("api/categories")
                .then(res => res.data)
            return res
        },
        staleTime: Infinity,
    })

    if (isLoading) return <Skeleton className="w-[300px] h-[200px]" />


    if (error) {
        return <h1>{JSON.stringify(error)}</h1>
    }

    if (data?.name == ('PrismaClientInitializationError' || 'PrismaClientKnownRequestError')) return "База даних не робе"

    function handlerDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (categories === undefined) return
        let categoriesToMove: Category[] = categories

        if (active.id !== over?.id) {
            let activeCategoryIndex = 0
            let overCategoryIndex = 0
            for (let n in categoriesToMove) {
                if (categoriesToMove[n].id == active.id) {
                    activeCategoryIndex = Number(n)
                }
                if (categoriesToMove[n].id == over?.id) {
                    overCategoryIndex = Number(n)
                }
            }
            categoriesToMove = arrayMove(categoriesToMove, activeCategoryIndex, overCategoryIndex)
            let newCategories = []
            for (let x in categoriesToMove) {
                newCategories.push({ '_id': categoriesToMove[x].id, 'index': Number(x) })
            }
            setCategories(categoriesToMove)
            UpdateCategoriesMutation.mutate(newCategories)
        }
    }


    if (!categories) {
        setCategories(data)
    }

    return (
        <div className="flex flex-col items-center justify-between shrink ">
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handlerDragEnd}
                modifiers={[restrictToWindowEdges, restrictToParentElement]}
                sensors={sensors}
            >
                {categories ? <SortableContext
                    items={categories}
                    strategy={verticalListSortingStrategy}
                >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Індекс</TableHead>
                                <TableHead className="w-[100px]">Назва</TableHead>
                                <TableHead className="w-[100px]">Медіа</TableHead>
                                <TableHead>Активне</TableHead>
                                <TableHead className="text-right">Видалити</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((item, index) =>
                                <SortableCategory key={item.id} item={item} deleteLinksMutation={DeleteCategoriesMutation} isActiveMutation={IsActiveCategoriesMutation} index={index+1} queryClient={queryClient}/>
                            )
                            }
                        </TableBody>
                    </Table>
                    <Skeleton/>
                </SortableContext> :
                    <Skeleton className="w-[300px] h-[200px]" />}
            </DndContext>
            <AddCategoryDialog mutation={AddCategoriesMutation} />
        </div>
    )
}   
