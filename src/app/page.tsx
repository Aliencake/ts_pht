import { Category, Media, Link } from "@prisma/client";
import SwiperPage from "./components/Swiper";
import { getCategories, getMedia, getLinks } from "./actions"


export default async function Home() {

  console.time('lel')

  let categories: Category[] | null = null

  do {
    categories = await getCategories()
    if (categories){
      console.log(categories)
    }
    else {
      await new Promise(r => setTimeout(r, 1000));
    }
  } while (!categories);

  // const media: Media[] | null = await getMedia()

  // const links: Link[] | null = await getLinks()




  console.timeEnd('lel')

  return (
    <main className="flex text-center items-center justify-center relative h-screen">
      // <SwiperPage categories={categories} media={media} links={links} />
    </main>
  )
}
