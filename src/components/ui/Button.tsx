'use client'

import { forwardRef, ButtonHTMLAttributes, isValidElement, cloneElement } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'cream' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  asChild?: boolean
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    asChild = false,
    loading = false,
    fullWidth = false,
    disabled,
    ...props
  }, ref) => {
    const variants = {
      primary: 'bg-banana-500 text-charcoal-950 hover:bg-banana-400 hover:shadow-glow-yellow active:scale-[0.98] active:bg-banana-600',
      secondary: 'bg-charcoal-800 text-cream-50 border border-white/10 hover:bg-charcoal-700 hover:border-white/20 hover:shadow-premium active:scale-[0.98]',
      ghost: 'bg-transparent text-foreground hover:bg-white/5 active:scale-[0.98]',
      cream: 'bg-cream-400 text-charcoal-950 hover:bg-cream-300 hover:shadow-glow-cream active:scale-[0.98]',
      outline: 'bg-transparent border border-white/20 text-foreground hover:bg-white/5 hover:border-white/30 active:scale-[0.98]',
    }

    const sizes = {
      xs: 'px-3 py-1.5 text-caption rounded-xl gap-1.5',
      sm: 'px-4 py-2 text-body-sm rounded-xl gap-2',
      md: 'px-6 py-3.5 text-body rounded-2xl gap-2',
      lg: 'px-8 py-4 text-body-lg rounded-2xl gap-2.5',
      xl: 'px-10 py-5 text-heading-sm rounded-2xl gap-3',
    }

    const baseClassName = cn(
      'relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out-expo',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banana-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900',
      'disabled:pointer-events-none disabled:opacity-50',
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    )

    // Handle asChild by cloning the child element with merged props
    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<any>
      const mergedProps = {
        ...child.props,
        className: cn(baseClassName, child.props.className),
        ref,
        disabled: disabled || loading,
        ...props,
      }

      return cloneElement(child, mergedProps, child.props.children)
    }

    return (
      <button
        ref={ref}
        className={baseClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export const ButtonGroup = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('inline-flex items-center gap-2', className)} {...props}>
    {children}
  </div>
)

ButtonGroup.displayName = 'ButtonGroup'
