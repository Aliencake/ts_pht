import { Metadata } from "next"
import Provider from "../components/Provider"

export const metadata: Metadata = {
  title: 'Admin page',
  description: 'Admin page',
  icons: '/favicon_round.ico'
}


export default function AdminLayout({
  
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="h-screen w-screen">
        <Provider>
          {children}
        </Provider>
      </section>
    )
  }
