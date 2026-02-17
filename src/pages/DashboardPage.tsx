import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

const radarData = [
  { skill: 'DSA', score: 75 },
  { skill: 'System Design', score: 60 },
  { skill: 'Communication', score: 80 },
  { skill: 'Resume', score: 85 },
  { skill: 'Aptitude', score: 70 },
]

const weeklyActivity = [
  { label: 'Mon', active: true },
  { label: 'Tue', active: true },
  { label: 'Wed', active: false },
  { label: 'Thu', active: true },
  { label: 'Fri', active: true },
  { label: 'Sat', active: false },
  { label: 'Sun', active: false },
]

function ReadinessGauge({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, displayValue))
  const strokeDashoffset =
    circumference - (clamped / 100) * circumference

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayValue(value)
    }, 50)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className="flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <g transform="translate(90,90)">
          <circle
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="12"
          />
          <circle
            r={radius}
            fill="none"
            stroke="hsl(245, 58%, 51%)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 700ms ease-out' }}
            transform="rotate(-90)"
          />
        </g>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="32"
          fontWeight="600"
          fill="#f9fafb"
        >
          {clamped}
        </text>
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          fontSize="12"
          fill="#9ca3af"
        >
          Readiness Score
        </text>
      </svg>
    </div>
  )
}

export function DashboardPage() {
  const practiceCompleted = 3
  const practiceTotal = 10
  const weeklySolved = 12
  const weeklyTarget = 20

  const practicePercent =
    practiceTotal > 0 ? (practiceCompleted / practiceTotal) * 100 : 0
  const weeklyPercent = (weeklySolved / weeklyTarget) * 100
  const isPracticeComplete = practiceCompleted >= practiceTotal

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-slate-50">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-300 max-w-xl">
          A calm overview of where you stand today, and what deserves your next
          block of focus.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <ReadinessGauge value={72} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1f2933" />
                <PolarAngleAxis
                  dataKey="skill"
                  stroke="#9ca3af"
                  tick={{ fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  stroke="#4b5563"
                  tick={false}
                />
                <Radar
                  dataKey="score"
                  stroke="hsl(245, 58%, 51%)"
                  fill="hsl(245, 58%, 51%)"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Continue Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isPracticeComplete ? (
              <>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Practice status
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">
                    All topics complete!
                  </p>
                  <p className="mt-1 text-xs text-slate-400 max-w-sm">
                    Use this time to review mistakes, revisit weaker areas, or
                    switch to timed assessments.
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800 transition-colors"
                >
                  Review completed topics
                </button>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Last topic
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">
                    Dynamic Programming
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>
                      {practiceCompleted}/{practiceTotal} sets completed
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${practicePercent}%` }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Continue
                </button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Problems Solved
              </p>
              <p className="mt-1 text-sm text-slate-50">
                {weeklySolved}/{weeklyTarget} this week
              </p>
              <div className="mt-2 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${weeklyPercent}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              {weeklyActivity.map((day) => (
                <div
                  key={day.label}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={
                      'h-6 w-6 rounded-full border text-[10px] flex items-center justify-center ' +
                      (day.active
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-slate-700 text-slate-500')
                    }
                  >
                    {day.label[0]}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {day.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-slate-800 text-sm">
              <li className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-slate-50">DSA Mock Test</p>
                  <p className="text-xs text-slate-400">
                    Tomorrow · 10:00 AM
                  </p>
                </div>
              </li>
              <li className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-slate-50">
                    System Design Review
                  </p>
                  <p className="text-xs text-slate-400">Wed · 2:00 PM</p>
                </div>
              </li>
              <li className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-slate-50">
                    HR Interview Prep
                  </p>
                  <p className="text-xs text-slate-400">Friday · 11:00 AM</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

