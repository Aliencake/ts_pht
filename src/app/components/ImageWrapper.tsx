import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { useSwiperSlide } from 'swiper/react';
import Loading from './Loading';

type ImageWrapperProps = {
  href: string;
  className?: string;
};

export default function ImageWrapper(props: ImageWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const swiperSlide = useSwiperSlide();

  return (
    <div>
      <Image
        src={props.href}
        fill
        loading="lazy"
        alt={'image'}
        className={cn('object-cover pointer-events-none', props.className)}
        sizes="(min-width: 850px) 100vw, 65vw"
        quality={100}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && <Loading />}
    </div>
  );
}
