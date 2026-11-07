 'use client'
 
 import { forwardRef, HTMLAttributes } from 'react'
 import { cn } from '@/lib/utils'
 
 export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
   variant?: 'yellow' | 'cream' | 'charcoal' | 'outline' | 'glow'
   size?: 'sm' | 'md' | 'lg'
   dot?: boolean
   dotColor?: string
 }
 
 export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
   ({ children, className, variant = 'yellow', size = 'md', dot = false, dotColor, ...props }, ref) => {
     const variants = {
       yellow: 'bg-banana-500/20 text-banana-400 border border-banana-500/30 hover:bg-banana-500/30',
       cream: 'bg-cream-200 text-charcoal-700 border border-cream-300 hover:bg-cream-300',
       charcoal: 'bg-charcoal-800 text-cream-100 border border-white/10 hover:bg-charcoal-700',
       outline: 'bg-transparent border-2 border-banana-500/50 text-banana-400 hover:bg-banana-500/10',
       glow: 'bg-banana-500/10 text-banana-400 border border-banana-500/30 shadow-glow-yellow/20',
     }
 
     const sizes = {
       sm: 'px-2.5 py-0.5 text-[0.65rem]',
       md: 'px-3 py-1 text-caption',
       lg: 'px-4 py-1.5 text-body-sm',
     }
 
     return (
       <span
         ref={ref}
         className={cn(
           'inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-300',
           variants[variant],
           sizes[size],
           className
         )}
         {...props}
       >
         {dot && (
           <span
             className="w-1.5 h-1.5 rounded-full flex-shrink-0"
             style={{ backgroundColor: dotColor || 'currentColor' }}
           />
         )}
         {children}
       </span>
     )
   }
 )
 
 Badge.displayName = 'Badge'
