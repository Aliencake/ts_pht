import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

export default function NavBar() {
  return (
    <nav className='flex w-full justify-center bg-[#fefefe] shadow-md shadow-black/5 space-x-4'>
      <div>
        <a href='/'>
          <Image src={'/favicon_round.ico'} height={60} width={60} alt='' />
        </a>
      </div>
      <div className=' mt-2'>
        <Button variant='outline' onClick={() => { signOut() }}>Log out<LogOut color="#b70000" className=' pl-1' size={25} /></Button>
      </div>
    </nav>
  )
}
