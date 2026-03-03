import { Button, Alert } from 'atoms'
import type { ButtonVariant, ButtonSize, AlertVariant } from 'atoms'

const VARIANTS: ButtonVariant[] = [
  'primary', 'outline-gray', 'outline', 'tertiary', 'link', 'secondary',
]
const SIZES: ButtonSize[] = ['sm', 'md', 'lg', 'xl']

const ALERT_VARIANTS: AlertVariant[] = [
  'info', 'warning', 'error', 'success', 'discovery', 'neutral',
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-base font-semibold mb-1 font-display">{title}</h2>
      <div className="mb-5 border-b border-gray-100" />
      {children}
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3 font-display">
      {children}
    </p>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen p-10 max-w-4xl mx-auto font-display">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold mb-1">Atoms</h1>
        <p className="text-sm text-gray-500">
          Design system — React + Radix UI + Tailwind v4
        </p>
      </div>

      {/* ── Buttons ─────────────────────────────────────────────────── */}
      <Section title="Button">
        <div className="mb-6">
          <Label>Variants</Label>
          <div className="flex flex-wrap gap-3">
            {VARIANTS.map((v) => (
              <Button key={v} variant={v}>{v}</Button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Label>Destructive</Label>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" destructive>Primary</Button>
            <Button variant="tertiary" destructive>Tertiary</Button>
          </div>
        </div>

        <div className="mb-6">
          <Label>Sizes</Label>
          <div className="flex flex-wrap items-center gap-3">
            {SIZES.map((s) => (
              <Button key={s} size={s}>Button {s}</Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Disabled</Label>
          <div className="flex flex-wrap gap-3">
            <Button disabled>Primary</Button>
            <Button variant="outline-gray" disabled>Outline gray</Button>
            <Button variant="tertiary" disabled>Tertiary</Button>
          </div>
        </div>
      </Section>

      {/* ── Alerts ──────────────────────────────────────────────────── */}
      <Section title="Alert">
        <div className="mb-6">
          <Label>Variants</Label>
          <div className="flex flex-col gap-3 max-w-2xl">
            {ALERT_VARIANTS.map((v) => (
              <Alert key={v} variant={v} description={`This is a ${v} alert.`} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Label>With title</Label>
          <div className="flex flex-col gap-3 max-w-2xl">
            <Alert
              variant="info"
              title="Informational"
              description="Alerts can include an optional title above the description."
            />
            <Alert
              variant="warning"
              title="Action required"
              description="Review the changes before continuing."
            />
          </div>
        </div>

        <div>
          <Label>Dismissible</Label>
          <div className="flex flex-col gap-3 max-w-2xl">
            <Alert
              variant="success"
              title="Upload complete"
              description="Your file has been uploaded successfully."
              dismissible
            />
          </div>
        </div>
      </Section>
    </main>
  )
}
