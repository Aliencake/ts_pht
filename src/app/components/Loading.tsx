import Image from 'next/image'

export default function Loading() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between mt-[200px]">
        <Image src="/loading.gif" alt="Loading" width={50} height={50} quality={60} priority={true}/>
      </main>
    )
  }
  