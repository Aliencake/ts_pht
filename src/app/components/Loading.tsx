import { Aperture } from 'lucide-react';

export default function Loading() {
  return (
    <main className="flex min-h-dvh flex-grow flex-col place-content-center items-center">
      <Aperture
        className="animate-[spin_0.9s_linear_infinite]"
        size={100}
        color="#7F0000"
        strokeWidth={0.75}
      />
    </main>
  );
}
