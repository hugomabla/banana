 'use client'
 
 import { ScrollReveal } from '@/components/animations/ScrollReveal'
 import { Card } from '@/components/ui/Card'
 import { Badge } from '@/components/ui/Badge'
 import Link from 'next/link'
 import { formatDate } from '@/lib/utils'
 import { cn } from '@/lib/utils'
 
 const articles = [
   {
     slug: 'warum-banane-krumm',
     title: 'Warum ist die Banane krumm? Die Wissenschaft hinter der Kr\u00FCmmung',
     excerpt: 'Negative Geotropie nennt sich das Ph\u00E4nomen. Die Banane w\u00E4chst gegen die Schwerkraft Richtung Licht \u2013 ein faszinierender evolution\u00E4rer Trick.',
     category: 'Botanik',
     readTime: '4 Min',
     date: '2024-11-15',
     image: 'banana-curve',
     featured: true,
   },
   {
     slug: 'banane-radioaktiv',
     title: 'Bananen sind radioaktiv \u2013 und das ist v\u00F6llig normal',
     excerpt: 'Kalium-40 macht die Banane zur Strahlenquelle. Die \u201EBanana Equivalent Dose\u201C ist ein echtes Ma\u00DF f\u00FCr Strahlungsexposition. Wie gef\u00E4hrlich ist es wirklich?',
     category: 'Wissenschaft',
     readTime: '5 Min',
     date: '2024-11-10',
     image: 'banana-radiation',
     featured: false,
   },
   {
     slug: 'cavendish-klon-armee',
     title: 'Die Klon-Armee: Warum fast alle Bananen genetisch identisch sind',
     excerpt: 'Keine Samen, keine sexuelle Fortpflanzung. Die Cavendish-Banane ist ein genetischer Klon. Das macht sie anf\u00E4llig f\u00FCr Krankheiten \u2013 wie die Panama-Krankheit zeigt.',
     category: 'Geschichte',
     readTime: '6 Min',
     date: '2024-11-05',
     image: 'banana-clones',
     featured: true,
   },
   {
     slug: 'banane-dna-mensch',
     title: '50% DNA-\u00C4hnlichkeit: Was wir mit Bananen gemeinsam haben',
     excerpt: 'Haushaltsgene f\u00FCr Zellteilung, Stoffwechsel, DNA-Reparatur \u2013 die Grundlagen des Lebens sind evolution\u00E4r uralt. Ein Blick in das gemeinsame Erbgut.',
     category: 'Wissenschaft',
     readTime: '4 Min',
     date: '2024-11-01',
     image: 'banana-dna',
     featured: false,
   },
   {
     slug: 'blaue-banane-blue-java',
     title: 'Blue Java: Die Banane, die nach Vanilleeis schmeckt',
     excerpt: 'Auch \u201EEiscreme-Banane\u201C genannt. Ihre bl\u00E4uliche Schale und cremige Textur machen sie zur begehrtesten Sorte f\u00FCr Feinschmecker. Wo man sie findet.',
     category: 'Sorten',
     readTime: '3 Min',
     date: '2024-10-28',
     image: 'banana-blue-java',
     featured: false,
   },
   {
     slug: 'banane-ethlyen-reifen',
     title: 'Das Reife-Gas: Wie Bananen andere Fr\u00FCchte steuern',
     excerpt: 'Ethylen ist das unsichtbare Hormon der Reifung. Eine Banane im Obstkorb beschleunigt alles ringsum. Wie du das f\u00FCr dich nutzt \u2013 oder verhinderst.',
     category: 'Kurioses',
     readTime: '3 Min',
     date: '2024-10-22',
     image: 'banana-ethylene',
     featured: false,
   },
 ]
 
 function ArticleCard({ article, featured = false }: { article: typeof articles[0]; featured?: boolean }) {
   return (
     <Card variant="default" hover padding="none" className={cn('overflow-hidden flex flex-col h-full', featured && 'md:col-span-2')}>
       <div className="relative aspect-video overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-banana-500/20 via-charcoal-900 to-cream-400/10" />
         <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-8xl opacity-20">{article.image === 'banana-curve' ? '🍌' : article.image === 'banana-radiation' ? '☢️' : article.image === 'banana-clones' ? '🧬' : article.image === 'banana-dna' ? '🧪' : article.image === 'banana-blue-java' ? '🫐' : '⚡'}</span>
         </div>
         {featured && (
           <div className="absolute top-4 left-4">
             <Badge variant="glow" size="sm">Featured</Badge>
           </div>
         )}
         <div className="absolute bottom-4 right-4">
           <Badge variant="charcoal" size="sm">{article.readTime}</Badge>
         </div>
       </div>
 
       <div className="p-6 flex flex-col flex-1">
         <div className="flex items-center gap-2 mb-3">
           <Badge variant={article.category === 'Botanik' || article.category === 'Geschichte' ? 'yellow' : 'cream'} size="sm">
             {article.category}
           </Badge>
           <time className="text-caption text-muted-foreground">{formatDate(article.date)}</time>
         </div>
 
         <h3 className="text-heading-md font-semibold text-foreground mb-3 line-clamp-2">
           <Link href={`/wissen/${article.slug}`} className="hover:text-banana-400 transition-colors">
             {article.title}
           </Link>
         </h3>
 
         <p className="text-body text-muted-foreground mb-4 flex-1 line-clamp-3">
           {article.excerpt}
         </p>
 
         <Link
           href={`/wissen/${article.slug}`}
           className="link-premium inline-flex items-center gap-1.5 font-medium text-banana-400 hover:text-banana-300"
         >
           Weiterlesen
           <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
           </svg>
         </Link>
       </div>
     </Card>
   )
 }
 
 export function ContentPreview() {
   return (
     <section className="section-premium relative" aria-labelledby="content-heading">
       <div className="absolute inset-0 bg-gradient-radial from-cream-500/3 via-transparent to-banana-500/3" aria-hidden="true" />
 
       <div className="container-premium relative">
         <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
           <ScrollReveal y={40}>
             <Badge variant="glow" className="mb-4">Neueste Artikel</Badge>
             <h2 id="content-heading" className="text-display-md font-bold text-gradient">
               Frisch aus der Redaktion
             </h2>
           </ScrollReveal>
 
           <ScrollReveal y={40} delay={0.1} className="sm:ml-auto">
             <Link href="/wissen" className="btn-premium bg-charcoal-800 text-cream-50 border border-white/10 hover:bg-charcoal-700 hover:border-white/20 px-6 py-3 rounded-2xl font-medium">
               Alle Artikel anzeigen
               <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
             </Link>
           </ScrollReveal>
         </div>
 
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {articles.map((article, index) => (
             <ScrollReveal key={article.slug} y={40} delay={index * 0.08}>
               <ArticleCard article={article} featured={article.featured} />
             </ScrollReveal>
           ))}
         </div>
       </div>
     </section>
   )
 }
