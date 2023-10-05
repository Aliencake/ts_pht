'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation'

export default function Page() {
  
  const { data: session, status } = useSession(
    {
    required: true,
    onUnauthenticated() {
      redirect('/admin/signin')
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
    Page loaded
    </>
  )
}
