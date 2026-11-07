 import Link from 'next/link'
 import { Button } from '@/components/ui/Button'
 
 export default function NotFound() {
   return (
     <div className="min-h-screen flex items-center justify-center bg-background px-4">
       <div className="text-center max-w-md">
         <h1 className="text-display-xl font-bold text-gradient mb-6">404</h1>
         <h2 className="text-heading-xl font-semibold text-foreground mb-4">Seite nicht gefunden</h2>
         <p className="text-body text-muted-foreground mb-8">
           Die gesuchte Seite existiert nicht. Vielleicht hast du dich vertippt oder der Link ist veraltet.
         </p>
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Button variant="primary" asChild>
             <Link href="/">Zur Startseite</Link>
           </Button>
           <Button variant="secondary" asChild>
             <Link href="/wissen">Wissen entdecken</Link>
           </Button>
         </div>
       </div>
     </div>
   )
 }
