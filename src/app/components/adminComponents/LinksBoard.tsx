import { Trash2 } from "lucide-react"
import { AddLinksDialog } from "./Dialog"
import { useState } from "react"
import { Link } from '@prisma/client'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from "axios"
import { Skeleton } from "../ui/skeleton"
import { z } from "zod"
import { add_social_link_schema, id_schema } from "@/app/types"

type LinksBoardProps =  {queryClient: QueryClient}

export default function LinksBoard({queryClient}: LinksBoardProps) {

    const [isHovering, setIsHovering] = useState(false)
    const AddLinksMutation = useMutation({
        mutationFn: async (form: z.infer<typeof add_social_link_schema>) => {
            const res = await axios
                .post("api/links", form)
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

    const new_data: Link[] = data

    return (
        <div className="flex flex-col items-center justify-between mt-[200px]">
            <h1>Посилання</h1>
            <ul
                className="flex flex-row rounded-lg  border-solid border-2 border-black">
                {
                    new_data.map((item, index) => {
                        return <li draggable className="m-4 flex flex-row"
                            id={item.title}
                            key={item.id}>
                            <a className="hover:text-black/50" target="_blank" href={item.href}>{item.title}</a>
                            <Trash2 onClick={() => { DeleteLinksMutation.mutate({ _id: item.id }) }} />
                        </li>
                    })
                }
                <li>
                    <AddLinksDialog mutation={AddLinksMutation} />
                </li>
            </ul>
        </div>
    )
}   
