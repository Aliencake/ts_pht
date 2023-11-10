'use client'
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import Loading from "../components/Loading"
import NavBar from "../components/adminComponents/AdminNavBar"
import LinksBoard from "../components/adminComponents/LinksBoard"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"


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
        <Tabs defaultValue="links" >
          <TabsList>
            <TabsTrigger value="categories">Категорії та фотки</TabsTrigger>
            <TabsTrigger value="links">Посилання</TabsTrigger>
            <TabsTrigger value="activity">Активність</TabsTrigger>
          </TabsList>
          <TabsContent value="categories">Make changes to your account here.</TabsContent>
          <TabsContent value="links"><LinksBoard queryClient={queryClient} /></TabsContent>
          <TabsContent value="activity">Тут буде активність перегяду твого сайту</TabsContent>
        </Tabs>
      </main>
    </QueryClientProvider>
  )
}
