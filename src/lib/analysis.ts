export type SkillCategory =
  | 'Core CS'
  | 'Languages'
  | 'Web'
  | 'Data'
  | 'Cloud / DevOps'
  | 'Testing'
  | 'General'

export type ExtractedSkills = Record<SkillCategory, string[]>

export type AnalysisEntry = {
  id: string
  createdAt: string
  company: string
  role: string
  jdText: string
  extractedSkills: ExtractedSkills
  checklist: Record<string, string[]>
  plan: string[]
  questions: string[]
  readinessScore: number
}

const SKILL_KEYWORDS: Record<SkillCategory, string[]> = {
  'Core CS': ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database management', 'os', 'operating systems', 'networks', 'computer networks'],
  Languages: ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'go', 'c '],
  Web: ['react', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'rest', 'graphql'],
  Data: ['sql', 'mongodb', 'mongo', 'postgresql', 'mysql', 'redis'],
  'Cloud / DevOps': ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'linux'],
  Testing: ['selenium', 'cypress', 'playwright', 'junit', 'pytest'],
  General: [],
}

const LOCAL_STORAGE_KEY = 'prp_analysis_history'

export function extractSkills(jdText: string): ExtractedSkills {
  const text = jdText.toLowerCase()
  const result: ExtractedSkills = {
    'Core CS': [],
    Languages: [],
    Web: [],
    Data: [],
    'Cloud / DevOps': [],
    Testing: [],
    General: [],
  }

  let anyMatch = false

  for (const [category, keywords] of Object.entries(SKILL_KEYWORDS) as [SkillCategory, string[]][]) {
    if (category === 'General') continue
    for (const kw of keywords) {
      if (text.includes(kw)) {
        const label = normalizeSkillLabel(kw)
        if (!result[category].includes(label)) {
          result[category].push(label)
          anyMatch = true
        }
      }
    }
  }

  if (!anyMatch) {
    result.General.push('General fresher stack')
  }

  return result
}

function normalizeSkillLabel(raw: string): string {
  const normalized = raw.trim()
  if (normalized === 'nextjs' || normalized === 'next.js') return 'Next.js'
  if (normalized === 'nodejs' || normalized === 'node.js') return 'Node.js'
  if (normalized === 'mongo' || normalized === 'mongodb') return 'MongoDB'
  if (normalized === 'k8s' || normalized === 'kubernetes') return 'Kubernetes'
  if (normalized === 'ci/cd') return 'CI/CD'
  if (normalized === 'c ') return 'C'
  return normalized
    .split(' ')
    .map((p) => (p.length === 0 ? p : p[0].toUpperCase() + p.slice(1)))
    .join(' ')
}

export function computeReadinessScore(args: {
  extractedSkills: ExtractedSkills
  company: string
  role: string
  jdText: string
}): number {
  let score = 35

  const categories: SkillCategory[] = ['Core CS', 'Languages', 'Web', 'Data', 'Cloud / DevOps', 'Testing']
  let presentCategories = 0
  for (const cat of categories) {
    if (args.extractedSkills[cat] && args.extractedSkills[cat].length > 0) {
      presentCategories += 1
    }
  }
  score += Math.min(presentCategories, 6) * 5

  if (args.company.trim()) score += 10
  if (args.role.trim()) score += 10
  if (args.jdText.length > 800) score += 10

  return Math.max(0, Math.min(100, score))
}

export function buildRoundChecklist(skills: ExtractedSkills): Record<string, string[]> {
  const hasCore = skills['Core CS'].length > 0
  const hasDSA = skills['Core CS'].some((s) => s.toLowerCase().includes('dsa') || s.toLowerCase().includes('data structures'))
  const hasWeb = skills.Web.length > 0
  const hasReact = skills.Web.some((s) => s.toLowerCase().includes('react'))
  const hasSql = skills.Data.some((s) => s.toLowerCase().includes('sql') || s.toLowerCase().includes('mysql') || s.toLowerCase().includes('postgres'))

  const round1 = [
    'Revise quantitative aptitude (percentages, ratios, probability).',
    'Practice logical reasoning sets (puzzles, arrangements).',
    'Refresh basic programming syntax in your primary language.',
    'Sleep well before the test; avoid context switching just before.',
  ]

  const round2: string[] = [
    hasDSA ? 'Practice medium-level array and string problems.' : 'Practice at least 10 coding questions in your preferred language.',
    hasDSA ? 'Revisit time and space complexity for common patterns.' : 'Review time and space complexity basics.',
    hasCore ? 'Revise key Core CS topics (OS, DBMS, Networks, OOP).' : 'Summarise notes for one CS subject you are less confident in.',
    hasSql ? 'Write queries with joins, aggregations, and filtering.' : 'Practice implementing simple CRUD logic by hand.',
  ]

  const round3: string[] = [
    'Prepare a 2-minute summary for each project on your resume.',
    hasWeb ? 'Be ready to explain your frontend or backend stack choice.' : 'Be ready to explain why you chose your tech stack for each project.',
    hasReact ? 'Review component composition, props vs state, and hooks.' : 'Review how you structure application logic and separate concerns.',
    hasSql ? 'Be ready to discuss how your app stores and queries data.' : 'Be ready to discuss how you handled data flow and persistence.',
  ]

  const round4 = [
    'Prepare stories for teamwork, conflict resolution, and ownership.',
    'Practice answering “Tell me about yourself” with structure.',
    'Rehearse why this company and this role, specific to the JD.',
    'Prepare 3–4 thoughtful questions to ask the interviewer.',
  ]

  return {
    'Round 1: Aptitude / Basics': round1,
    'Round 2: DSA + Core CS': round2,
    'Round 3: Tech interview (projects + stack)': round3,
    'Round 4: Managerial / HR': round4,
  }
}

export function buildSevenDayPlan(skills: ExtractedSkills): string[] {
  const hasReact = skills.Web.some((s) => s.toLowerCase().includes('react'))
  const hasSql = skills.Data.some((s) => s.toLowerCase().includes('sql') || s.toLowerCase().includes('mysql') || s.toLowerCase().includes('postgres'))

  const plan: string[] = []
  plan.push('Day 1–2: Refresh aptitude, Core CS (OS, DBMS, OOP), and your primary language basics.')

  let d3d4 = 'Day 3–4: Focus on DSA and coding practice (arrays, strings, and common patterns).'
  if (hasReact) {
    d3d4 += ' Include at least one React coding session each day (component/state drills).'
  }
  plan.push(d3d4)

  let d5 = 'Day 5: Align projects and resume with the JD. Update bullet points to highlight relevant work.'
  if (hasSql) {
    d5 += ' Add 1–2 bullet points that show how you used SQL in projects.'
  }
  plan.push(d5)

  plan.push('Day 6: Run a structured mock interview (self or with a friend) covering projects and core topics.')
  plan.push('Day 7: Review weak areas, re-run 1 mock test, and prepare a calm day-before checklist.')

  return plan
}

export function buildQuestions(skills: ExtractedSkills): string[] {
  const questions: string[] = []

  if (skills.Data.length > 0) {
    questions.push(
      'Explain how indexing works in SQL and when it improves performance.',
      'What are transactions and isolation levels in relational databases?',
    )
  }

  if (skills.Web.some((s) => s.toLowerCase().includes('react'))) {
    questions.push(
      'How do you manage state in React across a medium-sized application?',
      'Explain the difference between controlled and uncontrolled components in React.',
    )
  }

  if (skills['Core CS'].some((s) => s.toLowerCase().includes('dsa') || s.toLowerCase().includes('data structures'))) {
    questions.push(
      'Given a sorted array, how would you optimize search operations and why?',
      'When would you use a hash map over a balanced binary search tree?',
    )
  }

  if (skills['Cloud / DevOps'].length > 0) {
    questions.push(
      'Describe how you would design a basic CI/CD pipeline for a web application.',
      'What are containers and how do Docker and Kubernetes work together?',
    )
  }

  if (skills.Languages.some((s) => s.toLowerCase().includes('java'))) {
    questions.push('Explain how the JVM manages memory (heap vs stack, GC roots).')
  }

  if (skills.Testing.length > 0) {
    questions.push('How do you design reliable automated tests without making them brittle?')
  }

  if (questions.length < 10) {
    questions.push(
      'Walk me through a recent project. What decisions did you make and why?',
      'Describe a bug you struggled with and how you diagnosed and fixed it.',
      'How do you approach learning a new technology mentioned in a JD?',
    )
  }

  return questions.slice(0, 10)
}

export function readHistory(): AnalysisEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed as AnalysisEntry[]
  } catch {
    return []
  }
}

export function writeHistory(entries: AnalysisEntry[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // ignore
  }
}

export function addHistoryEntry(entry: AnalysisEntry): void {
  const existing = readHistory()
  const next = [entry, ...existing]
  writeHistory(next)
}

export function findAnalysisById(id: string): AnalysisEntry | undefined {
  return readHistory().find((e) => e.id === id)
}

