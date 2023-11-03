'use client'
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import Loading from "../components/Loading"
import NavBar from "../components/adminComponents/AdminNavBar"
import LinksBoard from "../components/adminComponents/LinksBoard"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

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
    return <Loading />
  }


  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col items-center justify-between align-middle space-y-8">
        <NavBar />
        <LinksBoard queryClient={queryClient}/>
      </main>
    </QueryClientProvider>
  )
}
