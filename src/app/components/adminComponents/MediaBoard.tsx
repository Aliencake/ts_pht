import { Category } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogFooter,
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
import { FolderOpen } from "lucide-react"

import { MultiFileDropzoneUsage } from "./UploadFiles";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { add_media_schema } from "@/app/types";
import { z } from "zod";
import axios from "axios";


type MediaBoardDialogProps = { category: Category, queryClient: QueryClient};



export function MediaBoardDialog(props: MediaBoardDialogProps) {

    
    const AddMediaMutation = useMutation(
        {
            mutationFn: async (form: z.infer<typeof add_media_schema>) => {
                const res = await axios
                    .put("api/media", form)
                return res.data
            },
            onSuccess: () => {
                // props.queryClient.invalidateQueries({ queryKey: ['categories'] })
            },
        })


    return (
        <Dialog>
            <DialogTrigger asChild>
                <FolderOpen color="#000000" strokeWidth={1.5} />
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center" >
                <DialogHeader>
                    <DialogTitle>{props.category.title}</DialogTitle>
                </DialogHeader>
                <MultiFileDropzoneUsage categoryId={props.category.id} mutation={AddMediaMutation}/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Індекс</TableHead>
                            <TableHead>Тип</TableHead>
                            <TableHead>Превью</TableHead>
                            <TableHead>Активне</TableHead>
                            <TableHead className="text-right">Видалити</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    )
}