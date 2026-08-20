import type { Question, AnswerFeedback, SessionReport } from '@/types'
import { QUESTION_BANK as initialQuestions } from '@/data/questions'

const rawBase = (import.meta.env.VITE_API_URL as string | undefined)?.trim() || 'http://localhost:5000/api'
const cleanBase = rawBase.replace(/\/+$/, '')
const API_BASE = cleanBase.endsWith('/api') ? cleanBase : `${cleanBase}/api`

export const api = {
  /**
   * Health check for backend connectivity
   */
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) })
      const data = await res.json()
      return data.status === 'ok'
    } catch {
      return false
    }
  },

  /**
   * Fetches questions from backend with offline fallback
   */
  async getQuestions(category?: string, difficulty?: string): Promise<Question[]> {
    try {
      const params = new URLSearchParams()
      if (category && category !== 'All') params.append('category', category)
      if (difficulty && difficulty !== 'All') params.append('difficulty', difficulty)

      const res = await fetch(`${API_BASE}/questions?${params.toString()}`, {
        signal: AbortSignal.timeout(3000),
      })
      if (!res.ok) throw new Error('Failed to fetch')
      const json = await res.json()
      if (json.data && json.data.length > 0) {
        return json.data
      }
      return initialQuestions
    } catch {
      return initialQuestions
    }
  },

  /**
   * Starts an interview session on backend
   */
  async startSession(payload: {
    candidateName: string
    targetRole: string
    roundType: string
    difficulty: string
    timeLimitMinutes: number
    questionIds: string[]
  }): Promise<string | null> {
    try {
      const res = await fetch(`${API_BASE}/interviews/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(4000),
      })
      if (!res.ok) return null
      const json = await res.json()
      return json.data?.id || null
    } catch {
      return null
    }
  },

  /**
   * Submits question answer for AI rubric evaluation
   */
  async submitAnswer(
    sessionId: string,
    payload: {
      questionId: string
      submittedCode: string
      submittedNotes?: string
      language: string
      testsPassed: number
      testsTotal: number
      executionTimeMs?: number
      timeSpentSeconds?: number
    }
  ): Promise<AnswerFeedback | null> {
    try {
      const res = await fetch(`${API_BASE}/interviews/${sessionId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      })
      if (!res.ok) return null
      const json = await res.json()
      return json.data?.evaluation || null
    } catch {
      return null
    }
  },

  /**
   * Completes interview session and generates holistic diagnostic report
   */
  async completeSession(sessionId: string): Promise<SessionReport | null> {
    try {
      const res = await fetch(`${API_BASE}/interviews/${sessionId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(15000),
      })
      if (!res.ok) return null
      const json = await res.json()
      return json.data?.report || null
    } catch {
      return null
    }
  },

  /**
   * Requests Socratic AI hint
   */
  async requestHint(payload: {
    questionTitle: string
    questionDescription: string
    currentCode: string
    hintLevel?: number
  }): Promise<string | null> {
    try {
      const res = await fetch(`${API_BASE}/ai/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      })
      if (!res.ok) return null
      const json = await res.json()
      return json.data?.hint || null
    } catch {
      return null
    }
  },
}
