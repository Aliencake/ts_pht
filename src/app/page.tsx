import ImageSlider from './components/Slider';
import { getCategories, getMedia, getLinks } from '../lib/actions';

export default async function Home() {
  const [categories, media, links] = await Promise.all([
    getCategories(),
    getMedia(),
    getLinks(),
  ]);

  return (
    <main>
      <ImageSlider categories={categories} media={media} links={links} />
    </main>
  );
}
