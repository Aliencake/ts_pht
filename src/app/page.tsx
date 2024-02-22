'use client'

import { useEffect } from 'react';
import ImageSlider from './components/Slider';
import { redirect } from 'next/navigation';

export default function Home() {

  useEffect(() => {
    if (window.location.hash !== '') {
      redirect("/");
    }
    
  } , []);

  const categories = [
    { id: 9, title: 'Ріта', isActive: true, index: 0 },
    { id: 8, title: 'Дана', isActive: true, index: 1 },
    { id: 5, title: 'Lol', isActive: true, index: 2 }
  ]

  const media = [
    {
      id: 26,
      categoryId: 9,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/7bdc4d8d-2feb-49f3-9170-6bbba49f5920.jpg',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/7bdc4d8d-2feb-49f3-9170-6bbba49f5920-thumb.jpg',
      type: 'PHOTO',
      isActive: true,
      index: 0
    },
    {
      id: 22,
      categoryId: 9,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/d1aca79d-17b4-49db-adb5-86455cb60d11.jpg',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/d1aca79d-17b4-49db-adb5-86455cb60d11-thumb.jpg',
      type: 'PHOTO',
      isActive: true,
      index: 1
    },
    {
      id: 23,
      categoryId: 9,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/25948eb7-053b-48db-9ab3-21c43bf869b2.jpg',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/25948eb7-053b-48db-9ab3-21c43bf869b2-thumb.jpg',
      type: 'PHOTO',
      isActive: true,
      index: 2
    },
    {
      id: 24,
      categoryId: 9,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/cc6ce8c0-96b1-429d-a196-c8c13c151514.jpg',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/cc6ce8c0-96b1-429d-a196-c8c13c151514-thumb.jpg',
      type: 'PHOTO',
      isActive: true,
      index: 3
    },
    {
      id: 4,
      categoryId: 5,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/47cd944d-3c40-409e-92bf-2193f0081002.jpg',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/47cd944d-3c40-409e-92bf-2193f0081002-thumb.jpg',
      type: 'PHOTO',
      isActive: true,
      index: 4
    },
    {
      id: 25,
      categoryId: 9,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/1168cd34-6fac-4aac-8714-a4bac3084603.jpg',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/1168cd34-6fac-4aac-8714-a4bac3084603-thumb.jpg',
      type: 'PHOTO',
      isActive: true,
      index: 4
    },
    {
      id: 11,
      categoryId: 5,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/7c02a557-dcdf-4763-ad17-0c4b38c2c229.jpg',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/7c02a557-dcdf-4763-ad17-0c4b38c2c229-thumb.jpg',
      type: 'PHOTO',
      isActive: true,
      index: 11
    },
    {
      id: 12,
      categoryId: 5,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/62bcd9fd-e034-4e25-943d-4aae26547f25.jpg',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/62bcd9fd-e034-4e25-943d-4aae26547f25-thumb.jpg',
      type: 'PHOTO',
      isActive: true,
      index: 12
    },
    {
      id: 14,
      categoryId: 7,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/1b1036dc-9be9-425d-b426-ae7090a38f28.JPG',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/1b1036dc-9be9-425d-b426-ae7090a38f28-thumb.JPG',
      type: 'PHOTO',
      isActive: true,
      index: 14
    },
    {
      id: 15,
      categoryId: 7,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/e3b6c063-7955-4f25-8e37-da9b105a3491.JPG',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/e3b6c063-7955-4f25-8e37-da9b105a3491-thumb.JPG',
      type: 'PHOTO',
      isActive: true,
      index: 15
    },
    {
      id: 16,
      categoryId: 7,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/754475a3-599a-49af-8ebb-90c8d859ece7.JPG',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/754475a3-599a-49af-8ebb-90c8d859ece7-thumb.JPG',
      type: 'PHOTO',
      isActive: true,
      index: 16
    },
    {
      id: 17,
      categoryId: 8,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/62249373-7ffd-47c2-959f-b8d134b47352.JPG',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/62249373-7ffd-47c2-959f-b8d134b47352-thumb.JPG',
      type: 'PHOTO',
      isActive: true,
      index: 17
    },
    {
      id: 19,
      categoryId: 8,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/71db94fa-3ce9-4bbc-9843-c56ab7f73ab7.JPG',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/71db94fa-3ce9-4bbc-9843-c56ab7f73ab7-thumb.JPG',
      type: 'PHOTO',
      isActive: true,
      index: 19
    },
    {
      id: 20,
      categoryId: 8,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/7db56e7e-066c-45af-b784-89c7c21148d4.JPG',
      thumbnail: 'https://files.edgestore.dev/7hsx9nide9mchi92/Photos/_public/7db56e7e-066c-45af-b784-89c7c21148d4-thumb.JPG',
      type: 'PHOTO',
      isActive: true,
      index: 20
    },
    {
      id: 21,
      categoryId: 8,
      href: 'https://files.edgestore.dev/7hsx9nide9mchi92/Files/_public/44a36c9c-3c71-49b3-9327-19adafcc65d0.MOV',
      thumbnail: '',
      type: 'VIDEO',
      isActive: true,
      index: 21
    }
  ]

  const links = [
    {
      id: 3,
      title: 'Телеграм',
      href: 'https://t.me/AlienCake',
      isActive: true,
      index: 3
    },
    {
      id: 4,
      title: 'Інста',
      href: 'https://www.instagram.com/ts_pht/',
      isActive: true,
      index: 4
    }
  ]
  

  

  return (
    <main>
      <ImageSlider categories={categories} media={media} links={links} />
    </main>
  );
}
