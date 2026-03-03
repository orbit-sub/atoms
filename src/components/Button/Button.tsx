import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react'

// ── Variants ──────────────────────────────────────────────────────────────────

/**
 * Maps to Figma "Hierarchy" property.
 *
 * | variant      | Figma Hierarchy            | Destructive behaviour         |
 * |--------------|----------------------------|-------------------------------|
 * | primary      | Primary                    | Red solid (compoundVariant)   |
 * | outline-gray | Secondary Outline Gray     | —                             |
 * | outline      | Secondary Outline          | —                             |
 * | tertiary     | Tertiary                   | Red ghost (compoundVariant)   |
 * | link         | Tertiary Link              | —                             |
 * | secondary    | Secondary (destructive ctx)| Always destructive            |
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center overflow-hidden whitespace-nowrap box-border',
    'cursor-pointer outline-none font-display font-normal',
    'transition-[background,border-color,color,box-shadow] duration-150 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'btn-gradient text-white',
          'hover:btn-gradient-hover',
          'focus-visible:ring-ring',
        ],
        'outline-gray': [
          'bg-[var(--color-btn-outline-gray-bg)] text-[var(--color-btn-outline-gray-text)]',
          'border border-[var(--color-btn-outline-gray-border)]',
          'hover:bg-[var(--color-btn-outline-gray-bg-hover)]',
          'focus-visible:ring-ring',
        ],
        outline: [
          'bg-[var(--color-btn-outline-bg)] text-[var(--color-btn-outline-text)]',
          'border border-[var(--color-btn-outline-border)]',
          'hover:bg-[var(--color-btn-outline-bg-hover)]',
          'focus-visible:ring-ring',
        ],
        tertiary: [
          'bg-transparent text-[var(--color-btn-tertiary-text)]',
          'hover:bg-[var(--color-btn-tertiary-bg-hover)]',
          'focus-visible:ring-ring',
        ],
        link: [
          'bg-transparent text-[var(--color-btn-link-text)] min-w-0',
          'hover:text-[var(--color-btn-link-text-hover)] hover:underline',
          'focus-visible:ring-ring',
        ],
        secondary: [
          'bg-[var(--color-btn-secondary-dest-bg)] text-[var(--color-btn-secondary-dest-text)]',
          'border border-[var(--color-btn-secondary-dest-border)]',
          'hover:bg-[var(--color-btn-secondary-dest-bg-hover)] hover:border-[#f87171]',
          'focus-visible:ring-ring-destructive',
        ],
      },
      size: {
        // Heights: sm=32 md=40 lg=48 xl=56 — matches Figma exactly
        // Tailwind spacing scale: 1 unit = 4px (py-2=8px, py-2.5=10px, py-3=12px, py-4=16px)
        sm: [
          'py-2 px-3 min-h-8 min-w-20 gap-1 rounded-sm',
          'text-xs leading-4 tracking-[var(--letter-spacing-btn-sm)]',
          '[&_.btn-icon]:size-4',
        ],
        md: [
          'py-2.5 px-3 min-h-10 min-w-[100px] gap-2 rounded-md',
          'text-sm leading-5 tracking-[var(--letter-spacing-btn-md)]',
          '[&_.btn-icon]:size-5',
        ],
        lg: [
          'py-3 px-4 min-h-12 min-w-[100px] gap-2 rounded-md',
          'text-base leading-6 tracking-[var(--letter-spacing-btn-lg)]',
          '[&_.btn-icon]:size-5',
        ],
        xl: [
          'py-4 px-5 min-h-14 min-w-[100px] gap-2 rounded-md',
          'text-base leading-6 tracking-[var(--letter-spacing-btn-lg)]',
          '[&_.btn-icon]:size-6',
        ],
      },
      destructive: { true: '', false: '' },
      iconOnly:    { true: 'min-w-0', false: '' },
    },
    compoundVariants: [
      // Primary + destructive → red solid
      {
        variant: 'primary',
        destructive: true,
        className: [
          'bg-destructive text-destructive-fg',
          'hover:bg-destructive-hover',
          'focus-visible:ring-ring-destructive',
        ],
      },
      // Tertiary + destructive → red ghost
      {
        variant: 'tertiary',
        destructive: true,
        className: [
          'text-[var(--color-btn-tertiary-dest-text)]',
          'hover:bg-[var(--color-btn-tertiary-dest-bg-hover)]',
          'focus-visible:ring-ring-destructive',
        ],
      },
      // Icon-only: square dimensions, remove padding, override min-w from size
      { iconOnly: true, size: 'sm', className: 'w-8  h-8  p-0' },
      { iconOnly: true, size: 'md', className: 'w-10 h-10 p-0' },
      { iconOnly: true, size: 'lg', className: 'w-12 h-12 p-0' },
      { iconOnly: true, size: 'xl', className: 'w-14 h-14 p-0' },
    ],
    defaultVariants: {
      variant:     'primary',
      size:        'md',
      destructive: false,
      iconOnly:    false,
    },
  }
)

// ── Types ──────────────────────────────────────────────────────────────────────

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
export type ButtonSize    = NonNullable<VariantProps<typeof buttonVariants>['size']>

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** Renders the button's child element instead of a <button> (Radix Slot). */
    asChild?:   boolean
    /** Icon slot rendered before the label. */
    leadIcon?:  ReactNode
    /** Icon slot rendered after the label. Hidden in iconOnly mode. */
    trailIcon?: ReactNode
  }

// ── Component ──────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      destructive,
      iconOnly,
      asChild = false,
      leadIcon,
      trailIcon,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const Comp = (asChild ? Slot : 'button') as ElementType<ButtonHTMLAttributes<HTMLButtonElement>>

    return (
      <Comp
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size, destructive, iconOnly }), className)}
        {...props}
      >
        {leadIcon && (
          <span className="btn-icon inline-flex items-center shrink-0" aria-hidden="true">
            {leadIcon}
          </span>
        )}

        {!iconOnly && <span className="shrink-0">{children}</span>}

        {trailIcon && !iconOnly && (
          <span className="btn-icon inline-flex items-center shrink-0" aria-hidden="true">
            {trailIcon}
          </span>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
