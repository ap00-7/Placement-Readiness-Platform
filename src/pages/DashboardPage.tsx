export function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-slate-50">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-300 max-w-xl">
          A calm overview of your placement preparation. Use this space to see where you
          stand and what to focus on next.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium text-slate-400">Practice Sets Completed</p>
          <p className="mt-3 text-2xl font-semibold text-slate-50">0</p>
          <p className="mt-1 text-xs text-slate-500">Start with core DSA topics.</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium text-slate-400">Mock Interviews</p>
          <p className="mt-3 text-2xl font-semibold text-slate-50">0</p>
          <p className="mt-1 text-xs text-slate-500">Schedule mocks once basics feel solid.</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium text-slate-400">Readiness Score</p>
          <p className="mt-3 text-2xl font-semibold text-slate-50">–</p>
          <p className="mt-1 text-xs text-slate-500">Will appear once you complete assessments.</p>
        </div>
      </section>
    </div>
  )
}

