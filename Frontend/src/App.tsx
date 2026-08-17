import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import { InterviewRoom } from '@/pages/InterviewRoom'
import { Report } from '@/pages/Report'
import { Questions } from '@/pages/Questions'
import { Auth } from '@/pages/Auth'
import { Profile } from '@/pages/Profile'
import { LockyChatbot } from '@/components/chat/LockyChatbot'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/interview" element={<InterviewRoom />} />
        <Route path="/interview/:sessionId" element={<InterviewRoom />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report/:sessionId" element={<Report />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <LockyChatbot />
    </BrowserRouter>
  )
}

export default App
