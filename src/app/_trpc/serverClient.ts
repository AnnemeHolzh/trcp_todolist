import { httpBatchLink } from '@trpc/client';
import { appRouter } from '@/server';
import { createTRPCProxyClient } from '@trpc/client';

export const serverClient = createTRPCProxyClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`, // Ensure this is correct
    }),
  ],
});