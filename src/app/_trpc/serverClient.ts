import { httpBatchLink } from '@trpc/client';
import { appRouter } from '@/server';
import { createTRPCProxyClient } from '@trpc/client';

export const serverClient = createTRPCProxyClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
    }),
  ],
});