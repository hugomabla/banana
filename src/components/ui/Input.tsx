 'use client'
 
 import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
 import { cn } from '@/lib/utils'
 
 export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   label?: string
   error?: string
   hint?: string
 }
 
 export const Input = forwardRef<HTMLInputElement, InputProps>(
   ({ className, label, error, hint, id, ...props }, ref) => {
     const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`
 
     return (
       <div className="w-full">
         {label && (
           <label
             htmlFor={inputId}
             className="mb-2 block text-body-sm font-medium text-foreground"
           >
             {label}
           </label>
         )}
         <input
           ref={ref}
           id={inputId}
           className={cn(
             'w-full rounded-2xl bg-charcoal-800/50 border px-4 py-3.5 text-body text-foreground placeholder:text-muted-foreground transition-all duration-300',
             error
               ? 'border-banana-500/50 focus:border-banana-500 focus:ring-2 focus:ring-banana-500/20'
               : 'border-white/10 focus:border-banana-500/50 focus:ring-2 focus:ring-banana-500/20 focus:bg-charcoal-800',
             className
           )}
           aria-invalid={error ? 'true' : 'false'}
           aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
           {...props}
         />
         {error && (
           <p id={`${inputId}-error`} className="mt-2 text-body-sm text-banana-400" role="alert">
             {error}
           </p>
         )}
         {hint && !error && (
           <p id={`${inputId}-hint`} className="mt-2 text-body-sm text-muted-foreground">
             {hint}
           </p>
         )}
       </div>
     )
   }
 )
 
 Input.displayName = 'Input'
 
 export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   label?: string
   error?: string
   hint?: string
 }
 
 export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
   ({ className, label, error, hint, id, ...props }, ref) => {
     const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`
 
     return (
       <div className="w-full">
         {label && (
           <label
             htmlFor={textareaId}
             className="mb-2 block text-body-sm font-medium text-foreground"
           >
             {label}
           </label>
         )}
         <textarea
           ref={ref}
           id={textareaId}
           className={cn(
             'w-full rounded-2xl bg-charcoal-800/50 border px-4 py-3.5 text-body text-foreground placeholder:text-muted-foreground transition-all duration-300 resize-y min-h-[120px]',
             error
               ? 'border-banana-500/50 focus:border-banana-500 focus:ring-2 focus:ring-banana-500/20'
               : 'border-white/10 focus:border-banana-500/50 focus:ring-2 focus:ring-banana-500/20 focus:bg-charcoal-800',
             className
           )}
           aria-invalid={error ? 'true' : 'false'}
           aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
           {...props}
         />
         {error && (
           <p id={`${textareaId}-error`} className="mt-2 text-body-sm text-banana-400" role="alert">
             {error}
           </p>
         )}
         {hint && !error && (
           <p id={`${textareaId}-hint`} className="mt-2 text-body-sm text-muted-foreground">
             {hint}
           </p>
         )}
       </div>
     )
   }
 )
 
 Textarea.displayName = 'Textarea'
