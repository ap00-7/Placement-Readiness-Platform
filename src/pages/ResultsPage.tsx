import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { findAnalysisById, readHistory, type AnalysisEntry } from '../lib/analysis'

function getActiveEntry(searchParams: URLSearchParams): AnalysisEntry | null {
  const id = searchParams.get('id')
  if (id) {
    const found = findAnalysisById(id)
    if (found) return found
  }
  const history = readHistory()
  return history.length > 0 ? history[0] : null
}

export function ResultsPage() {
  const [searchParams] = useSearchParams()
  const entry = getActiveEntry(searchParams)

  if (!entry) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-50">Results</h2>
        <p className="text-sm text-slate-300 max-w-xl">
          No analysis found yet. Run an analysis from the Practice page to see
          results here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-slate-50">Results</h2>
        <p className="text-sm text-slate-300 max-w-xl">
          Snapshot generated on{' '}
          {new Date(entry.createdAt).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
          .
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-300">
              <p>
                <span className="text-slate-400">Company:</span>{' '}
                {entry.company || 'Not specified'}
              </p>
              <p>
                <span className="text-slate-400">Role:</span>{' '}
                {entry.role || 'Not specified'}
              </p>
              <p>
                <span className="text-slate-400">Readiness score:</span>{' '}
                <span className="font-semibold text-slate-50">
                  {entry.readinessScore}/100
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Skills Extracted</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {Object.entries(entry.extractedSkills).map(([category, skills]) => {
                if (!skills || skills.length === 0) return null
                return (
                  <div key={category} className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[11px] text-slate-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Round-wise Preparation Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              {Object.entries(entry.checklist).map(([round, items]) => (
                <div key={round} className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400">
                    {round}
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-300">
              {entry.plan.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Likely Interview Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-300">
              <ol className="list-decimal pl-5 space-y-1">
                {entry.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

