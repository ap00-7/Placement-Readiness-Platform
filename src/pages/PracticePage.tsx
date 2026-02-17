import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
  addHistoryEntry,
  buildQuestions,
  buildRoundChecklist,
  buildSevenDayPlan,
  computeReadinessScore,
  extractSkills,
  type AnalysisEntry,
} from '../lib/analysis'

export function PracticePage() {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jdText, setJdText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  function handleAnalyze(e: FormEvent) {
    e.preventDefault()
    if (!jdText.trim()) {
      setError('Please paste a job description to analyze.')
      return
    }
    setError(null)

    const extractedSkills = extractSkills(jdText)
    const checklist = buildRoundChecklist(extractedSkills)
    const plan = buildSevenDayPlan(extractedSkills)
    const questions = buildQuestions(extractedSkills)
    const readinessScore = computeReadinessScore({
      extractedSkills,
      company,
      role,
      jdText,
    })

    const entry: AnalysisEntry = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      company: company.trim(),
      role: role.trim(),
      jdText,
      extractedSkills,
      checklist,
      plan,
      questions,
      readinessScore,
    }

    addHistoryEntry(entry)
    navigate(`/results?id=${entry.id}`)
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-slate-50">
          JD Analysis & Practice Focus
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-xl">
          Paste a job description to get a calm, structured view of what to
          prepare—no scraping, no noise.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Analyze a Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Company (optional)
                </label>
                <input
                  className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-primary"
                  placeholder="e.g. Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Role (optional)
                </label>
                <input
                  className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-primary"
                  placeholder="e.g. SDE Intern"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                Job description
              </label>
              <textarea
                className="min-h-[180px] w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-primary"
                placeholder="Paste the JD here. No scraping will be performed—analysis runs locally."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs text-red-400" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-medium text-white hover:bg-primary/90 transition-colors"
            >
              Analyze
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


