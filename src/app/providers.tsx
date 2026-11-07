 'use client'
 
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 import { ReactNode, useState, useEffect } from 'react'
 import { gsap } from 'gsap'
 import { ScrollTrigger } from 'gsap/ScrollTrigger'
 
 if (typeof window !== 'undefined') {
   gsap.registerPlugin(ScrollTrigger)
 }
 
 export function Providers({ children }: { children: ReactNode }) {
   const [queryClient] = useState(
     () =>
       new QueryClient({
         defaultOptions: {
           queries: {
             staleTime: 60 * 1000,
             gcTime: 10 * 60 * 1000,
             refetchOnWindowFocus: false,
             retry: 1,
           },
         },
       })
   )
 
   useEffect(() => {
     // Refresh ScrollTrigger on route change
     ScrollTrigger.refresh()
   }, [])
 
   return (
     <QueryClientProvider client={queryClient}>
       {children}
     </QueryClientProvider>
   )
 }
