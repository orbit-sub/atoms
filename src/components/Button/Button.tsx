import './Button.css'
import type { MouseEventHandler, ReactNode } from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

/**
 * Maps to Figma "Hierarchy" property.
 *
 * | React variant   | Figma Hierarchy            | Destructive variant           |
 * |-----------------|----------------------------|-------------------------------|
 * | primary         | Primary                    | Red filled                    |
 * | outline-gray    | Secondary Outline Gray     | (no explicit Figma variant)   |
 * | outline         | Secondary Outline          | (no explicit Figma variant)   |
 * | tertiary        | Tertiary                   | Ghost with red text           |
 * | link            | Tertiary Link              | (no explicit Figma variant)   |
 * | secondary       | Secondary (destructive ctx)| Light-red bg, red border/text |
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline-gray'
  | 'outline'
  | 'tertiary'
  | 'link'

/** Maps to Figma "Size" property. Heights: sm=32 md=40 lg=48 xl=56 */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export type ButtonProps = {
  /** Button label. Ignored when iconOnly=true. */
  children?: ReactNode
  /** Visual hierarchy. Defaults to 'primary'. */
  variant?: ButtonVariant
  /** Button size. Defaults to 'md'. */
  size?: ButtonSize
  /**
   * Switches to the destructive (red) colour palette.
   * Affects: primary, tertiary.
   * Note: `secondary` is already a destructive-only variant.
   */
  destructive?: boolean
  /** Disables the button. Maps to Figma State=Disable (opacity 0.4). */
  disabled?: boolean
  /**
   * Renders a square icon-only button with no label.
   * Pass the icon as `leadIcon`. Requires `aria-label` for accessibility.
   */
  iconOnly?: boolean
  /** Icon slot rendered before the label. */
  leadIcon?: ReactNode
  /** Icon slot rendered after the label. Hidden in iconOnly mode. */
  trailIcon?: ReactNode
  /** Extra classes for one-off overrides. */
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  /** Required when iconOnly=true — provides accessible text for screen readers. */
  'aria-label'?: string
}

// ── Component ────────────────────────────────────────────────────────────────

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  destructive = false,
  disabled = false,
  iconOnly = false,
  leadIcon,
  trailIcon,
  className,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) => {
  const classes = [
    'ds-btn',
    `ds-btn--${variant}`,
    `ds-btn--${size}`,
    destructive   ? 'ds-btn--destructive' : '',
    iconOnly      ? 'ds-btn--icon-only'   : '',
    className     ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
    >
      {leadIcon && (
        <span className="ds-btn__icon ds-btn__icon--lead" aria-hidden="true">
          {leadIcon}
        </span>
      )}

      {!iconOnly && (
        <span className="ds-btn__label">{children}</span>
      )}

      {trailIcon && !iconOnly && (
        <span className="ds-btn__icon ds-btn__icon--trail" aria-hidden="true">
          {trailIcon}
        </span>
      )}
    </button>
  )
}
