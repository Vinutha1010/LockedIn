import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import { InterviewRoom } from '@/pages/InterviewRoom'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/interview" element={<InterviewRoom />} />
        <Route path="/interview/:sessionId" element={<InterviewRoom />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
