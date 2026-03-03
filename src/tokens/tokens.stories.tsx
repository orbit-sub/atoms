import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

// ── Table primitives ───────────────────────────────────────────────────────────

const TokenCell = ({ name }: { name: string }) => (
  <td style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', verticalAlign: 'middle' }}>
    <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>
      {name}
    </code>
  </td>
)

const ValueCell = ({ children }: { children: ReactNode }) => (
  <td style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', verticalAlign: 'middle', fontSize: 12, color: '#6b7280', fontFamily: 'monospace' }}>
    {children}
  </td>
)

const PreviewCell = ({ children }: { children: ReactNode }) => (
  <td style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', verticalAlign: 'middle' }}>
    {children}
  </td>
)

const TableHead = ({ cols }: { cols: string[] }) => (
  <thead>
    <tr>
      {cols.map(col => (
        <th
          key={col}
          style={{
            textAlign: 'left',
            padding: '6px 12px',
            borderBottom: '2px solid #e5e7eb',
            color: '#6b7280',
            fontWeight: 600,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
)

const SectionHeading = ({ title, description }: { title: string; description?: string }) => (
  <div style={{ marginBottom: 12 }}>
    <h3 style={{ margin: 0, fontFamily: 'system-ui, sans-serif', fontSize: 14, fontWeight: 600, color: '#111827' }}>
      {title}
    </h3>
    {description && (
      <p style={{ margin: '4px 0 0', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#6b7280' }}>
        {description}
      </p>
    )}
  </div>
)

// ── Color helpers ──────────────────────────────────────────────────────────────

const ColorRow = ({ token, description }: { token: string; description: string }) => (
  <tr>
    <TokenCell name={token} />
    <PreviewCell>
      <div
        style={{
          width: 36,
          height: 36,
          background: `var(${token})`,
          borderRadius: 6,
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      />
    </PreviewCell>
    <ValueCell>{description}</ValueCell>
  </tr>
)

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Tokens/Overview',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Colors ─────────────────────────────────────────────────────────────────────

export const Colors: Story = {
  name: 'Colors',
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 860 }}>
      <h2 style={{ marginBottom: 32, fontSize: 20, fontWeight: 700, color: '#111827' }}>Color Tokens</h2>

      {/* ── Brand / Gradient ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading
          title="Brand / Gradient"
          description="Sky-500 → sky-300 at 79.17°. Source of truth for the primary button gradient."
        />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Preview', 'Description']} />
          <tbody>
            <tr>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', verticalAlign: 'middle' }}>
                <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>
                  gradient (composite)
                </code>
              </td>
              <PreviewCell>
                <div
                  style={{
                    width: 120,
                    height: 36,
                    background: 'linear-gradient(var(--color-gradient-angle), var(--color-gradient-start) 12.66%, var(--color-gradient-end) 102.86%)',
                    borderRadius: 6,
                  }}
                />
              </PreviewCell>
              <ValueCell>Primary button gradient (live)</ValueCell>
            </tr>
            {[
              { token: '--color-gradient-start',       description: 'sky-500 — gradient start / brand primary' },
              { token: '--color-gradient-end',         description: 'sky-300 — gradient end' },
              { token: '--color-gradient-start-hover', description: 'sky-600 — gradient start on hover' },
              { token: '--color-gradient-end-hover',   description: 'sky-500 — gradient end on hover' },
            ].map(r => <ColorRow key={r.token} {...r} />)}
          </tbody>
        </table>
      </div>

      {/* ── Destructive ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Destructive" description="Red palette for destructive actions (primary, secondary, tertiary variants)." />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Preview', 'Description']} />
          <tbody>
            {[
              { token: '--color-btn-destructive-bg',          description: 'red-500 — solid destructive background' },
              { token: '--color-btn-destructive-bg-hover',    description: 'red-600 — destructive hover' },
              { token: '--color-btn-secondary-dest-bg',       description: 'red-50 tint — secondary destructive bg' },
              { token: '--color-btn-secondary-dest-bg-hover', description: 'red-100 — secondary destructive hover' },
              { token: '--color-btn-secondary-dest-border',   description: 'red-300 — secondary destructive border' },
              { token: '--color-btn-secondary-dest-text',     description: 'red-600 — secondary destructive text' },
              { token: '--color-btn-tertiary-dest-text',      description: 'red-500 — tertiary destructive text' },
              { token: '--color-btn-tertiary-dest-bg-hover',  description: 'red-50 — tertiary destructive hover bg' },
            ].map(r => <ColorRow key={r.token} {...r} />)}
          </tbody>
        </table>
      </div>

      {/* ── Focus rings ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Focus Rings" description="Used for keyboard focus outlines on buttons and interactive elements." />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Preview', 'Description']} />
          <tbody>
            {[
              { token: '--color-focus-ring',             description: 'sky-500 — default focus ring (ring-ring)' },
              { token: '--color-focus-ring-destructive', description: 'red-500 — destructive focus ring (ring-ring-destructive)' },
            ].map(r => <ColorRow key={r.token} {...r} />)}
          </tbody>
        </table>
      </div>

      {/* ── Alert colors ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Alert Variants" description="Background / border / text for each semantic alert state. Each triplet maps to a Tailwind utility via @theme inline." />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Preview', 'Description']} />
          <tbody>
            {[
              { token: '--color-alert-info-bg',          description: 'Info — background (sky-50)' },
              { token: '--color-alert-info-border',      description: 'Info — border (sky-500)' },
              { token: '--color-alert-info-text',        description: 'Info — text (sky-600)' },
              { token: '--color-alert-warning-bg',       description: 'Warning — background (amber-50)' },
              { token: '--color-alert-warning-border',   description: 'Warning — border (amber-400)' },
              { token: '--color-alert-warning-text',     description: 'Warning — text (amber-700)' },
              { token: '--color-alert-error-bg',         description: 'Error — background (red-50)' },
              { token: '--color-alert-error-border',     description: 'Error — border (red-500)' },
              { token: '--color-alert-error-text',       description: 'Error — text (red-500)' },
              { token: '--color-alert-success-bg',       description: 'Success — background (green-50)' },
              { token: '--color-alert-success-border',   description: 'Success — border (green-500)' },
              { token: '--color-alert-success-text',     description: 'Success — text (green-700)' },
              { token: '--color-alert-discovery-bg',     description: 'Discovery — background (purple-50)' },
              { token: '--color-alert-discovery-border', description: 'Discovery — border (purple-600)' },
              { token: '--color-alert-discovery-text',   description: 'Discovery — text (purple-700)' },
              { token: '--color-alert-neutral-bg',       description: 'Neutral — background (zinc-100)' },
              { token: '--color-alert-neutral-border',   description: 'Neutral — border (zinc-500)' },
              { token: '--color-alert-neutral-text',     description: 'Neutral — text (zinc-600)' },
            ].map(r => <ColorRow key={r.token} {...r} />)}
          </tbody>
        </table>
      </div>

      {/* ── Legacy ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Legacy (preserved for backward compat)" />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Preview', 'Description']} />
          <tbody>
            {[
              { token: '--color-primary',       description: '#2563eb — legacy primary (pre-v1.2)' },
              { token: '--color-primary-hover', description: '#1547ce — legacy primary hover' },
            ].map(r => <ColorRow key={r.token} {...r} />)}
          </tbody>
        </table>
      </div>
    </div>
  ),
}

// ── Spacing & Radius ───────────────────────────────────────────────────────────

export const Spacing: Story = {
  name: 'Spacing & Radius',
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 700 }}>
      <h2 style={{ marginBottom: 32, fontSize: 20, fontWeight: 700, color: '#111827' }}>Spacing & Radius Tokens</h2>

      {/* ── Spacing scale ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Spacing Scale" description="8-step scale used for padding, gap, and margin. 1 unit ≈ 4px in the Tailwind scale." />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Visual', 'Value', 'Tailwind equiv.']} />
          <tbody>
            {[
              { token: '--spacing-none', value: '0px',  tw: 'p-0 / gap-0'    },
              { token: '--spacing-xxs',  value: '2px',  tw: 'py-0.5'          },
              { token: '--spacing-xs',   value: '4px',  tw: 'p-1 / gap-1'    },
              { token: '--spacing-sm',   value: '6px',  tw: '—'              },
              { token: '--spacing-md',   value: '8px',  tw: 'p-2 / gap-2'   },
              { token: '--spacing-lg',   value: '12px', tw: 'p-3 / gap-3'   },
              { token: '--spacing-xl',   value: '16px', tw: 'p-4 / gap-4'   },
              { token: '--spacing-2xl',  value: '20px', tw: 'p-5 / gap-5'   },
            ].map(({ token, value, tw }) => (
              <tr key={token}>
                <TokenCell name={token} />
                <PreviewCell>
                  <div
                    style={{
                      height: 20,
                      width: `var(${token})`,
                      background: 'rgb(14, 165, 233)',
                      borderRadius: 2,
                      minWidth: 2,
                      outline: value === '0px' ? '1px dashed #d1d5db' : undefined,
                    }}
                  />
                </PreviewCell>
                <ValueCell>{value}</ValueCell>
                <ValueCell>{tw}</ValueCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Radius ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Border Radius" description="3-step radius scale. All map to Tailwind rounded-* via @theme inline." />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Visual', 'Value', 'Usage']} />
          <tbody>
            {[
              { token: '--radius-xs', value: '4px', usage: 'Close button (ds-alert__close), small chips' },
              { token: '--radius-sm', value: '6px', usage: 'Button size=sm' },
              { token: '--radius-md', value: '8px', usage: 'Button size=md/lg/xl, cards' },
            ].map(({ token, value, usage }) => (
              <tr key={token}>
                <TokenCell name={token} />
                <PreviewCell>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: 'rgb(14, 165, 233)',
                      borderRadius: `var(${token})`,
                      opacity: 0.75,
                    }}
                  />
                </PreviewCell>
                <ValueCell>{value}</ValueCell>
                <ValueCell>{usage}</ValueCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
}

// ── Typography ─────────────────────────────────────────────────────────────────

export const Typography: Story = {
  name: 'Typography',
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 800 }}>
      <h2 style={{ marginBottom: 32, fontSize: 20, fontWeight: 700, color: '#111827' }}>Typography Tokens</h2>

      {/* ── Font family ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Font Family" />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Preview', 'Stack']} />
          <tbody>
            <tr>
              <TokenCell name="--font-family-display" />
              <PreviewCell>
                <span style={{ fontFamily: 'var(--font-family-display)', fontSize: 16 }}>
                  The quick brown fox jumps over the lazy dog.
                </span>
              </PreviewCell>
              <ValueCell>{'Inter, Inter Display, system-ui, sans-serif'}</ValueCell>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Font weights ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Font Weights" />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Preview', 'Value']} />
          <tbody>
            {[
              { token: '--font-weight-regular',  weight: 400, label: 'Regular' },
              { token: '--font-weight-semibold', weight: 600, label: 'Semibold' },
            ].map(({ token, weight, label }) => (
              <tr key={token}>
                <TokenCell name={token} />
                <PreviewCell>
                  <span style={{ fontFamily: 'var(--font-family-display)', fontWeight: weight, fontSize: 15 }}>
                    {label} — The quick brown fox
                  </span>
                </PreviewCell>
                <ValueCell>{weight}</ValueCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Button type scale ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Button Type Scale" description="Font size, line-height, and letter-spacing paired per button size." />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Size tokens', 'Preview', 'font-size / line-height / letter-spacing']} />
          <tbody>
            {[
              { sizeToken: '--font-size-btn-sm', lhToken: '--line-height-btn-sm', lsToken: '--letter-spacing-btn-sm', fontSize: 12, lineHeight: '16px', letterSpacing: '-0.12px', label: 'sm' },
              { sizeToken: '--font-size-btn-md', lhToken: '--line-height-btn-md', lsToken: '--letter-spacing-btn-md', fontSize: 14, lineHeight: '20px', letterSpacing: '-0.14px', label: 'md' },
              { sizeToken: '--font-size-btn-lg', lhToken: '--line-height-btn-lg', lsToken: '--letter-spacing-btn-lg', fontSize: 16, lineHeight: '24px', letterSpacing: '-0.16px', label: 'lg / xl' },
            ].map(({ sizeToken, fontSize, lineHeight, letterSpacing, label }) => (
              <tr key={sizeToken}>
                <TokenCell name={sizeToken} />
                <PreviewCell>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-display)',
                      fontSize,
                      lineHeight,
                      letterSpacing,
                    }}
                  >
                    Button {label.toUpperCase()} — Get Started
                  </span>
                </PreviewCell>
                <ValueCell>{`${fontSize}px / ${lineHeight} / ${letterSpacing}`}</ValueCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Body type ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Body Type" description="Used in Alert descriptions, labels, and inputs (body-sm)." />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Preview', 'font-size / line-height / letter-spacing']} />
          <tbody>
            <tr>
              <TokenCell name="--font-size-body-sm" />
              <PreviewCell>
                <span
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: 14,
                    lineHeight: '20px',
                    letterSpacing: '-0.42px',
                  }}
                >
                  body-sm — Change a few things up and try submitting again.
                </span>
              </PreviewCell>
              <ValueCell>14px / 20px / -0.42px</ValueCell>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Transition ── */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeading title="Transition" description="Shared transition applied to all button state changes." />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Token', 'Value']} />
          <tbody>
            <tr>
              <TokenCell name="--transition-btn" />
              <ValueCell>background 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease</ValueCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
}
