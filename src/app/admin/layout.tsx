import Provider from "../components/Provider"

export default function AdminLayout({
  
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Provider>
          {children}
        </Provider>
      </section>
    )
  }
