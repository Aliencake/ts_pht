import { Aperture } from 'lucide-react';

export default function Loading() {
  return (
    <main className="flex z-10 h-full w-full flex-grow flex-col place-content-center items-center absolute">
      <Aperture
        className="animate-[spin_1.0s_linear_infinite]"
        size={100}
        color="#7F0000"
        strokeWidth={0.75}
      />
    </main>
  );
}
