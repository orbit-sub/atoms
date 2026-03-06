import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckoutSummary } from './CheckoutSummary'
import type { SubscriberEntry } from './CheckoutSummary'

// ── Fixture data ──────────────────────────────────────────────────────────

const primaryMember: SubscriberEntry = {
  name: 'Smith Jones',
  role: 'Primary Member',
  planName: 'Espire Adult',
  annualCost: '$292.42',
  planCredit: '-$72.42',
  isPrimary: true,
}

const dependent1: SubscriberEntry = {
  name: 'Emily Jones',
  role: 'Dependent 1',
  planName: 'Espire Child',
  annualCost: '$199.00',
  planCredit: '-$59.00',
}

const dependent2: SubscriberEntry = {
  name: 'Mark Jones',
  role: 'Dependent 2',
  planName: 'Espire Child',
  annualCost: '$199.00',
  planCredit: '-$59.00',
}

// ── Meta ──────────────────────────────────────────────────────────────────

const meta = {
  title: 'Atoms/CheckoutSummary',
  component: CheckoutSummary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**CheckoutSummary** — Subscribili Design System v1.2 (node 6186:2821)

A checkout sidebar card that summarises plan details, per-subscriber pricing, totals, T&C consent, and CTA actions.

| Prop | Type | Default |
|---|---|---|
| \`providerLocation\` | \`string\` | \`'1st Family Dental of Fox Valley'\` |
| \`billingFrequency\` | \`string\` | \`'Annual Billed Monthly'\` |
| \`subscriptionPeriod\` | \`string\` | \`'March 18, 2025 - March 18, 2026'\` |
| \`subscribers\` | \`SubscriberEntry[]\` | \`[]\` |
| \`subtotal\` | \`string\` | \`'$0.00'\` |
| \`processingFees\` | \`string\` | \`'$0.00'\` |
| \`amountDue\` | \`string\` | \`'$0.00'\` |
| \`onPromoCode\` | \`() => void\` | — |
| \`termsAccepted\` | \`boolean\` | \`false\` |
| \`onTermsChange\` | \`(checked: boolean) => void\` | — |
| \`paperlessEnabled\` | \`boolean\` | \`false\` |
| \`onStartSubscription\` | \`() => void\` | — |
| \`onSaveDraft\` | \`() => void\` | — |
        `.trim(),
      },
    },
  },
  argTypes: {
    providerLocation:   { control: 'text', description: "Provider's office name" },
    billingFrequency:   { control: 'text', description: 'Billing frequency description' },
    subscriptionPeriod: { control: 'text', description: 'Subscription date range' },
    subtotal:           { control: 'text', description: 'Formatted subtotal string' },
    processingFees:     { control: 'text', description: 'Formatted processing fees string' },
    amountDue:          { control: 'text', description: 'Formatted amount due string' },
    termsAccepted:      { control: 'boolean', description: 'T&C checkbox state', table: { defaultValue: { summary: 'false' } } },
    paperlessEnabled:   { control: 'boolean', description: 'Show paperless confirmation notice', table: { defaultValue: { summary: 'false' } } },
    subscribers:        { control: false, description: 'Array of SubscriberEntry objects' },
    onPromoCode:        { action: 'promoCode' },
    onTermsChange:      { action: 'termsChange' },
    onStartSubscription:{ action: 'startSubscription' },
    onSaveDraft:        { action: 'saveDraft' },
  },
  args: {
    providerLocation:   '1st Family Dental of Fox Valley',
    billingFrequency:   'Annual Billed Monthly',
    subscriptionPeriod: 'March 18, 2025 - March 18, 2026',
    subscribers:        [primaryMember, dependent1, dependent2],
    subtotal:           '$500.00',
    processingFees:     '$8.56',
    amountDue:          '$508.56',
    termsAccepted:      false,
    paperlessEnabled:   false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, fontFamily: 'inherit' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckoutSummary>

export default meta
type Story = StoryObj<typeof meta>


// ══════════════════════════════════════════════════════
// PLAYGROUND
// ══════════════════════════════════════════════════════

/** Interactive story — use the controls panel to explore combinations. */
export const Playground: Story = {}


// ══════════════════════════════════════════════════════
// SUBSCRIBER CONFIGURATIONS
// ══════════════════════════════════════════════════════

/** Single primary member only — minimal checkout. */
export const SingleMember: Story = {
  name: 'Subscribers — Single Member',
  args: {
    subscribers:   [primaryMember],
    subtotal:      '$292.42',
    processingFees:'$4.22',
    amountDue:     '$296.64',
  },
}

/** Primary member with two dependents — matches Figma exactly. */
export const FamilyPlan: Story = {
  name: 'Subscribers — Family (3 members)',
  args: {
    subscribers: [primaryMember, dependent1, dependent2],
  },
}


// ══════════════════════════════════════════════════════
// PROMO CODE
// ══════════════════════════════════════════════════════

/** Promo code link is visible when `onPromoCode` handler is provided. */
export const WithPromoCode: Story = {
  name: 'Promo Code — Link visible',
  args: {
    subscribers: [primaryMember],
    subtotal: '$292.42',
    processingFees: '$4.22',
    amountDue: '$296.64',
  },
}


// ══════════════════════════════════════════════════════
// TERMS & CONDITIONS
// ══════════════════════════════════════════════════════

/** T&C checkbox is unchecked by default. */
export const TermsUnchecked: Story = {
  name: 'T&C — Unchecked',
  args: { termsAccepted: false },
}

/** T&C checkbox in the accepted state. */
export const TermsAccepted: Story = {
  name: 'T&C — Accepted',
  args: { termsAccepted: true },
}

/** Shows the paperless communication confirmation notice. */
export const WithPaperless: Story = {
  name: 'T&C — Paperless enabled',
  args: { paperlessEnabled: true },
}


// ══════════════════════════════════════════════════════
// COMPLETE (FIGMA EXACT)
// ══════════════════════════════════════════════════════

/** Pixel-faithful reproduction of the Figma frame (node 6186:2821). */
export const FigmaExact: Story = {
  name: 'Complete — Figma exact',
  args: {
    subscribers:        [primaryMember, dependent1, dependent2],
    subtotal:           '$500.00',
    processingFees:     '$8.56',
    amountDue:          '$508.56',
    termsAccepted:      false,
    paperlessEnabled:   true,
  },
}

/** Fully filled-out state: T&C accepted + paperless + promo link visible. */
export const FullyComplete: Story = {
  name: 'Complete — All features',
  args: {
    subscribers:        [primaryMember, dependent1, dependent2],
    subtotal:           '$500.00',
    processingFees:     '$8.56',
    amountDue:          '$508.56',
    termsAccepted:      true,
    paperlessEnabled:   true,
  },
}
