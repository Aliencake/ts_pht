import { Category } from '@prisma/client';
import LogoSvg from './Logo';
import Link from 'next/link';

type HeaderProps = {
  categories: Category[];
  currentCategory: number;
  className?: string;
};


export default function Header(props: HeaderProps) {
  return (
    <div className={props.className}>
      {/* <a href='/'>
      <LogoSvg />

      </a> */}
      <div key="current_category">{props.categories.map((category) => (category.index === props.currentCategory) ? category.title
      : '')}
      {props.currentCategory === props.categories.length ? "Посилання": ''}
      </div>
      <ul>
      {props.categories.map((category) => <li key={category.index}>
      <a href={"/#" + encodeURIComponent(category.title)}>{category.title}</a>
      </li>)}
      <li key={props.categories.length}>
      <a href={"/#links"}>Посилання</a>
      </li>
      </ul>
    </div>
  );
}
