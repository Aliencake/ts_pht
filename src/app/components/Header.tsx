import { Category, Folder } from '@prisma/client';
import LogoSvg from './Logo';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../components/ui/menubar';

type HeaderProps = {
  categories: Category[];
  folders: Folder[];
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
      <div
        style={{
          color: isLastCategory ? '#7f1d1d' : '#FFFFFF',
        }}
      >
        <div>
          <Menubar>
            {props.folders
              .filter((folder) => folder.categories.length)
              .map((folder: Folder) => (
                <MenubarMenu key={folder.id}>
                  <MenubarTrigger className="uppercase text-lg">
                    {folder.title}
                  </MenubarTrigger>
                  <MenubarContent
                    style={{
                      color: isLastCategory ? '#7f1d1d' : '#FFFFFF',
                    }}
                  >
                    {props.categories
                      .filter((category) =>
                        folder.categories.includes(category.id),
                      )
                      .map((category) => (
                        <MenubarItem key={category.id}>
                          <a
                            className="uppercase flex flex-row gap-0"
                            style={{
                              textDecoration:
                                props.currentCategory === category.index
                                  ? 'underline'
                                  : undefined,
                            }}
                            href={'/#' + encodeURIComponent(category.title)}
                          >
                            {category.title}
                          </a>
                        </MenubarItem>
                      ))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
          </Menubar>
        </div>
      </div>
    </div>
  );
}
