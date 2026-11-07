 'use client'
 
 import { useState, useEffect, useRef } from 'react'
 import Link from 'next/link'
 import { gsap } from 'gsap'
 import { ScrollTrigger } from 'gsap/ScrollTrigger'
 import { cn } from '@/lib/utils'
 import { Button } from '@/components/ui/Button'
 import { navItems } from '@/lib/utils'
 
 if (typeof window !== 'undefined') {
   gsap.registerPlugin(ScrollTrigger)
 }
 
 export function Header() {
   const [scrolled, setScrolled] = useState(false)
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
   const headerRef = useRef<HTMLElement>(null)
 
   useEffect(() => {
     const handleScroll = () => {
       setScrolled(window.scrollY > 50)
     }
 
     window.addEventListener('scroll', handleScroll, { passive: true })
     handleScroll()
 
     return () => window.removeEventListener('scroll', handleScroll)
   }, [])
 
   useEffect(() => {
     const header = headerRef.current
     if (!header) return
 
     gsap.fromTo(
       header,
       { y: -100, opacity: 0 },
       { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
     )
   }, [])
 
   return (
     <header
       ref={headerRef}
       className={cn(
         'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo',
         scrolled
           ? 'bg-charcoal-950/90 backdrop-blur-2xl border-b border-white/10 shadow-premium'
           : 'bg-transparent'
       )}
     >
       <nav className="container-premium" aria-label="Hauptnavigation">
         <div className="flex h-18 items-center justify-between gap-4">
           <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Banana Knowledge Hub - Startseite">
             <span className="text-display-sm font-bold text-gradient tracking-tight">BANANA</span>
             <span className="hidden sm:inline-block w-px h-6 bg-gradient-to-b from-banana-500 to-cream-400" />
             <span className="text-caption text-muted-foreground tracking-widest uppercase">Knowledge Hub</span>
           </Link>
 
           <div className="hidden md:flex items-center gap-1">
             {navItems.map((item) => (
               <Link
                 key={item.href}
                 href={item.href}
                 className="relative px-3 py-2 text-body-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-white/5 rounded-xl"
               >
                 {item.label}
               </Link>
             ))}
           </div>
 
           <div className="hidden md:flex items-center gap-3">
             <Button variant="ghost" size="sm" asChild>
               <Link href="/newsletter">Newsletter</Link>
             </Button>
             <Button variant="primary" size="sm" asChild>
               <Link href="/wissen">Wissen entdecken</Link>
             </Button>
           </div>
 
           <button
             className="md:hidden p-2 rounded-xl text-foreground hover:bg-white/5 transition-colors"
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             aria-expanded={mobileMenuOpen}
             aria-controls="mobile-menu"
             aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
           >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
               {mobileMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
               )}
             </svg>
           </button>
         </div>
 
         {mobileMenuOpen && (
           <div id="mobile-menu" className="md:hidden overflow-hidden transition-all duration-300 ease-out-expo">
             <div className="py-6 space-y-2 border-t border-white/10">
               {navItems.map((item) => (
                 <Link
                   key={item.href}
                   href={item.href}
                   className="block px-3 py-3 text-body font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
                   onClick={() => setMobileMenuOpen(false)}
                 >
                   {item.label}
                 </Link>
               ))}
               <div className="pt-4 space-y-3 border-t border-white/10">
                 <Button variant="ghost" className="w-full justify-start" asChild>
                   <Link href="/newsletter" onClick={() => setMobileMenuOpen(false)}>Newsletter</Link>
                 </Button>
                 <Button variant="primary" className="w-full justify-start" asChild>
                   <Link href="/wissen" onClick={() => setMobileMenuOpen(false)}>Wissen entdecken</Link>
                 </Button>
               </div>
             </div>
           </div>
         )}
       </nav>
     </header>
   )
 }
