import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

// ── Icons (inline SVG — no extra dependencies) ────────────────────────────

const PlusIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 10h12M10 4l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TrashIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M3 5h14M8 5V3h4v2M6 5l1 11h6l1-11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// ── Meta ──────────────────────────────────────────────────────────────────

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Button** — Subscribili Design System v1.2 (node 567:5542)

Supports 6 visual hierarchies, 4 sizes, destructive palette, disabled state, and icon-only mode.

| Prop | Type | Default |
|---|---|---|
| \`variant\` | \`primary \\| secondary \\| outline-gray \\| outline \\| tertiary \\| link\` | \`primary\` |
| \`size\` | \`sm \\| md \\| lg \\| xl\` | \`md\` |
| \`destructive\` | \`boolean\` | \`false\` |
| \`disabled\` | \`boolean\` | \`false\` |
| \`iconOnly\` | \`boolean\` | \`false\` |
| \`leadIcon\` | \`ReactNode\` | — |
| \`trailIcon\` | \`ReactNode\` | — |

> **Note on \`secondary\` variant:** Figma defines "Secondary" hierarchy exclusively in the destructive context.
> Use \`variant="secondary"\` for a light-red, outlined destructive action.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline-gray', 'outline', 'tertiary', 'link'],
      description: 'Visual hierarchy (maps to Figma "Hierarchy" property)',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size (maps to Figma "Size" property). Heights: sm=32 md=40 lg=48 xl=56',
      table: { defaultValue: { summary: 'md' } },
    },
    destructive: {
      control: 'boolean',
      description: 'Red palette. Affects primary + tertiary. secondary is always destructive.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (Figma State=Disable → opacity 0.4)',
      table: { defaultValue: { summary: 'false' } },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Square icon-only button. Pass icon via leadIcon. Requires aria-label.',
      table: { defaultValue: { summary: 'false' } },
    },
    asChild: {
      control: 'boolean',
      description: 'Renders the button as its child element (Radix Slot pattern)',
      table: { defaultValue: { summary: 'false' } },
    },
    leadIcon: { control: false },
    trailIcon: { control: false },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Get Started',
    variant: 'primary',
    size: 'md',
    destructive: false,
    disabled: false,
    iconOnly: false,
  },
} satisfies Meta<typeof Button>

// `satisfies` is on the const declaration above — Storybook's indexer requires
// `export default <identifier>` (not `export default <expr> satisfies <type>`).
export default meta
type Story = StoryObj<typeof meta>


// ══════════════════════════════════════════════════════
// PLAYGROUND
// ══════════════════════════════════════════════════════

/** Interactive story — use the controls panel to explore all combinations. */
export const Playground: Story = {}


// ══════════════════════════════════════════════════════
// HIERARCHY
// ══════════════════════════════════════════════════════

/** Sky gradient background. The primary call-to-action. */
export const Primary: Story = {
  args: { variant: 'primary' },
}

/** White background, 1px gray-300 border. Pairs with Primary for secondary actions. */
export const OutlineGray: Story = {
  name: 'Secondary — Outline Gray',
  args: { variant: 'outline-gray' },
}

/** White background, 1px brand-color border. */
export const Outline: Story = {
  name: 'Secondary — Outline',
  args: { variant: 'outline' },
}

/** No background, no border. Lowest visual weight. */
export const Tertiary: Story = {
  args: { variant: 'tertiary' },
}

/** Text-only, brand color. No fixed min-width. */
export const Link: Story = {
  args: { variant: 'link', children: 'Learn more' },
}


// ══════════════════════════════════════════════════════
// SIZES
// ══════════════════════════════════════════════════════

export const SizeSM: Story = {
  name: 'Size — sm (32px)',
  args: { size: 'sm' },
}

export const SizeMD: Story = {
  name: 'Size — md (40px)',
  args: { size: 'md' },
}

export const SizeLG: Story = {
  name: 'Size — lg (48px)',
  args: { size: 'lg' },
}

export const SizeXL: Story = {
  name: 'Size — xl (56px)',
  args: { size: 'xl' },
}


// ══════════════════════════════════════════════════════
// DESTRUCTIVE
// ══════════════════════════════════════════════════════

/** Red solid background. Use for irreversible, high-impact actions. */
export const PrimaryDestructive: Story = {
  name: 'Destructive — Primary',
  args: { variant: 'primary', destructive: true, children: 'Delete Account' },
}

/**
 * Figma "Secondary" hierarchy — only defined in destructive context.
 * Light-red background, red border, red text. Use for a softer destructive confirmation.
 */
export const SecondaryDestructive: Story = {
  name: 'Destructive — Secondary',
  args: { variant: 'secondary', children: 'Remove Item' },
}

/** Ghost button with red text. Least prominent destructive action. */
export const TertiaryDestructive: Story = {
  name: 'Destructive — Tertiary',
  args: { variant: 'tertiary', destructive: true, children: 'Cancel' },
}


// ══════════════════════════════════════════════════════
// DISABLED
// ══════════════════════════════════════════════════════

export const PrimaryDisabled: Story = {
  name: 'Disabled — Primary',
  args: { variant: 'primary', disabled: true },
}

export const OutlineGrayDisabled: Story = {
  name: 'Disabled — Outline Gray',
  args: { variant: 'outline-gray', disabled: true },
}

export const TertiaryDisabled: Story = {
  name: 'Disabled — Tertiary',
  args: { variant: 'tertiary', disabled: true },
}


// ══════════════════════════════════════════════════════
// ICONS
// ══════════════════════════════════════════════════════

export const WithLeadIcon: Story = {
  name: 'Icons — Lead icon',
  args: { leadIcon: <PlusIcon /> },
}

export const WithTrailIcon: Story = {
  name: 'Icons — Trail icon',
  args: { trailIcon: <ArrowRightIcon />, children: 'Next step' },
}

export const WithBothIcons: Story = {
  name: 'Icons — Lead + Trail',
  args: { leadIcon: <PlusIcon />, trailIcon: <ArrowRightIcon /> },
}


// ══════════════════════════════════════════════════════
// ICON-ONLY
// ══════════════════════════════════════════════════════

export const IconOnlyPrimary: Story = {
  name: 'Icon Only — Primary md',
  args: {
    iconOnly: true,
    leadIcon: <PlusIcon />,
    'aria-label': 'Add item',
  },
}

export const IconOnlyOutlineGray: Story = {
  name: 'Icon Only — Outline Gray',
  args: {
    variant: 'outline-gray',
    iconOnly: true,
    leadIcon: <PlusIcon />,
    'aria-label': 'Add item',
  },
}

export const IconOnlyDestructive: Story = {
  name: 'Icon Only — Destructive',
  args: {
    variant: 'primary',
    destructive: true,
    iconOnly: true,
    leadIcon: <TrashIcon />,
    'aria-label': 'Delete item',
  },
}

export const IconOnlyAllSizes: Story = {
  name: 'Icon Only — All sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Button key={size} size={size} iconOnly leadIcon={<PlusIcon />} aria-label={`Add (${size})`} />
      ))}
    </div>
  ),
}


// ══════════════════════════════════════════════════════
// OVERVIEW GRIDS
// ══════════════════════════════════════════════════════

const cellStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#6b7280',
  fontFamily: 'monospace',
  minWidth: '120px',
}

/** All variant × size combinations at a glance. */
export const AllVariants: Story = {
  name: 'Overview — All Variants',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={rowStyle}>
      {(
        [
          { variant: 'primary',     label: 'primary'     },
          { variant: 'outline-gray', label: 'outline-gray' },
          { variant: 'outline',     label: 'outline'     },
          { variant: 'tertiary',    label: 'tertiary'    },
          { variant: 'link',        label: 'link'        },
        ] as const
      ).map(({ variant, label }) => (
        <div key={variant} style={cellStyle}>
          <span style={labelStyle}>{label}</span>
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Button key={size} variant={variant} size={size}>
              Button
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

/** All destructive variants side by side. */
export const AllDestructive: Story = {
  name: 'Overview — Destructive',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={rowStyle}>
      <div style={cellStyle}>
        <span style={labelStyle}>primary</span>
        <Button variant="primary" destructive>Delete</Button>
        <Button variant="primary" destructive disabled>Delete</Button>
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>secondary</span>
        <Button variant="secondary">Remove</Button>
        <Button variant="secondary" disabled>Remove</Button>
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>tertiary</span>
        <Button variant="tertiary" destructive>Cancel</Button>
        <Button variant="tertiary" destructive disabled>Cancel</Button>
      </div>
    </div>
  ),
}

/** All states: Default / Hover (native) / Disabled for each key variant. */
export const AllSizes: Story = {
  name: 'Overview — All Sizes',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}
