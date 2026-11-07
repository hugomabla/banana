 'use client'
 
 import { forwardRef, HTMLAttributes, useRef, useEffect } from 'react'
 import { gsap } from 'gsap'
 import { ScrollTrigger } from 'gsap/ScrollTrigger'
 import { cn } from '@/lib/utils'
 
 if (typeof window !== 'undefined') {
   gsap.registerPlugin(ScrollTrigger)
 }
 
 export interface ParallaxProps extends HTMLAttributes<HTMLDivElement> {
   children: React.ReactNode
   speed?: number
   direction?: 'vertical' | 'horizontal'
   start?: string
   end?: string
   className?: string
 }
 
 export const Parallax = forwardRef<HTMLDivElement, ParallaxProps>(
   ({ children, className, speed = 0.5, direction = 'vertical', start = 'top bottom', end = 'bottom top', ...props }, ref) => {
     const elementRef = useRef<HTMLDivElement>(null)
     const innerRef = useRef<HTMLDivElement>(null)
     const ctxRef = useRef<gsap.Context | null>(null)
 
     useEffect(() => {
       const el = elementRef.current
       const inner = innerRef.current
       if (!el || !inner) return
 
       ctxRef.current = gsap.context(() => {
         if (direction === 'vertical') {
           gsap.fromTo(
             inner,
             { y: -100 * speed },
             {
               y: 100 * speed,
               ease: 'none',
               scrollTrigger: {
                 trigger: el,
                 start,
                 end,
                 scrub: true,
               },
             }
           )
         } else {
           gsap.fromTo(
             inner,
             { x: -100 * speed },
             {
               x: 100 * speed,
               ease: 'none',
               scrollTrigger: {
                 trigger: el,
                 start,
                 end,
                 scrub: true,
               },
             }
           )
         }
       }, el)
 
       return () => {
         ctxRef.current?.revert()
       }
     }, [speed, direction, start, end])
 
     return (
       <div ref={elementRef} className={cn('relative overflow-hidden', className)} {...props}>
         <div ref={innerRef} className="will-change-transform" style={{ willChange: 'transform' }}>
           {children}
         </div>
       </div>
     )
   }
 )
 
 Parallax.displayName = 'Parallax'
 
 export interface ParallaxLayerProps extends HTMLAttributes<HTMLDivElement> {
   speed: number
   offset?: number
 }
 
 export const ParallaxLayers = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }>(
   ({ children, className, ...props }, ref) => {
     const elementRef = useRef<HTMLDivElement>(null)
     const ctxRef = useRef<gsap.Context | null>(null)
 
     useEffect(() => {
       const el = elementRef.current
       if (!el) return
 
       ctxRef.current = gsap.context(() => {
         const layers = Array.from(el.children) as HTMLElement[]
 
         layers.forEach((layer) => {
           const speed = parseFloat(layer.dataset.speed || '0.5')
           const offset = parseFloat(layer.dataset.offset || '0')
 
           gsap.fromTo(
             layer,
             { y: -offset },
             {
               y: offset + window.innerHeight * speed,
               ease: 'none',
               scrollTrigger: {
                 trigger: el,
                 start: 'top bottom',
                 end: 'bottom top',
                 scrub: true,
               },
             }
           )
         })
       }, el)
 
       return () => {
         ctxRef.current?.revert()
       }
     }, [])
 
     return (
       <div ref={elementRef} className={cn('relative overflow-hidden', className)} {...props}>
         {children}
       </div>
     )
   }
 )
 
 ParallaxLayers.displayName = 'ParallaxLayers'
 
 export const ParallaxLayer = forwardRef<HTMLDivElement, ParallaxLayerProps>(
   ({ children, className, speed = 0.5, offset = 0, ...props }, ref) => {
     return (
       <div
         ref={ref}
         data-speed={speed}
         data-offset={offset}
         className={cn('absolute inset-0 will-change-transform', className)}
         {...props}
       >
         {children}
       </div>
     )
   }
 )
 
 ParallaxLayer.displayName = 'ParallaxLayer'
