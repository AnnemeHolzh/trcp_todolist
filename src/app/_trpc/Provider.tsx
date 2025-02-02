//Provider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./client";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

//React query client 
export default function Provider({ children }: { children: React.ReactNode }) {
		//trpc client 
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() => 
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`,
                }),
            ],
        }),
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}