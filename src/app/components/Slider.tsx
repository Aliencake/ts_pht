'use client';

import Image from 'next/image';
import LinksPage from './Links';
import ArrowIcon from './NavArrow';

import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
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
  modules: [Keyboard, Navigation],
  navigation: {
    nextEl: '#swiper-button-next',
    prevEl: '#swiper-button-prev',
  },
  loop: true,
  keyboard: true,
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
            <div
              id="swiper-button-prev"
              className="absolute inset-y-0 left-0 z-[1] flex w-[10%] cursor-pointer items-center"
            >
              <ArrowIcon width={40} height={40} className="opacity-75" />
            </div>
            <div
              id="swiper-button-next"
              className="absolute inset-y-0 right-0 z-[1] flex w-[10%] cursor-pointer items-center"
            >
              <ArrowIcon
                width={40}
                height={40}
                className="opacity-75 rotate-180 right-0 absolute "
              />
            </div>
          </Swiper>
        </SwiperSlide>
      ))}
      <SwiperSlide key="links">
        <LinksPage links={props.links} />
      </SwiperSlide>
    </Swiper>
  );
}
