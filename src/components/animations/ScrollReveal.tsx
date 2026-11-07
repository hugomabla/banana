 'use client'
 
 import { forwardRef, HTMLAttributes, useRef, useEffect } from 'react'
 import { gsap } from 'gsap'
 import { ScrollTrigger } from 'gsap/ScrollTrigger'
 import { cn } from '@/lib/utils'
 
 if (typeof window !== 'undefined') {
   gsap.registerPlugin(ScrollTrigger)
 }
 
 export interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
   children: React.ReactNode
   y?: number
   x?: number
   scale?: number
   rotation?: number
   opacity?: number
   duration?: number
   delay?: number
   ease?: string
   stagger?: number
   start?: string
   end?: string
   scrub?: boolean | number
   trigger?: string
   once?: boolean
   className?: string
 }
 
 export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
   (
     {
       children,
       className,
       y = 60,
       x = 0,
       scale = 1,
       rotation = 0,
       opacity = 0,
       duration = 0.9,
       delay = 0,
       ease = 'power3.out',
       stagger = 0.1,
       start = 'top 85%',
       end = 'bottom 20%',
       scrub = false,
       trigger,
       once = true,
       ...props
     },
     ref
   ) => {
     const elementRef = useRef<HTMLDivElement>(null)
     const ctxRef = useRef<gsap.Context | null>(null)
 
     useEffect(() => {
       const el = elementRef.current
       if (!el) return
 
       ctxRef.current = gsap.context(() => {
         const targets = trigger ? el.querySelectorAll(trigger) : [el]
 
         if (targets.length === 1 && !trigger) {
           gsap.fromTo(
             targets[0],
             { y, x, scale, rotation, opacity, force3D: true },
             {
               y: 0,
               x: 0,
               scale: 1,
               rotation: 0,
               opacity: 1,
               duration,
               delay,
               ease,
               force3D: true,
               scrollTrigger: {
                 trigger: el,
                 start,
                 end,
                 scrub,
                 toggleActions: scrub ? undefined : 'play none none ' + (once ? 'none' : 'reverse'),
                 once,
               },
             }
           )
         } else {
           gsap.fromTo(
             targets,
             { y, x, scale, rotation, opacity, force3D: true },
             {
               y: 0,
               x: 0,
               scale: 1,
               rotation: 0,
               opacity: 1,
               duration,
               delay,
               ease,
               force3D: true,
               stagger,
               scrollTrigger: {
                 trigger: el,
                 start,
                 end,
                 scrub,
                 toggleActions: scrub ? undefined : 'play none none ' + (once ? 'none' : 'reverse'),
                 once,
               },
             }
           )
         }
       }, el)
 
       return () => {
         ctxRef.current?.revert()
       }
     }, [y, x, scale, rotation, opacity, duration, delay, ease, stagger, start, end, scrub, trigger, once])
 
     return (
       <div ref={elementRef} className={cn('will-change-transform', className)} {...props}>
         {children}
       </div>
     )
   }
 )
 
 ScrollReveal.displayName = 'ScrollReveal'
 
 export interface TextRevealProps extends HTMLAttributes<HTMLDivElement> {
   children: React.ReactNode
   split?: 'lines' | 'words' | 'chars' | 'lines,words' | 'lines,chars' | 'words,chars' | 'lines,words,chars'
   duration?: number
   delay?: number
   ease?: string
   stagger?: number
   start?: string
   className?: string
 }
 
 export const TextReveal = forwardRef<HTMLDivElement, TextRevealProps>(
   (
     {
       children,
       className,
       split = 'lines',
       duration = 0.8,
       delay = 0,
       ease = 'power3.out',
       stagger = 0.05,
       start = 'top 85%',
       ...props
     },
     ref
   ) => {
     const elementRef = useRef<HTMLDivElement>(null)
     const ctxRef = useRef<gsap.Context | null>(null)
 
     useEffect(() => {
       const el = elementRef.current
       if (!el) return
 
       ctxRef.current = gsap.context(() => {
         const text = new SplitText(el, { type: split })
 
         const targets = split.includes('chars')
           ? text.chars
           : split.includes('words')
             ? text.words
             : text.lines
 
         gsap.fromTo(
           targets,
           { y: '100%', opacity: 0 },
           {
             y: '0%',
             opacity: 1,
             duration,
             delay,
             ease,
             stagger,
             scrollTrigger: {
               trigger: el,
               start,
               toggleActions: 'play none none reverse',
             },
           }
         )
       }, el)
 
       return () => {
         ctxRef.current?.revert()
       }
     }, [split, duration, delay, ease, stagger, start])
 
     return (
       <div ref={elementRef} className={cn('overflow-hidden', className)} {...props}>
         {children}
       </div>
     )
   }
 )
 
 TextReveal.displayName = 'TextReveal'
 
 class SplitText {
   el: HTMLElement
   chars: HTMLElement[] = []
   words: HTMLElement[] = []
   lines: HTMLElement[] = []
 
   constructor(el: HTMLElement, options: { type: string }) {
     this.el = el
     this.split(options.type)
   }
 
   split(type: string) {
     const text = this.el.textContent || ''
     const originalHTML = this.el.innerHTML
     this.el.innerHTML = ''
 
     const types = type.split(',')
     const doLines = types.includes('lines')
     const doWords = types.includes('words')
     const doChars = types.includes('chars')
 
     if (doLines) {
       const lines = text.split('\n')
       lines.forEach((line, li) => {
         const lineEl = document.createElement('div')
         lineEl.className = 'split-line'
         lineEl.style.display = 'block'
 
         if (doWords) {
           const words = line.split(' ')
           words.forEach((word, wi) => {
             const wordEl = document.createElement('span')
             wordEl.className = 'split-word'
             wordEl.style.display = 'inline-block'
 
             if (doChars) {
               const chars = word.split('')
               chars.forEach((char) => {
                 const charEl = document.createElement('span')
                 charEl.className = 'split-char'
                 charEl.style.display = 'inline-block'
                 charEl.textContent = char
                 wordEl.appendChild(charEl)
                 this.chars.push(charEl)
               })
             }
 
             lineEl.appendChild(wordEl)
             this.words.push(wordEl)
 
             if (wi < words.length - 1) {
               const space = document.createElement('span')
               space.textContent = ' '
               space.style.display = 'inline-block'
               lineEl.appendChild(space)
             }
           })
         } else if (doChars) {
           const chars = line.split('')
           chars.forEach((char) => {
             const charEl = document.createElement('span')
             charEl.className = 'split-char'
             charEl.style.display = 'inline-block'
             charEl.textContent = char
             lineEl.appendChild(charEl)
             this.chars.push(charEl)
           })
         }
 
         this.el.appendChild(lineEl)
         this.lines.push(lineEl)
 
         if (li < lines.length - 1) {
           this.el.appendChild(document.createElement('br'))
         }
       })
     } else if (doWords) {
       const words = text.split(' ')
       words.forEach((word, wi) => {
         const wordEl = document.createElement('span')
         wordEl.className = 'split-word'
         wordEl.style.display = 'inline-block'
 
         if (doChars) {
           const chars = word.split('')
           chars.forEach((char) => {
             const charEl = document.createElement('span')
             charEl.className = 'split-char'
             charEl.style.display = 'inline-block'
             charEl.textContent = char
             wordEl.appendChild(charEl)
             this.chars.push(charEl)
           })
         }
 
         this.el.appendChild(wordEl)
         this.words.push(wordEl)
 
         if (wi < words.length - 1) {
           const space = document.createElement('span')
           space.textContent = ' '
           space.style.display = 'inline-block'
           this.el.appendChild(space)
         }
       })
     } else if (doChars) {
       const chars = text.split('')
       chars.forEach((char) => {
         const charEl = document.createElement('span')
         charEl.className = 'split-char'
         charEl.style.display = 'inline-block'
         charEl.textContent = char
         this.el.appendChild(charEl)
         this.chars.push(charEl)
       })
     }
 
     if (!doLines && !doWords && !doChars) {
       this.el.innerHTML = originalHTML
     }
   }
 
   revert() {
     this.el.innerHTML = this.el.textContent || ''
   }
 }
