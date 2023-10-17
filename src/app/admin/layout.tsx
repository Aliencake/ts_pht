import Provider from "../components/Provider"

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
