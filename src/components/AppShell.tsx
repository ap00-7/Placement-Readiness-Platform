import { Outlet, NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Code2,
  ClipboardList,
  BookOpen,
  UserCircle2,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/practice', label: 'Practice', icon: Code2 },
  { to: '/assessments', label: 'Assessments', icon: ClipboardList },
  { to: '/resources', label: 'Resources', icon: BookOpen },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
]

export function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/70">
        <div className="px-6 py-6 border-b border-slate-800">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Placement Readiness
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-slate-50',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Placement Prep
              </div>
              <h1 className="text-lg font-semibold text-slate-50">
                Placement Readiness Platform
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-medium text-slate-300">
                U
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

