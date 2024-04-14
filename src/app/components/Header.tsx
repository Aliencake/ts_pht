import { Category } from '@prisma/client';
import LogoSvg from './Logo';

type HeaderProps = {
  categories: Category[];
  currentCategory: number;
  className?: string;
};

export default function Header(props: HeaderProps) {
  const isLastCategory = props.currentCategory === props.categories.length;

  return (
    <div className={props.className}>
      <a href="/" className=" mb-4 sm:w-max w-40">
        <LogoSvg
          style={{
            fill: isLastCategory ? '#7f1d1d' : '#FFFFFF',
            width: '100%',
          }}
        />
      </a>
      <div className="flex flex-row gap-2">
        <div
          key="current_category"
          style={{
            color: isLastCategory ? '#7f1d1d' : '#FFFFFF',
            fontSize: '1.125rem',
            textTransform: 'uppercase',
          }}
        >
          {props.categories.map((category) =>
            category.index === props.currentCategory ? category.title : '',
          )}
          {isLastCategory ? 'Посилання' : ''}
        </div>
        {/* {props.categories
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
            )} */}
      </div>
    </div>
  );
}
