'use client'
import { useSession} from "next-auth/react"
import { redirect } from 'next/navigation'

export default function Page() {
  
  const { data: session, status } = useSession(
    {
    required: true,
    onUnauthenticated() {
      redirect('/admin/login')
    }
  }
  )
  if (status === "loading") {
    return <>
    Loading ...
    </>
  }
  return (
    <>
    Адмін сторінка
    </>
  )
}
