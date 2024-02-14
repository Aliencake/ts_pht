import CredentialsProvider from 'next-auth/providers/credentials';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '5 m'),
});

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const headersList = headers();
        const ip = headersList.get('x-forwarded-for') ?? '';
        const { success, reset, remaining } = await ratelimit.limit(ip);

        const user = { id: '1', name: `${process.env.ADMIN_USERNAME}` };

        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return user;
        } else if (!success) {
          const now = Date.now();
          const retryAfter = Math.floor((reset - now) / 1000 / 60);
          throw new Error(`retry-after:${retryAfter}`);
        } else {
          throw new Error(`remaining:${+remaining + 1}`);
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    maxAge: 2 * 24 * 60 * 60,
  },
};
