import { PlusCircle, Trash2 } from "lucide-react"
import { AddLinksDialog } from "./Dialog"
import { useEffect, useState } from "react"
import { Link } from '@prisma/client'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from "axios"
import { Skeleton } from "../ui/skeleton"
import { z } from "zod"
import { add_social_link_schema } from "@/app/types"


export default function LinksBoard() {

    const queryClient = new QueryClient()
    const [isHovering, setIsHovering] = useState(false)
    const LinksMutation = useMutation({
        mutationFn: (form: z.infer<typeof add_social_link_schema>) => {
            return axios    
        .post("api/links", form)
        .then(res => res.data)
        },
        onSuccess: () => {
            queryClient.setQueryData(["links", data.id], data)
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
            <p>Посилання</p>
            <ul
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="flex flex-row rounded-lg  border-solid border-2 border-black">
                {
                    new_data.map((item, index) => {
                        return <li draggable className="m-4 flex flex-row"
                            id={item.title}
                            key={item.id}>
                            <a className="hover:text-black/50" target="_blank" href={item.href}>{item.title}</a>
                            {/* {isHovering ? <Trash2 onClick={() => { updateSocialLinks(new_data.filter((l) => l.id !== item.id)) }} /> : <></>} */}
                        </li>
                    })
                }
                <li>
                    <AddLinksDialog mutation={LinksMutation} />
                </li>
            </ul>
        </div>
    )
}   
