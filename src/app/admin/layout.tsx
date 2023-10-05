import Provider from "../components/Provider"

export default function AdminLayout({
  
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Provider>
          {children}
        </Provider>
      </section>
    )
  }
