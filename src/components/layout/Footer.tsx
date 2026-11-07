 import Link from 'next/link'
 import { cn } from '@/lib/utils'
 import { navItems } from '@/lib/utils'
 import { ScrollReveal } from '@/components/animations/ScrollReveal'
 
 const footerLinks = {
   wissen: [
     { href: '/wissen/botanik', label: 'Botanik' },
     { href: '/wissen/ernaehrung', label: 'Ern\u00E4hrung' },
     { href: '/wissen/anbau', label: 'Anbau' },
     { href: '/wissen/sorten', label: 'Sorten' },
   ],
   service: [
     { href: '/uber-uns', label: '\u00DCber uns' },
     { href: '/kontakt', label: 'Kontakt' },
     { href: '/impressum', label: 'Impressum' },
     { href: '/datenschutz', label: 'Datenschutz' },
   ],
   social: [
     { href: 'https://github.com', label: 'GitHub', external: true },
     { href: 'https://twitter.com', label: 'Twitter', external: true },
     { href: 'https://instagram.com', label: 'Instagram', external: true },
     { href: 'https://linkedin.com', label: 'LinkedIn', external: true },
   ],
 }
 
 export function Footer() {
   const currentYear = new Date().getFullYear()
 
   return (
     <footer className="relative bg-charcoal-950 border-t border-white/10">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-banana-500/10 blur-3xl pointer-events-none" />
       <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-cream-500/5 blur-3xl pointer-events-none" />
 
       <div className="container-premium relative pt-22 pb-12 lg:pt-26">
         <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-4">
           <ScrollReveal y={40} delay={0.1}>
             <div className="xl:col-span-1">
               <Link href="/" className="flex items-center gap-2 mb-6" aria-label="Banana Knowledge Hub - Startseite">
                 <span className="text-display-sm font-bold text-gradient tracking-tight">BANANA</span>
                 <span className="w-px h-8 bg-gradient-to-b from-banana-500 to-cream-400" />
                 <span className="text-caption text-muted-foreground tracking-widest uppercase">Knowledge Hub</span>
               </Link>
               <p className="text-body text-muted-foreground mb-6 max-w-xs">
                 Die umfassendste Wissensplattform rund um die Banane. Wissenschaftlich fundiert, 
                 visuell aufbereitet, kostenlos f\u00FCr alle.
               </p>
               <div className="flex items-center gap-4">
                 {footerLinks.social.map((item) => (
                   <a
                     key={item.label}
                     href={item.href}
                     target={item.external ? '_blank' : undefined}
                     rel={item.external ? 'noopener noreferrer' : undefined}
                     className="w-10 h-10 rounded-xl bg-charcoal-800 border border-white/10 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:bg-banana-500/20 hover:border-banana-500/30 hover:text-banana-400"
                     aria-label={item.label}
                   >
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                       {item.label === 'GitHub' && (
                         <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                       )}
                       {item.label === 'Twitter' && (
                         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                       )}
                       {item.label === 'Instagram' && (
                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-.128-1.283-.073-1.69-.073-4.948 0-3.259-.014-3.667-.072-4.947C15.667.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                       )}
                       {item.label === 'LinkedIn' && (
                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                       )}
                     </svg>
                   </a>
                 ))}
               </div>
             </div>
           </ScrollReveal>
 
           <ScrollReveal y={40} delay={0.2}>
             <nav>
               <h3 className="text-heading-sm font-semibold text-foreground mb-4">Wissen</h3>
               <ul className="space-y-3">
                 {footerLinks.wissen.map((item) => (
                   <li key={item.href}>
                     <Link href={item.href} className="text-body text-muted-foreground hover:text-banana-400 transition-colors">
                       {item.label}
                     </Link>
                   </li>
                 ))}
               </ul>
             </nav>
           </ScrollReveal>
 
           <ScrollReveal y={40} delay={0.3}>
             <nav>
               <h3 className="text-heading-sm font-semibold text-foreground mb-4">Service</h3>
               <ul className="space-y-3">
                 {footerLinks.service.map((item) => (
                   <li key={item.href}>
                     <Link href={item.href} className="text-body text-muted-foreground hover:text-banana-400 transition-colors">
                       {item.label}
                     </Link>
                   </li>
                 ))}
               </ul>
             </nav>
           </ScrollReveal>
 
           <ScrollReveal y={40} delay={0.4}>
             <div>
               <h3 className="text-heading-sm font-semibold text-foreground mb-4">Bleib informiert</h3>
               <p className="text-body text-muted-foreground mb-4">
                 Monatlich die spannendsten Bananen-Fakten direkt in dein Postfach.
               </p>
               <form className="flex flex-col gap-3" action="/api/newsletter" method="POST">
                 <input
                   type="email"
                   name="email"
                   placeholder="deine@email.de"
                   className="rounded-2xl bg-charcoal-800/50 border border-white/10 px-4 py-3 text-body text-foreground placeholder:text-muted-foreground focus:border-banana-500/50 focus:ring-2 focus:ring-banana-500/20"
                   required
                 />
                 <button type="submit" className="btn-premium bg-banana-500 text-charcoal-950 hover:bg-banana-400 px-4 py-3 rounded-2xl font-medium transition-colors">
                   Abonnieren
                 </button>
               </form>
               <p className="text-caption text-muted-foreground mt-2">
                 Kein Spam. Jederzeit abbestellbar. <a href="/datenschutz" className="underline hover:text-banana-400">Datenschutz</a>
               </p>
             </div>
           </ScrollReveal>
         </div>
 
         <div className="mt-16 pt-8 border-t border-white/10">
           <ScrollReveal y={20} delay={0.5}>
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
               <p className="text-body-sm text-muted-foreground">
                 \u00A9 {currentYear} Banana Knowledge Hub. Alle Rechte vorbehalten.
               </p>
               <div className="flex items-center gap-6 text-body-sm text-muted-foreground">
                 <Link href="/impressum" className="hover:text-banana-400 transition-colors">Impressum</Link>
                 <Link href="/datenschutz" className="hover:text-banana-400 transition-colors">Datenschutz</Link>
                 <Link href="/barrierefreiheit" className="hover:text-banana-400 transition-colors">Barrierefreiheit</Link>
               </div>
             </div>
           </ScrollReveal>
         </div>
       </div>
     </footer>
   )
 }
