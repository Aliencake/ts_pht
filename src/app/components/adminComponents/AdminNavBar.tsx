import Image from 'next/image';
import MemoryBage from './MemoryBage';

export default function NavBar() {
  return (
    <nav className="flex w-full justify-center bg-[#fefefe] shadow-md shadow-black/5">
      <div className=" flex flex-col items-center">
        <a href="/">
          <Image src={'/favicon_round.ico'} height={70} width={70} alt="" />
        </a>
        <div className=" mb-2">
          <MemoryBage />
        </div>
      </div>
    </nav>
  );
}
