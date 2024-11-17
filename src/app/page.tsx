'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ImageSlider from './components/Slider';
import { SvgAnimation } from './components/Test';

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ImageSlider />
        {/* <h1 className="text-center text-2xl font-bold my-4">
          React Spring SVG Animation
        </h1>
        <SvgAnimation /> */}
      </QueryClientProvider>
    </main>
  );
}
