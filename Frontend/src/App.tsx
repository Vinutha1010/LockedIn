import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import { InterviewRoom } from '@/pages/InterviewRoom'
import { Report } from '@/pages/Report'
import { Questions } from '@/pages/Questions'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/interview" element={<InterviewRoom />} />
        <Route path="/interview/:sessionId" element={<InterviewRoom />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report/:sessionId" element={<Report />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
