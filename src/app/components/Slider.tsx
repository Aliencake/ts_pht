'use client';

import Image from 'next/image';
import LinksPage from './Links';
import ArrowIcon from './NavArrow';

import {
  Keyboard,
  Mousewheel,
  Navigation,
  HashNavigation,
  Autoplay,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { Category, Link, Media, Settings } from '@prisma/client';
import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import Header from './Header';

import 'swiper/css';
import './swiper.css';
import 'swiper/css/hash-navigation';
import axios from 'axios';
import Loading from './Loading';

export default function ImageSlider() {
  const [currentCategory, setCurrentCategory] = useState(0);

  const veticalSwiperParams: SwiperOptions = {
    modules: [Mousewheel, Keyboard, HashNavigation],
    keyboard: true,
    mousewheel: true,
    direction: 'vertical',
    speed: 1000,
    longSwipesRatio: 0.1,
    edgeSwipeThreshold: 40,
    lazyPreloadPrevNext: 2,
    resistanceRatio: 0,
    hashNavigation: {
      watchState: true,
      replaceState: false,
    },
  };

  const horizontalSwiperParams: SwiperOptions = {
    modules: [Keyboard, Navigation, Autoplay],
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

  const results = useQueries({
    queries: [
      {
        queryKey: ['media'],
        queryFn: () => axios.get('api/media').then((res) => res.data),
        retry: 5,
        staleTime: Infinity,
      },
      {
        queryKey: ['categories'],
        queryFn: () => axios.get('api/categories').then((res) => res.data),
        retry: 5,
        staleTime: Infinity,
      },
      {
        queryKey: ['links'],
        queryFn: () => axios.get('api/links').then((res) => res.data),
        retry: 5,
        staleTime: Infinity,
      },
      {
        queryKey: ['autoplay'],
        queryFn: () =>
          axios.get('api/settings/autoplay').then((res) => res.data),
        retry: 5,
        staleTime: Infinity,
      },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
        error: results.some((result) => result.isError),
      };
    },
  });

  if (results.pending) return <Loading />;

  if (results.error) {
    return (
      <div className="flex flex-col space-y-4 justify-center items-center h-screen">
        <h1 className="text-3xl text-red-600">Йойки! </h1>
        <p className="text-xl">Щось пішло не так</p>
      </div>
    );
  }

  const [media, categories, links, settings] = results.data as [
    Media[],
    Category[],
    Link[],
    Settings,
  ];

  function handleCategoryChange({ realIndex }: { realIndex: number }) {
    setCurrentCategory(realIndex);
  }

  return (
    <Swiper {...veticalSwiperParams} onSlideChange={handleCategoryChange}>
      {categories?.map((category, index) => (
        <SwiperSlide key={index} data-hash={encodeURIComponent(category.title)}>
          <Swiper {...horizontalSwiperParams}>
            {media &&
              media
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
                        sizes="(max-width: 850px) 100vw, 50vw"
                        quality={100}
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
      <SwiperSlide key="links" data-hash="links">
        <LinksPage links={links} />
      </SwiperSlide>
      <Header
        className="flex flex-col items-center absolute top-0 z-10 w-screen mt-4 sm:ml-10 sm:w-max"
        categories={categories}
        currentCategory={currentCategory}
      />
    </Swiper>
  );
}
