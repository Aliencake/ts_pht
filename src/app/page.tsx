export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Привіт</div>
      <a href="/admin/signin" className=" border-black border-4 border-opacity-60"> Перейти до адмін панелі</a>
    </main>
  )
}
