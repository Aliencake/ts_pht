import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { add_social_link_schema } from "../../types"
import { useState } from "react"
import { UseMutationResult } from '@tanstack/react-query'


type AddLinksDialogProps = { mutation: UseMutationResult<any, Error, z.infer<typeof add_social_link_schema>, unknown> };



export function AddLinksDialog({ mutation }: AddLinksDialogProps) {
  const form = useForm<z.infer<typeof add_social_link_schema>>({
    resolver: zodResolver(add_social_link_schema),
    defaultValues: {
      title: "",
      href: "",
        },
  })
  const [open, setOpen] = useState(false)


  function onSubmit(values: z.infer<typeof add_social_link_schema>) {
    mutation.mutate(values)
    form.reset()
    setOpen(false)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4" disabled={mutation.isPending} variant="outline">
          {mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Додаємо</> : <>Додати нове посилання</>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Додати нове посилання</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Назва</FormLabel>
                      <FormControl>
                        <Input placeholder="Телега" className="col-span-3 w-max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name="href"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Посилання</FormLabel>
                      <FormControl>
                        <Input placeholder="https://t.me/" className="col-span-3 w-max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Додати</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}