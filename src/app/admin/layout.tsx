import { Metadata } from "next"
import Provider from "../components/Provider"
import { EdgeStoreProvider } from '../../lib/edgestore'

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
        <EdgeStoreProvider>
          {children}
          </EdgeStoreProvider>
      </Provider>
    </section>
  )
}
