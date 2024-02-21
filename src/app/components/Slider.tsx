'use client';

import Image from 'next/image';
import LinksPage from './Links';

import { Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { Category, Link, Media } from '@prisma/client';

import 'swiper/css';
import './swiper.css';

type SwiperPageProps = {
  categories: Category[] | null;
  media: Media[] | null;
  links: Link[] | null;
};

const veticalSwiperParams: SwiperOptions = {
  modules: [Mousewheel, Keyboard],
  keyboard: true,
  mousewheel: true,
  direction: 'vertical',
  speed: 1000,
  longSwipesRatio: 0.1,
  edgeSwipeThreshold: 40,
  lazyPreloadPrevNext: 2,
  resistanceRatio: 0,
};

const horizontalSwiperParams: SwiperOptions = {
  modules: [Keyboard],
  loop: true,
  keyboard: true,
  navigation: true,
  longSwipesRatio: 0.1,
  spaceBetween: 0,
  direction: 'horizontal',
  speed: 1000,
  lazyPreloadPrevNext: 2,
  breakpoints: {
    850: {
      slidesPerView: 2,
    },
  },
  slideToClickedSlide: true,
};

export default function ImageSlider(props: SwiperPageProps) {
  return (
    <Swiper {...veticalSwiperParams}>
      {props.categories?.map((category, index) => (
        <SwiperSlide key={index}>
          <Swiper {...horizontalSwiperParams}>
            {props.media &&
              props.media
                .filter((media) => media.categoryId === category.id)
                .map((media, index) => (
                  <SwiperSlide key={index}>
                    {media.type === 'PHOTO' ? (
                      <Image
                        src={media.href}
                        fill
                        loading="lazy"
                        alt={'photo slide ' + index}
                        className="object-cover pointer-events-none"
                      />
                    ) : (
                      <video
                        src={media.href}
                        autoPlay
                        playsInline
                        disablePictureInPicture
                        disableRemotePlayback
                        loop
                        muted
                        className="min-h-dvh object-cover  pointer-events-none"
                      />
                    )}
                  </SwiperSlide>
                ))}
          </Swiper>
        </SwiperSlide>
      ))}
      <SwiperSlide key="links">
        <LinksPage links={props.links} />
      </SwiperSlide>
    </Swiper>
  );
}
