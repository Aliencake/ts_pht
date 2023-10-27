import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { PlusCircle } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { add_social_link_schema, social_link } from "../../types"
import { Dispatch, SetStateAction, useState } from "react"


type AddLinksDialogProps = { new_social_links: social_link[], updateSocialLinks: Dispatch<SetStateAction<social_link[]>>};



export function AddLinksDialog({new_social_links, updateSocialLinks}: AddLinksDialogProps) {
  const form = useForm<z.infer<typeof add_social_link_schema>>({
    resolver: zodResolver(add_social_link_schema),
  })
  const [open, setOpen] = useState(false);


  function onSubmit(values: z.infer<typeof add_social_link_schema>) {
    const newSocialLinks = [...new_social_links]
    let new_id = newSocialLinks.at(-1)?.id
    if (new_id == undefined) {
      new_id = 0
    }
    else{
      new_id++
    }
    const new_social_link: social_link = {
      id: new_id,
      name: values.name,
      href: values.link,
      index: 2
    }
    newSocialLinks.push(new_social_link)
    updateSocialLinks(newSocialLinks)
    form.reset()
    setOpen(false)
    
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PlusCircle />
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Назва</FormLabel>
                      <FormControl>
                        <Input placeholder="Телеграм" className="col-span-3 w-max" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name="link"
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