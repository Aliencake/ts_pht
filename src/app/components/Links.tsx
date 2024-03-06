import { Link } from '@prisma/client';
import { isEmail } from '../types';

type LinksPageProps = {
  links: Link[] | null;
};

export default function LinksPage(props: LinksPageProps) {
  console.log();

  return (
    <div className="flex flex-col items-center w-full h-full relative">
      <div className="flex flex-row gap-2 h-dvh uppercase place-content-center items-center">
        {props.links?.map((link, index) => (
          <a
            key={index}
            href={isEmail(link.href) ? 'mailto:' + link.href : link.href}
            target="_blank"
            className="text-lg"
          >
            {link.title}
          </a>
        ))}
      </div>
      <div className="flex items-center flex-col space-y-4 absolute bottom-0 mb-6">
        <p>
          Created by{' '}
          <a
            href="https://aliencake.t.me/"
            target="_blank"
            className=" text-red-900 hover:animate-pulse"
          >
            Aliencake
          </a>
        </p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
