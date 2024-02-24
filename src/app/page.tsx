'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ImageSlider from './components/Slider';

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ImageSlider />
      </QueryClientProvider>
    </main>
  );
}
