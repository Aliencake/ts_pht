import { Category } from '@prisma/client';
import LogoSvg from './Logo';
import { AlignJustify } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

type HeaderProps = {
  categories: Category[];
  currentCategory: number;
  className?: string;
};

export default function Header(props: HeaderProps) {
  return (
    <div className={props.className}>
      <a href="/">
        <LogoSvg width={100} className=" fill-red-900 mb-0 opacity-70" />
      </a>
      <div className="flex flex-row gap-2">
        <div key="current_category">
          {props.categories.map((category) =>
            category.index === props.currentCategory ? category.title : '',
          )}
          {props.currentCategory === props.categories.length ? 'Посилання' : ''}
        </div>
        <HoverCard openDelay={400}>
          <HoverCardTrigger>
            <AlignJustify size={24} />
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col w-auto max-h-32 overflow-auto">
            {props.categories
              .filter((category) => category.index !== props.currentCategory)
              .map((category) => (
                <a
                  key={category.index}
                  href={'/#' + encodeURIComponent(category.title)}
                >
                  {category.title}
                </a>
              ))}
            {props.currentCategory === props.categories.length ? (
              ''
            ) : (
              <a key="links" href={'/#links'}>
                Посилання
              </a>
            )}
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
