import { Code2, Video, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <main className="flex-1">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 lg:py-24">
          <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4">
                Placement Readiness Platform
              </p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-50">
                Ace Your Placement
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
                Practice, assess, and prepare for your dream job with a focused workspace
                built for serious placement prep—not distractions.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
                >
                  Get Started
                </button>
                <span className="text-xs text-slate-400">
                  No fluff. Just structured practice and clear progress.
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4">
                What you&apos;ll get
              </p>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  Structured practice sets aligned to placement patterns.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  Mock interviews to rehearse under realistic constraints.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  Clear progress tracking so you know when you&apos;re ready.
                </li>
              </ul>
            </div>
          </section>

          <section aria-label="Key features" className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Platform Features
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard
                icon={<Code2 className="h-5 w-5 text-primary" />}
                title="Practice Problems"
                description="Curated DSA and coding problems that mirror real placement rounds."
              />
              <FeatureCard
                icon={<Video className="h-5 w-5 text-primary" />}
                title="Mock Interviews"
                description="Simulated interview flows to rehearse answers and timing."
              />
              <FeatureCard
                icon={<BarChart3 className="h-5 w-5 text-primary" />}
                title="Track Progress"
                description="See completion, accuracy, and confidence evolve over time."
              />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 border border-slate-800 mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-300">{description}</p>
    </div>
  )
}

