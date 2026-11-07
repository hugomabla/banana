 'use client'
 
 import { forwardRef, HTMLAttributes } from 'react'
 import { cn } from '@/lib/utils'
 
 export interface CardProps extends HTMLAttributes<HTMLDivElement> {
   variant?: 'default' | 'cream' | 'glass' | 'elevated'
   hover?: boolean
   padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
 }
 
 export const Card = forwardRef<HTMLDivElement, CardProps>(
   ({ children, className, variant = 'default', hover = true, padding = 'md', ...props }, ref) => {
     const variants = {
       default: 'bg-charcoal-900/50 border border-white/10 hover:border-banana-500/30',
       cream: 'bg-cream-50/80 border border-banana-200/50 hover:border-banana-400/50',
       glass: 'bg-charcoal-900/60 backdrop-blur-2xl border border-white/10',
       elevated: 'bg-charcoal-900 border border-white/5 shadow-premium',
     }
 
     const paddings = {
       none: '',
       sm: 'p-4',
       md: 'p-6',
       lg: 'p-8',
       xl: 'p-10',
     }
 
     return (
       <div
         ref={ref}
         className={cn(
           'relative overflow-hidden rounded-3xl backdrop-blur-xl transition-all duration-500 ease-out-expo',
           variants[variant],
           paddings[padding],
           hover && 'hover:shadow-premium-lg',
           className
         )}
         {...props}
       >
         {children}
       </div>
     )
   }
 )
 
 Card.displayName = 'Card'
 
 export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
   ({ className, ...props }, ref) => (
     <div ref={ref} className={cn('mb-4', className)} {...props} />
   )
 )
 
 CardHeader.displayName = 'CardHeader'
 
 export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
   ({ className, ...props }, ref) => (
     <h3
       ref={ref}
       className={cn('text-heading-lg font-semibold text-foreground', className)}
       {...props}
     />
   )
 )
 
 CardTitle.displayName = 'CardTitle'
 
 export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
   ({ className, ...props }, ref) => (
     <p
       ref={ref}
       className={cn('mt-2 text-body text-muted-foreground', className)}
       {...props}
     />
   )
 )
 
 CardDescription.displayName = 'CardDescription'
 
 export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
   ({ className, ...props }, ref) => (
     <div ref={ref} className={cn('', className)} {...props} />
   )
 )
 
 CardContent.displayName = 'CardContent'
 
 export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
   ({ className, ...props }, ref) => (
     <div ref={ref} className={cn('mt-4 flex items-center gap-2', className)} {...props} />
   )
 )
 
 CardFooter.displayName = 'CardFooter'
