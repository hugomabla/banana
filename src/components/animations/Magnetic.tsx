 'use client'
 
 import { forwardRef, HTMLAttributes, useRef, useEffect } from 'react'
 import { gsap } from 'gsap'
 import { cn } from '@/lib/utils'
 
 export interface MagneticProps extends HTMLAttributes<HTMLDivElement> {
   children: React.ReactNode
   strength?: number
   area?: number
   className?: string
 }
 
 export const Magnetic = forwardRef<HTMLDivElement, MagneticProps>(
   ({ children, className, strength = 0.3, area = 150, ...props }, ref) => {
     const elementRef = useRef<HTMLDivElement>(null)
     const childRef = useRef<HTMLDivElement>(null)
 
     useEffect(() => {
       const el = elementRef.current
       const child = childRef.current
       if (!el || !child) return
 
       const handleMouseMove = (e: MouseEvent) => {
         const rect = el.getBoundingClientRect()
         const x = e.clientX - rect.left - rect.width / 2
         const y = e.clientY - rect.top - rect.height / 2
         const distance = Math.sqrt(x * x + y * y)
 
         if (distance < area) {
           const factor = 1 - distance / area
           gsap.to(child, {
             x: x * strength * factor,
             y: y * strength * factor,
             duration: 0.3,
             ease: 'power2.out',
           })
         }
       }
 
       const handleMouseLeave = () => {
         gsap.to(child, {
           x: 0,
           y: 0,
           duration: 0.6,
           ease: 'elastic.out(1, 0.4)',
         })
       }
 
       el.addEventListener('mousemove', handleMouseMove)
       el.addEventListener('mouseleave', handleMouseLeave)
 
       return () => {
         el.removeEventListener('mousemove', handleMouseMove)
         el.removeEventListener('mouseleave', handleMouseLeave)
       }
     }, [strength, area])
 
     return (
       <div ref={elementRef} className={cn('relative inline-block cursor-pointer', className)} {...props}>
         <div ref={childRef} className="will-change-transform">{children}</div>
       </div>
     )
   }
 )
 
 Magnetic.displayName = 'Magnetic'
 
 export interface MagneticTextProps extends HTMLAttributes<HTMLSpanElement> {
   children: React.ReactNode
   strength?: number
   className?: string
 }
 
 export const MagneticText = forwardRef<HTMLSpanElement, MagneticTextProps>(
   ({ children, className, strength = 0.15, ...props }, ref) => {
     const elementRef = useRef<HTMLSpanElement>(null)
 
     useEffect(() => {
       const el = elementRef.current
       if (!el) return
 
       const handleMouseMove = (e: MouseEvent) => {
         const rect = el.getBoundingClientRect()
         const x = e.clientX - rect.left - rect.width / 2
         const y = e.clientY - rect.top - rect.height / 2
 
         gsap.to(el, {
           x: x * strength,
           y: y * strength,
           duration: 0.3,
           ease: 'power2.out',
         })
       }
 
       const handleMouseLeave = () => {
         gsap.to(el, {
           x: 0,
           y: 0,
           duration: 0.5,
           ease: 'elastic.out(1, 0.5)',
         })
       }
 
       el.addEventListener('mousemove', handleMouseMove)
       el.addEventListener('mouseleave', handleMouseLeave)
 
       return () => {
         el.removeEventListener('mousemove', handleMouseMove)
         el.removeEventListener('mouseleave', handleMouseLeave)
       }
     }, [strength])
 
     return (
       <span ref={elementRef} className={cn('inline-block will-change-transform cursor-default', className)} {...props}>
         {children}
       </span>
     )
   }
 )
 
 MagneticText.displayName = 'MagneticText'
