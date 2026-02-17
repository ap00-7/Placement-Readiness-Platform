import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { readHistory } from '../lib/analysis'

export function ResourcesPage() {
  const navigate = useNavigate()
  const history = readHistory()

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-slate-50">
          Analysis History
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-xl">
          Recent JD analyses are stored locally in your browser so you can
          revisit them without re-running the steps.
        </p>
      </section>

      {history.length === 0 ? (
        <p className="text-sm text-slate-400">
          No analyses yet. Run one from the Practice tab and it will appear
          here.
        </p>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <Card
              key={entry.id}
              className="cursor-pointer transition-colors hover:border-primary/60"
              onClick={() => navigate(`/results?id=${entry.id}`)}
            >
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <div>
                  <CardTitle>
                    {entry.company || 'Unnamed company'} ·{' '}
                    {entry.role || 'Role not specified'}
                  </CardTitle>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(entry.createdAt).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Readiness</p>
                  <p className="text-sm font-semibold text-slate-50">
                    {entry.readinessScore}/100
                  </p>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-slate-400 line-clamp-2">
                {entry.jdText.slice(0, 220)}
                {entry.jdText.length > 220 ? '…' : ''}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


