'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules'
import { Virtual } from 'swiper/modules';
import Image from 'next/image'
// Import Swiper styles

import './styles.css';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';
import 'swiper/css/effect-creative';
import { Category, Link, Media } from '@prisma/client';

type SwiperPageProps = {
  categories: Category[] | null,
  media: Media[] | null,
  links: Link[] | null,
}


export default function SwiperPage(props: SwiperPageProps) {

  return (
    <Swiper
      direction={'vertical'}
      keyboard={{
        enabled: true,
      }}
      navigation
      mousewheel
      modules={[Keyboard, Navigation, Mousewheel]}
    >
      {props.categories ?
        props.categories.map((category, index) => <SwiperSlide key={index}>
          <Swiper
            spaceBetween={0}
            keyboard={{
              enabled: true,
            }}
            loop
            navigation={true}
            modules={[Keyboard, Navigation]}
            key={index}
          >
            {props.media && props.media.filter((media) => media.categoryId === category.id).map((media, index) =>
              <SwiperSlide key={index}>
                <img
                  src={media.href}
                  className='max-w-sm max-h-80'
                  alt={"Media of "+ category.title}
                  loading='lazy'
                />
              </SwiperSlide>
            )}
          </Swiper>
        </SwiperSlide>
        ) :
        <></>}
      {/* <SwiperSlide>
        <Swiper
          spaceBetween={50}
          keyboard={{
            enabled: true,
          }}
          loop
          navigation={true}
          modules={[Keyboard, Navigation]}
        >
          <SwiperSlide><img className=' blur-xl' loading="lazy" src='/logo.jpg' alt='cat' /></SwiperSlide>
          <SwiperSlide><img src='/th-528944190.jpg' alt='cat' /></SwiperSlide>
          <SwiperSlide>Vertical Slide 3</SwiperSlide>
          <SwiperSlide>Vertical Slide 4</SwiperSlide>
          <SwiperSlide>Vertical Slide 5</SwiperSlide>
        </Swiper>
      </SwiperSlide>
      <SwiperSlide>
        <Swiper
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          keyboard={{
            enabled: true,
          }}
          loop
          navigation={true}
          modules={[Pagination, Keyboard, Navigation]}
        >
        </Swiper>
      </SwiperSlide>
      <SwiperSlide>Horizontal Slide 3</SwiperSlide> */}
      <SwiperSlide key='links'>
        <div className='flex flex-col'>
          {props.links ?
            props.links.map((link, index) =>
              <a target='_blank' key={index} href={link.href}>{link.title}</a>
            ) :
            <></>}
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
