import { Link } from '@prisma/client';

type LinksPageProps = {
  links: Link[] | null;
};

export default function LinksPage(props: LinksPageProps) {
  return (
    <div className="flex flex-col items-center w-full h-full relative">
      <h1 className="text-4xl mt-24 mb-10 text-red-900">
        Посилання на соцмережі
      </h1>
      <div className="flex flex-row gap-5">
        {props.links?.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            className="text-center text-lg"
          >
            {link.title}
          </a>
        ))}
      </div>
      <div className="absolute bottom-0 mb-6">
        Created by{' '}
        <a
          href="https://aliencake.t.me/"
          target="_blank"
          className=" text-red-900 hover:animate-pulse"
        >
          Aliencake
        </a>
      </div>
    </div>
  );
}
