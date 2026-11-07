 'use client'
 
 import { useState } from 'react'
 import { ScrollReveal } from '@/components/animations/ScrollReveal'
 import { Magnetic } from '@/components/animations/Magnetic'
 import { Badge } from '@/components/ui/Badge'
 import { cn } from '@/lib/utils'
 
 export function Newsletter() {
   const [email, setEmail] = useState('')
   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
   const [message, setMessage] = useState('')
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     setStatus('loading')
     setMessage('')
 
     await new Promise((resolve) => setTimeout(resolve, 1500))
 
     if (email.includes('@')) {
       setStatus('success')
       setMessage('Danke! Du bekommst bald die ersten Bananen-Fakten. 🍌')
       setEmail('')
     } else {
       setStatus('error')
       setMessage('Bitte gib eine g\u00FCltige E-Mail-Adresse ein.')
     }
   }
 
   return (
     <section className="section-premium relative overflow-hidden" aria-labelledby="newsletter-heading">
       <div className="absolute inset-0 bg-gradient-radial from-banana-500/5 via-transparent to-cream-500/5" aria-hidden="true" />
 
       <div className="absolute top-10 right-10 w-64 h-64 opacity-5" aria-hidden="true">
         <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
           <path d="M50 10 C70 10 85 30 85 50 C85 70 70 90 50 90 C30 90 15 70 15 50 C15 30 30 10 50 10 Z" fill="url(#bananaGrad)" />
           <defs>
             <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#FFE666" />
               <stop offset="100%" stopColor="#F0C078" />
             </linearGradient>
           </defs>
         </svg>
       </div>
       <div className="absolute bottom-10 left-10 w-48 h-48 opacity-5" aria-hidden="true">
         <svg viewBox="0 0 100 100" className="w-full h-full animate-float animation-delay-1000">
           <path d="M50 10 C70 10 85 30 85 50 C85 70 70 90 50 90 C30 90 15 70 15 50 C15 30 30 10 50 10 Z" fill="url(#bananaGrad2)" />
           <defs>
             <linearGradient id="bananaGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#F0C078" />
               <stop offset="100%" stopColor="#FFE666" />
             </linearGradient>
           </defs>
         </svg>
       </div>
 
       <div className="container-premium relative">
         <ScrollReveal y={40} className="max-w-3xl mx-auto text-center">
           <Badge variant="glow" className="mb-4">Bleib auf dem Laufenden</Badge>
           <h2 id="newsletter-heading" className="text-display-md font-bold text-gradient mb-6">
             Monatlose Bananen-Post
           </h2>
           <p className="text-body-lg text-muted-foreground mb-8">
             Kein Spam, nur die besten Fakten, neuen Artikel und exklusive Inhalte.
             \u00DCber 5.000 Neugierige sind schon dabei.
           </p>
 
           <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
             <div className="flex-1 relative">
               <label htmlFor="newsletter-email" className="sr-only">E-Mail-Adresse</label>
               <input
                 id="newsletter-email"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="deine@email.de"
                 className="w-full rounded-2xl bg-charcoal-800/50 border border-white/10 px-6 py-4 text-body text-foreground placeholder:text-muted-foreground focus:border-banana-500/50 focus:ring-2 focus:ring-banana-500/20 focus:bg-charcoal-800 transition-all duration-300"
                 required
                 autoComplete="email"
                 disabled={status === 'loading' || status === 'success'}
                 aria-describedby={status === 'error' ? 'newsletter-error' : status === 'success' ? 'newsletter-success' : undefined}
               />
             </div>
             <Magnetic strength={0.2}>
               <button
                 type="submit"
                 className={cn(
                   'btn-premium px-8 py-4 rounded-2xl font-semibold text-body-lg whitespace-nowrap',
                   status === 'loading' ? 'opacity-50 cursor-wait' : 'bg-banana-500 text-charcoal-950 hover:bg-banana-400'
                 )}
                 disabled={status === 'loading' || status === 'success'}
                 aria-busy={status === 'loading'}
               >
                 {status === 'loading' ? (
                   <>
                     <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                     </svg>
                     Abonnieren...
                   </>
                 ) : status === 'success' ? (
                   'Angemeldet! \u2713'
                 ) : (
                   'Kostenlos abonnieren'
                 )}
               </button>
             </Magnetic>
           </form>
 
           {status === 'error' && (
             <p id="newsletter-error" className="mt-3 text-body-sm text-banana-400" role="alert">
               {message}
             </p>
           )}
           {status === 'success' && (
             <p id="newsletter-success" className="mt-3 text-body-sm text-banana-400" role="status">
               {message}
             </p>
           )}
 
           <p className="mt-4 text-caption text-muted-foreground">
             Indem du abonnierst, stimmst du unserer
             <a href="/datenschutz" className="underline hover:text-banana-400 transition-colors ml-1">
               Datenschutzerkl\u00E4rung
             </a>
             zu. Jederzeit abbestellbar mit einem Klick.
           </p>
 
           <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-body-sm text-muted-foreground">
             <span className="flex items-center gap-1.5">
               <svg className="w-4 h-4 text-banana-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               DSGVO-konform
             </span>
             <span className="flex items-center gap-1.5">
               <svg className="w-4 h-4 text-banana-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               Keine Weitergabe
             </span>
             <span className="flex items-center gap-1.5">
               <svg className="w-4 h-4 text-banana-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               Monatlich nur 1 Mail
             </span>
           </div>
         </ScrollReveal>
       </div>
     </section>
   )
 }
