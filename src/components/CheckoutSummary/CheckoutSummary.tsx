import { cn } from '../../lib/utils'
import { Button } from '../Button/Button'
import type { ReactNode } from 'react'

// ── Icons ──────────────────────────────────────────────────────────────────
// Inline SVGs — no icon-library dependency. Color inherited via currentColor.

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z"
      stroke="currentColor" strokeWidth="1.5"
    />
    <path
      d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.19 5.19 0 0 1-7.21 0C5.63 17.87 2.47 13.56 3.62 8.49Z"
      stroke="currentColor" strokeWidth="1.5"
    />
  </svg>
)

const ReceiptIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.667 7.5h6.666M6.667 10.833h4.166" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <path
      d="M8.333 17.5H6.667c-3.334 0-4.167-.834-4.167-4.167V6.667c0-3.333.833-4.167 4.167-4.167h6.666c3.334 0 4.167.834 4.167 4.167V10"
      stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="m14.167 13.75 1.25 1.25 2.5-2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.667 1.667V4.167M13.333 1.667V4.167M2.917 7.575h14.167M17.5 7.083v7.084c0 2.5-.834 4.166-4.167 4.166H6.667c-3.334 0-4.167-1.666-4.167-4.166V7.083c0-2.5.833-4.166 4.167-4.166h6.666c3.333 0 4.167 1.666 4.167 4.166Z"
      stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
    />
    <path
      d="M13.08 11.417h.008M13.08 13.917h.008M9.996 11.417h.009M9.996 13.917h.009M6.913 11.417h.008M6.913 13.917h.008"
      stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5.333 8l1.667 1.667L10.667 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ── Sub-components ─────────────────────────────────────────────────────────

type InfoRowProps = {
  icon: ReactNode
  label: string
  value: string
  iconSize?: string
}

const InfoRow = ({ icon, label, value, iconSize = 'size-5' }: InfoRowProps) => (
  <div className="flex gap-3 items-center w-full">
    <div className="bg-bg-primary border border-border-secondary rounded-md p-3 shrink-0 flex items-center justify-center text-text-tertiary">
      <span className={cn('inline-flex', iconSize)}>{icon}</span>
    </div>
    <div className="flex-1 flex flex-col gap-1 min-w-0">
      <p className="font-display font-normal text-xs leading-4 tracking-[-0.24px] text-text-tertiary">{label}</p>
      <p className="font-display font-medium text-sm leading-[22px] tracking-[-0.14px] text-text-secondary">{value}</p>
    </div>
  </div>
)

// ── Types ──────────────────────────────────────────────────────────────────

export type SubscriberEntry = {
  /** Member's full name */
  name: string
  /** Role label e.g. "Primary Member" | "Dependent 1" */
  role: string
  /** Dental plan name e.g. "Espire Adult" */
  planName: string
  /** Formatted annual cost string e.g. "$292.42" */
  annualCost: string
  /** Formatted plan credit string (negative) e.g. "-$72.42" */
  planCredit: string
  /** Uses info/sky background and sky-200 divider border */
  isPrimary?: boolean
}

export type CheckoutSummaryProps = {
  /** Provider office name */
  providerLocation?: string
  /** Billing frequency description */
  billingFrequency?: string
  /** Subscription date range string */
  subscriptionPeriod?: string
  /** Subscriber + dependent entries */
  subscribers?: SubscriberEntry[]
  /** Formatted subtotal string e.g. "$500.00" */
  subtotal?: string
  /** Formatted processing fees string e.g. "$8.56" */
  processingFees?: string
  /** Formatted total amount due e.g. "$508.56" */
  amountDue?: string
  /** Called when "Have a Promo Code?" is clicked. Omit to hide the link. */
  onPromoCode?: () => void
  /** Controlled checked state of the T&C checkbox */
  termsAccepted?: boolean
  /** Called when T&C checkbox changes */
  onTermsChange?: (checked: boolean) => void
  /** Shows the paperless communication confirmation notice */
  paperlessEnabled?: boolean
  /** Called when "Start Subscription" button is clicked */
  onStartSubscription?: () => void
  /** Called when "Save Draft" button is clicked */
  onSaveDraft?: () => void
  className?: string
}

// ── Component ──────────────────────────────────────────────────────────────

export const CheckoutSummary = ({
  providerLocation = '1st Family Dental of Fox Valley',
  billingFrequency = 'Annual Billed Monthly',
  subscriptionPeriod = 'March 18, 2025 - March 18, 2026',
  subscribers = [],
  subtotal = '$0.00',
  processingFees = '$0.00',
  amountDue = '$0.00',
  onPromoCode,
  termsAccepted = false,
  onTermsChange,
  paperlessEnabled = false,
  onStartSubscription,
  onSaveDraft,
  className,
}: CheckoutSummaryProps) => (
  <div
    className={cn(
      'bg-bg-primary border border-border-secondary rounded-xl p-6 flex flex-col gap-6 w-full box-border',
      className
    )}
  >
    {/* ── Title ── */}
    <h2 className="font-display font-medium text-lg leading-6 tracking-[-0.18px] text-text-primary shrink-0 m-0">
      Checkout Summary
    </h2>

    {/* ── Divider ── */}
    <hr className="border-none border-t border-border-secondary w-full m-0 shrink-0" />

    {/* ── Meta info rows ── */}
    <div className="flex flex-col gap-5 w-full shrink-0">
      <InfoRow icon={<LocationIcon />} label="Provider's Location" value={providerLocation} iconSize="size-6" />
      <InfoRow icon={<ReceiptIcon />}  label="Billing Frequency"   value={billingFrequency} />
      <InfoRow icon={<CalendarIcon />} label="Subscription Period"  value={subscriptionPeriod} />
    </div>

    {/* ── Subscriber cards ── */}
    {subscribers.map((s, i) => (
      <div
        key={i}
        className={cn(
          'flex flex-col gap-4 p-4 rounded-md w-full overflow-hidden shrink-0',
          s.isPrimary ? 'bg-bg-info' : 'bg-bg-secondary'
        )}
      >
        {/* Header */}
        <div className="flex flex-col gap-0 w-full">
          <div className="flex items-center justify-between w-full">
            <p className="font-display font-medium text-sm leading-[22px] tracking-[-0.14px] text-text-primary m-0">
              {s.name}
            </p>
            <p className="font-display font-normal text-xs leading-4 text-text-secondary m-0">
              {s.role}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-display font-normal text-[12px] leading-4 tracking-[-0.12px] text-text-secondary m-0">Plan Name:</p>
            <p className="font-display font-normal text-[12px] leading-4 tracking-[-0.12px] text-text-secondary m-0">{s.planName}</p>
          </div>
        </div>

        {/* Pricing rows */}
        <div className="flex flex-col gap-2 w-full">
          <div className={cn(
            'flex items-start justify-between pt-3 border-t',
            s.isPrimary ? 'border-border-info' : 'border-border-secondary'
          )}>
            <p className="font-display font-normal text-xs leading-4 text-text-tertiary m-0 whitespace-nowrap">Annual Cost</p>
            <p className="font-display font-medium text-xs leading-4 text-text-primary m-0 whitespace-nowrap">{s.annualCost}</p>
          </div>
          <div className="flex items-start justify-between">
            <p className="font-display font-normal text-xs leading-4 text-text-tertiary m-0 whitespace-nowrap">Plan Credit</p>
            <p className="font-display font-medium text-xs leading-4 text-text-success m-0 whitespace-nowrap">{s.planCredit}</p>
          </div>
        </div>
      </div>
    ))}

    {/* ── Total section ── */}
    <div className="flex flex-col gap-4 border-t border-border-primary pt-5 w-full shrink-0">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-start justify-between pr-4 w-full">
          <p className="font-display font-normal text-sm leading-5 tracking-[-0.42px] text-text-tertiary m-0 whitespace-nowrap">Subtotal</p>
          <p className="font-display font-medium text-base leading-[22px] text-text-secondary m-0 whitespace-nowrap">{subtotal}</p>
        </div>
        <div className="flex items-start justify-between pr-4 w-full">
          <p className="font-display font-normal text-sm leading-5 tracking-[-0.42px] text-text-tertiary m-0 whitespace-nowrap">Processing Fees</p>
          <p className="font-display font-normal text-sm leading-5 tracking-[-0.42px] text-text-secondary m-0 whitespace-nowrap">{processingFees}</p>
        </div>
        {onPromoCode && (
          <button
            type="button"
            onClick={onPromoCode}
            className="font-display font-normal text-sm leading-5 tracking-[-0.42px] text-text-brand bg-transparent border-none p-0 cursor-pointer text-left w-fit"
          >
            Have a Promo Code?
          </button>
        )}
      </div>

      <hr className="border-none border-t border-border-primary w-full m-0" />

      <div className="flex items-center justify-between pr-4 w-full">
        <p className="font-display font-medium text-lg leading-6 tracking-[-0.18px] text-text-primary m-0 whitespace-nowrap">Amount Due</p>
        <p className="font-display font-medium text-xl leading-6 tracking-[-0.4px] text-text-success m-0 whitespace-nowrap">{amountDue}</p>
      </div>
    </div>

    {/* ── T&C section ── */}
    <div className="flex flex-col gap-4 py-2 w-full shrink-0">
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onTermsChange?.(e.target.checked)}
          className="mt-0 shrink-0 size-4 rounded-xs border border-border-primary bg-bg-primary cursor-pointer accent-brand"
        />
        <p className="font-display font-normal text-xs leading-4 tracking-[-0.24px] text-text-primary m-0">
          The primary member has reviewed and agreed to the subscription service's{' '}
          <span className="font-medium">Terms & Conditions</span>{' '}
          including the automatic renewal and cancellation policy.
        </p>
      </label>

      {paperlessEnabled && (
        <div className="flex items-start gap-2">
          <span className="shrink-0 size-4 text-text-success flex items-center justify-center">
            <CheckCircleIcon />
          </span>
          <p className="font-display font-normal text-xs leading-4 tracking-[-0.24px] text-text-success m-0">
            Paperless communication has been enabled for your subscription.
          </p>
        </div>
      )}
    </div>

    {/* ── CTA buttons ── */}
    <div className="flex flex-col gap-4 w-full shrink-0">
      <Button variant="primary" size="lg" className="w-full justify-center" onClick={onStartSubscription}>
        Start Subscription
      </Button>
      <Button variant="outline-gray" size="lg" className="w-full justify-center" onClick={onSaveDraft}>
        Save Draft
      </Button>
    </div>
  </div>
)

CheckoutSummary.displayName = 'CheckoutSummary'
