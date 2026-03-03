import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'

// ── Meta ──────────────────────────────────────────────────────────────────

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Alert** — Subscribili Design System v1.2 (node 567:5383)

Inline banner with a 2px left-border accent. Supports 6 semantic variants, an optional title, and a dismissible close button.

| Prop | Type | Default |
|---|---|---|
| \`variant\` | \`info \\| warning \\| error \\| success \\| discovery \\| neutral\` | \`info\` |
| \`description\` | \`string\` | required |
| \`title\` | \`string\` | — |
| \`dismissible\` | \`boolean\` | \`false\` |
| \`onClose\` | \`() => void\` | — |

> **Discovery** maps to Figma's "Discovery" state — a purple/brand palette not in the original spec but present in the Figma component set.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success', 'discovery', 'neutral'],
      description: 'Visual variant (maps to Figma "state" property)',
      table: { defaultValue: { summary: 'info' } },
    },
    title: {
      control: 'text',
      description: 'Optional bold heading above the description',
    },
    description: {
      control: 'text',
      description: 'Main alert message text',
    },
    dismissible: {
      control: 'boolean',
      description: 'Shows the × close button (maps to Figma `closeIcon` property)',
      table: { defaultValue: { summary: 'false' } },
    },
    onClose: { action: 'closed' },
  },
  args: {
    description: 'Change a few things up and try submitting again.',
    variant: 'info',
    dismissible: false,
  },
} satisfies Meta<typeof Alert>

// `satisfies` is on the const declaration above — Storybook's indexer requires
// `export default <identifier>` (not `export default <expr> satisfies <type>`).
export default meta
type Story = StoryObj<typeof meta>


// ══════════════════════════════════════════════════════
// PLAYGROUND
// ══════════════════════════════════════════════════════

/** Use the controls panel to explore all combinations. */
export const Playground: Story = {}


// ══════════════════════════════════════════════════════
// VARIANTS — matching Figma state property
// ══════════════════════════════════════════════════════

export const Info: Story = {
  args: { variant: 'info' },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    description: 'Your session will expire in 5 minutes. Please save your work.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    description: 'Something went wrong. Please try again or contact support.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    description: 'Your changes have been saved successfully.',
  },
}

/** Figma "Discovery" state — brand/purple palette. */
export const Discovery: Story = {
  name: 'Discovery (Brand / Purple)',
  args: {
    variant: 'discovery',
    description: 'New feature available! Try the updated dashboard experience.',
  },
}

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    description: 'This action cannot be undone. Review your changes before continuing.',
  },
}


// ══════════════════════════════════════════════════════
// DISMISSIBLE — closeIcon=true from Figma
// ══════════════════════════════════════════════════════

export const InfoDismissible: Story = {
  name: 'Dismissible — Info',
  args: { variant: 'info', dismissible: true },
}

export const WarningDismissible: Story = {
  name: 'Dismissible — Warning',
  args: {
    variant: 'warning',
    dismissible: true,
    description: 'Your session will expire in 5 minutes. Please save your work.',
  },
}

export const ErrorDismissible: Story = {
  name: 'Dismissible — Error',
  args: {
    variant: 'error',
    dismissible: true,
    description: 'Something went wrong. Please try again or contact support.',
  },
}

export const SuccessDismissible: Story = {
  name: 'Dismissible — Success',
  args: {
    variant: 'success',
    dismissible: true,
    description: 'Your changes have been saved successfully.',
  },
}

export const DiscoveryDismissible: Story = {
  name: 'Dismissible — Discovery',
  args: {
    variant: 'discovery',
    dismissible: true,
    description: 'New feature available! Try the updated dashboard experience.',
  },
}

export const NeutralDismissible: Story = {
  name: 'Dismissible — Neutral',
  args: {
    variant: 'neutral',
    dismissible: true,
    description: 'This action cannot be undone. Review your changes before continuing.',
  },
}


// ══════════════════════════════════════════════════════
// WITH TITLE
// ══════════════════════════════════════════════════════

export const WithTitle: Story = {
  name: 'With Title — Info',
  args: {
    variant: 'info',
    title: 'Heads up!',
    description: 'Change a few things up and try submitting again.',
  },
}

export const WithTitleDismissible: Story = {
  name: 'With Title — Dismissible Error',
  args: {
    variant: 'error',
    title: 'Submission failed',
    description: 'There were 3 errors in your form. Please correct them before continuing.',
    dismissible: true,
  },
}


// ══════════════════════════════════════════════════════
// OVERVIEW GRIDS
// ══════════════════════════════════════════════════════

const VARIANTS = [
  { variant: 'info',      text: 'Info Alert! Change a few things up and try submitting again.' },
  { variant: 'warning',   text: 'Warning Alert! Your session will expire in 5 minutes.' },
  { variant: 'error',     text: 'Error Alert! Something went wrong. Please try again.' },
  { variant: 'success',   text: 'Success Alert! Your changes have been saved successfully.' },
  { variant: 'discovery', text: 'Discovery Alert! New feature available in your account.' },
  { variant: 'neutral',   text: 'Neutral Alert! This action cannot be undone.' },
] as const

/** All 6 variants without close button — matches the Figma frame exactly. */
export const AllVariants: Story = {
  name: 'Overview — All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {VARIANTS.map(({ variant, text }) => (
        <Alert key={variant} variant={variant} description={text} />
      ))}
    </div>
  ),
}

/** All 6 variants with the close button visible — matches Figma's dismissible state. */
export const AllVariantsDismissible: Story = {
  name: 'Overview — All Variants (Dismissible)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {VARIANTS.map(({ variant, text }) => (
        <Alert
          key={variant}
          variant={variant}
          description={text}
          dismissible
          onClose={() => console.log(`closed: ${variant}`)}
        />
      ))}
    </div>
  ),
}

/** Shows the optional title prop across variants. */
export const AllVariantsWithTitle: Story = {
  name: 'Overview — All Variants (With Title)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {VARIANTS.map(({ variant, text }) => (
        <Alert
          key={variant}
          variant={variant}
          title={variant.charAt(0).toUpperCase() + variant.slice(1)}
          description={text}
          dismissible
        />
      ))}
    </div>
  ),
}
