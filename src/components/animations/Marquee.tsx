 'use client'
 
 import { forwardRef, HTMLAttributes, useRef, useEffect, useState } from 'react'
 import { gsap } from 'gsap'
 import { cn } from '@/lib/utils'
 
 export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
   children: React.ReactNode
   speed?: number
   direction?: 'left' | 'right'
   reverse?: boolean
   pauseOnHover?: boolean
   gap?: number
   className?: string
 }
 
 export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
   ({
     children,
     className,
     speed = 50,
     direction = 'left',
     reverse = false,
     pauseOnHover = true,
     gap = 24,
     ...props
   }, ref) => {
     const elementRef = useRef<HTMLDivElement>(null)
     const trackRef = useRef<HTMLDivElement>(null)
     const [isPaused, setIsPaused] = useState(false)
     const animationRef = useRef<gsap.core.Tween | null>(null)
 
     useEffect(() => {
       const el = elementRef.current
       const track = trackRef.current
       if (!el || !track) return
 
       const clone = track.cloneNode(true) as HTMLDivElement
       track.parentNode?.appendChild(clone)
 
       const trackWidth = track.scrollWidth
       const duration = trackWidth / speed
 
       const animate = () => {
         if (isPaused) return
 
         animationRef.current = gsap.fromTo(
           [track, clone],
           { x: direction === 'left' ? 0 : -trackWidth },
           {
             x: direction === 'left' ? -trackWidth : 0,
             duration,
             ease: 'none',
             repeat: -1,
             onRepeat: () => {
               gsap.set([track, clone], { x: direction === 'left' ? 0 : -trackWidth })
             },
           }
         )
       }
 
       animate()
 
       return () => {
         animationRef.current?.kill()
         clone.remove()
       }
     }, [speed, direction, isPaused, children])
 
     const handleMouseEnter = () => {
       if (pauseOnHover) setIsPaused(true)
     }
 
     const handleMouseLeave = () => {
       if (pauseOnHover) setIsPaused(false)
     }
 
     return (
       <div
         ref={elementRef}
         className={cn('relative overflow-hidden', className)}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         {...props}
       >
         <div
           ref={trackRef}
           className="flex items-center gap-8"
           style={{ gap: `${gap}px`, whiteSpace: 'nowrap' }}
         >
           {children}
         </div>
       </div>
     )
   }
 )
 
 Marquee.displayName = 'Marquee'
 
 export interface MarqueeItemProps extends HTMLAttributes<HTMLDivElement> {
   children: React.ReactNode
   className?: string
 }
 
 export const MarqueeItem = forwardRef<HTMLDivElement, MarqueeItemProps>(
   ({ children, className, ...props }, ref) => (
     <div ref={ref} className={cn('flex-shrink-0', className)} {...props}>
       {children}
     </div>
   )
 )
 
 MarqueeItem.displayName = 'MarqueeItem'
