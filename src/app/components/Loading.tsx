import { Aperture } from 'lucide-react'

export default function Loading() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between mt-[200px]">
        <Aperture className='animate-[spin_1s_linear_infinite]' size={70} color="#7F0000" strokeWidth={0.75} />
      </main>
    )
  }
  