'use client'

import { useForm } from "react-hook-form"
import { signIn, useSession } from 'next-auth/react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { redirect } from "next/navigation"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Юзернейм повинен мати більше двох знаків",
  }).max(20, {
    message: "Але не більше 20",
  }),
  password: z.string().min(2, {
    message: "Пароль повинен мати більше двох знаків",
  }).max(20, {
    message: "Але не більше 20",
  })
})

export default function Login() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn('credentials',
      {
        username: values.username,
        password: values.password,
        callbackUrl: `/admin`
      }
    )


  }
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <>
      Loading ...
    </>
  }
  if (session) {
    redirect('/admin')
  }

  return (
    <main className="flex flex-col items-center justify-between align-middle">
      <div>
        <h2>Саша привіт!!!</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Юзернейм</FormLabel>
                  <FormControl>
                    <Input placeholder="Твій юзернейм" autoComplete="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="Твій пароль" type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" >Увійти</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}