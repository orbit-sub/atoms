import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

// ── Variants ──────────────────────────────────────────────────────────────────

/**
 * Maps to Figma "state" property (node 567:5383).
 *
 * | variant   | Figma state | Border / Text color     |
 * |-----------|-------------|-------------------------|
 * | info      | Info        | sky-500  / sky-600       |
 * | warning   | Warning     | amber-400 / amber-700   |
 * | error     | Error       | red-500  / red-500      |
 * | success   | Success     | green-500 / green-700   |
 * | discovery | Discovery   | purple-600 / purple-700 |
 * | neutral   | Neutral     | zinc-500  / zinc-600    |
 *
 * Colors are mapped from tokens.css via @theme inline in globals.css,
 * so `bg-alert-info-bg` resolves to `var(--color-alert-info-bg)` at runtime.
 */
const alertVariants = cva(
  'flex items-center gap-4 py-0.5 pr-4 border-l-2 w-full box-border',
  {
    variants: {
      variant: {
        info:      'bg-alert-info-bg      border-alert-info-border      text-alert-info-fg',
        warning:   'bg-alert-warning-bg   border-alert-warning-border   text-alert-warning-fg',
        error:     'bg-alert-error-bg     border-alert-error-border     text-alert-error-fg',
        success:   'bg-alert-success-bg   border-alert-success-border   text-alert-success-fg',
        discovery: 'bg-alert-discovery-bg border-alert-discovery-border text-alert-discovery-fg',
        neutral:   'bg-alert-neutral-bg   border-alert-neutral-border   text-alert-neutral-fg',
      },
    },
    defaultVariants: { variant: 'info' },
  }
)

// ── Sub-components ─────────────────────────────────────────────────────────────

/** Bold heading rendered above the description. */
export const AlertTitle = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <p className={cn(
    'm-0 font-display font-semibold text-sm leading-5 tracking-[var(--letter-spacing-body-sm)]',
    className
  )}>
    {children}
  </p>
)

/** Main alert message body. */
export const AlertDescription = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <p className={cn(
    'm-0 font-display font-normal text-sm leading-5 tracking-[var(--letter-spacing-body-sm)]',
    className
  )}>
    {children}
  </p>
)

// ── Icons ──────────────────────────────────────────────────────────────────────
// Inline SVGs — no icon library dependency. Color inherited via currentColor.

const InfoCircleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 9.5V13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
  </svg>
)

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 5l10 10M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// ── Types ──────────────────────────────────────────────────────────────────────

export type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>

export type AlertProps = VariantProps<typeof alertVariants> & {
  /** Optional bold heading rendered above the description. */
  title?: string
  /** Main alert message. Required. */
  description: string
  /**
   * When true, renders the close (×) button on the right.
   * Maps to Figma `closeIcon` property.
   */
  dismissible?: boolean
  /** Called when the close button is clicked. */
  onClose?: () => void
  /** Slot to override the default info-circle icon. */
  icon?: ReactNode
  className?: string
}

// ── Component ──────────────────────────────────────────────────────────────────

export const Alert = ({
  title,
  description,
  variant,
  dismissible = false,
  onClose,
  icon,
  className,
}: AlertProps) => {
  const hasTitle = Boolean(title)

  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)}>

      {/* ── Body: icon + text ── */}
      <div className="flex-1 flex items-center self-stretch min-w-0">
        <div className={cn(
          'flex-1 flex gap-2 py-2 pl-4 min-w-0 overflow-hidden',
          hasTitle ? 'items-start' : 'items-center'
        )}>
          <span className={cn(
            'inline-flex items-center shrink-0 size-5',
            hasTitle && 'mt-[1px]'
          )}>
            {icon ?? <InfoCircleIcon />}
          </span>

          <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
            {title && <AlertTitle>{title}</AlertTitle>}
            <AlertDescription>{description}</AlertDescription>
          </div>
        </div>
      </div>

      {/* ── Close button ── */}
      {dismissible && (
        <button
          className={cn(
            'flex items-center justify-center shrink-0 size-5 p-0',
            'bg-transparent border-none rounded-xs cursor-pointer',
            'text-inherit opacity-70',
            'transition-[opacity,background] duration-150 ease-in-out',
            'hover:opacity-100 hover:bg-black/6',
            'focus-visible:outline focus-visible:outline-2',
            'focus-visible:outline-current focus-visible:outline-offset-2',
          )}
          onClick={onClose}
          type="button"
          aria-label="Dismiss alert"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}
