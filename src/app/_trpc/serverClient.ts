import { httpBatchLink } from '@trpc/client';
import { appRouter } from '@/server';
import { createTRPCProxyClient } from '@trpc/client';

export const serverClient = createTRPCProxyClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: `/api/trpc`, // Use a relative URL for Vercel
    }),
  ],
});