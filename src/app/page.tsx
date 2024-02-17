import Image from 'next/image';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Image
        className="m-4"
        src={'/favicon_round.ico'}
        height={70}
        width={70}
        alt=""
      />
      <p>Привіт це головна сторінка!</p>
    </main>
  );
}
