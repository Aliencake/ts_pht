'use client'
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import Loading from "../components/Loading"
import NavBar from "../components/adminComponents/AdminNavBar"
import LinksBoard from "../components/adminComponents/LinksBoard"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import CategoriesBoard from "../components/adminComponents/CategoriesBoard"


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
      <main className="flex flex-col items-center justify-center align-middle space-y-8">
        <NavBar />
        <Tabs defaultValue="categories" >
          <TabsList>
            <TabsTrigger value="categories">Категорії та медіа</TabsTrigger>
            <TabsTrigger value="links">Посилання</TabsTrigger>
            <TabsTrigger value="activity">Активність</TabsTrigger>
          </TabsList>
          <TabsContent value="categories" className="absolute"><CategoriesBoard queryClient={queryClient}/></TabsContent>
          <TabsContent value="links" className="absolute"><LinksBoard queryClient={queryClient} /></TabsContent>
          <TabsContent value="activity" className="absolute">Тут буде активність сайту</TabsContent>
        </Tabs>
      </main>
    </QueryClientProvider>
  )
}
