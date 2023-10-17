'use client'
import { useSession, signOut } from "next-auth/react"
import { redirect, useRouter} from 'next/navigation'
import Loading from "../components/Loading"
import { Button } from "../components/ui/button"

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
    return <Loading></Loading>
  }
  return (
    <main className="flex flex-col items-center justify-between align-middle space-y-8">
    <p className=" mt-4">Адмін сторінка</p>
    <Button onClick={()=>{signOut()}}>Кнопка виходу</Button>
    <a href="/"><Button>Повернутись на головну сторінку</Button></a>
    
    </main>
  )
}
