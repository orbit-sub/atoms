import './Alert.css'
import type { ReactNode } from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

/**
 * Maps to Figma "state" property (node 567:5383).
 *
 * | React variant | Figma state | Border / Text color     |
 * |---------------|-------------|-------------------------|
 * | info          | Info        | sky-500  / sky-600       |
 * | warning       | Warning     | amber-400 / amber-700   |
 * | error         | Error       | red-500  / red-500      |
 * | success       | Success     | green-500 / green-700   |
 * | discovery     | Discovery   | purple-600 / purple-700 |
 * | neutral       | Neutral     | zinc-500  / zinc-600    |
 */
export type AlertVariant =
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'discovery'
  | 'neutral'

export type AlertProps = {
  /** Optional bold heading rendered above the description. */
  title?: string
  /** Main alert message. Required. */
  description: string
  /** Visual variant. Defaults to 'info'. */
  variant?: AlertVariant
  /**
   * When true, renders the close (×) button on the right.
   * Maps to Figma `closeIcon` property.
   */
  dismissible?: boolean
  /** Called when the close button is clicked. */
  onClose?: () => void
  /** Slot to override the default info-circle icon. */
  icon?: ReactNode
}

// ── Icons ────────────────────────────────────────────────────────────────────
// Approximates vuesax/linear/info-circle — used for all variants in Figma.
// Coloured via CSS `currentColor` to inherit the variant's text colour.

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

// Approximates vuesax/linear/Cancel — the close × button icon.
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

// ── Component ────────────────────────────────────────────────────────────────

export const Alert = ({
  title,
  description,
  variant = 'info',
  dismissible = false,
  onClose,
  icon,
}: AlertProps) => {
  const classes = [
    'ds-alert',
    `ds-alert--${variant}`,
    dismissible ? 'ds-alert--dismissible' : '',
    title       ? 'ds-alert--has-title'   : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="alert">
      {/* ── Body: icon + text ── */}
      <div className="ds-alert__body">
        <div className="ds-alert__content">
          <span className="ds-alert__icon">
            {icon ?? <InfoCircleIcon />}
          </span>

          <div className="ds-alert__text">
            {title && (
              <p className="ds-alert__title">{title}</p>
            )}
            <p className="ds-alert__description">{description}</p>
          </div>
        </div>
      </div>

      {/* ── Close button ── */}
      {dismissible && (
        <button
          className="ds-alert__close"
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
