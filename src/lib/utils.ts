 import { type ClassValue, clsx } from 'clsx'
 import { twMerge } from 'tailwind-merge'
 
 export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
 }
 
 export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
   return new Date(date).toLocaleDateString('de-DE', {
     year: 'numeric',
     month: 'long',
     day: 'numeric',
     ...options,
   })
 }
 
 export function slugify(text: string) {
   return text
     .toLowerCase()
     .trim()
     .replace(/[^\w\s-]/g, '')
     .replace(/[\s_-]+/g, '-')
     .replace(/^-+|-+$/g, '')
 }
 
 export function truncate(text: string, length: number) {
   if (text.length <= length) return text
   return text.slice(0, length).trim() + '…'
 }
 
 export function debounce<T extends (...args: unknown[]) => unknown>(
   fn: T,
   delay: number
 ): (...args: Parameters<T>) => void {
   let timeoutId: ReturnType<typeof setTimeout>
   return (...args: Parameters<T>) => {
     clearTimeout(timeoutId)
     timeoutId = setTimeout(() => fn(...args), delay)
   }
 }
 
 export function throttle<T extends (...args: unknown[]) => unknown>(
   fn: T,
   limit: number
 ): (...args: Parameters<T>) => void {
   let inThrottle = false
   return (...args: Parameters<T>) => {
     if (!inThrottle) {
       fn(...args)
       inThrottle = true
       setTimeout(() => (inThrottle = false), limit)
     }
   }
 }
 
 export function generateId(prefix = 'id') {
   return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
 }
 
 export function clamp(value: number, min: number, max: number) {
   return Math.min(Math.max(value, min), max)
 }
 
 export function lerp(start: number, end: number, factor: number) {
   return start + (end - start) * factor
 }
 
 export function mapRange(
   value: number,
   inMin: number,
   inMax: number,
   outMin: number,
   outMax: number
 ) {
   return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
 }
 
 export const bananaFacts = [
   { id: 1, title: 'Botanisch eine Beere', desc: 'Die Banane ist botanisch gesehen eine Beere, da sie aus einem einzigen Fruchtknoten entsteht und mehrere Samen enthält (die bei Zuchtbananen winzig sind).' },
   { id: 2, title: 'Radioaktiv', desc: 'Bananen enthalten Kalium-40, ein natürlich radioaktives Isotop. Die "Banana Equivalent Dose" (BED) ist ein humorvolles Maß für Strahlung.' },
   { id: 3, title: 'Klon-Armee', desc: 'Fast alle exportierten Bananen sind Cavendish-Sorte – genetisch identische Klone. Keine sexuelle Fortpflanzung, nur vegetative Vermehrung.' },
   { id: 4, title: 'Schwimmende Früchte', desc: 'Bananen schwimmen im Wasser, da ihre Dichte geringer als die von Wasser ist. Perfekt für die Verbreitung über Meere.' },
   { id: 5, title: 'Stimmungsaufheller', desc: 'Bananen enthalten Tryptophan, das der Körper zu Serotonin umwandelt – dem "Glückshormon". Auch Vitamin B6 unterstützt die Produktion.' },
   { id: 6, title: 'Wachstum Richtung Licht', desc: 'Bananen wachsen gekrümmt, weil sie gegen die Schwerkraft Richtung Licht wachsen (negative Geotropie). Die Pflanze ist ein Riesengras, kein Baum.' },
   { id: 7, title: 'Ethylene-Gas', desc: 'Bananen setzen Ethylen frei, ein Reifegas. Legt man unreife Früchte daneben, reifen sie schneller. "Ein Apfel verdirbt den Korb" gilt auch für Bananen.' },
   { id: 8, title: 'DNA-Ähnlichkeit', desc: 'Menschen teilen ca. 50% ihrer DNA mit Bananen. Grundlegende zelluläre Prozesse sind evolutionär stark konserviert.' },
 ]
 
 export const navItems = [
   { href: '/', label: 'Start', icon: 'home' },
   { href: '/wissen', label: 'Wissen', icon: 'book-open' },
   { href: '/arten', label: 'Arten', icon: 'leaf' },
   { href: '/geschichte', label: 'Geschichte', icon: 'clock' },
   { href: '/wissenschaft', label: 'Wissenschaft', icon: 'flask-conical' },
   { href: '/kurioses', label: 'Kurioses', icon: 'sparkles' },
 ]
