import { Link } from '@prisma/client';
import { isEmail } from '../types';

type LinksPageProps = {
  links: Link[] | null;
};

export default function LinksPage(props: LinksPageProps) {
  const lastLink = props.links?.[props.links.length - 1];

  return (
    <div className="flex flex-col items-center w-full h-full relative">
      <div className="flex h-dvh w-screen uppercase place-content-center items-center"
      >
        <div className='flex flex-row place-content-center mx-6 flex-wrap gap-2'>
        {props.links?.map((link, index) => (
          <a
            key={index}
            href={isEmail(link.href) ? 'mailto:' + link.href : link.href}
            target="_blank"
            style={{
              fontSize: link === lastLink ? '0.75rem' :'1.125rem',
              marginTop: link === lastLink ? '0.75rem' :'0',
              width: link === lastLink ? '100%' :'fit-content',
              textAlign: 'center'
            }}
          >
            {link.title}
          </a>
        ))}
        </div>
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
