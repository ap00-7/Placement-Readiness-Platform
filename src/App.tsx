import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { AppShell } from './components/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { PracticePage } from './pages/PracticePage'
import { AssessmentsPage } from './pages/AssessmentsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { ProfilePage } from './pages/ProfilePage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

