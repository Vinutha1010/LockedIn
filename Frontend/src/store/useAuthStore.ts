import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  targetRole: string
  seniority: 'junior' | 'mid' | 'senior' | 'lead'
  bio: string
  streakDays: number
  totalInterviews: number
  totalQuestionsSolved: number
  solvedQuestionIds: string[]
  favoriteQuestionIds: string[]
  skillsRadar: {
    dsa: number
    patterns: number
    csFundamentals: number
    practicalCoding: number
    aptitude: number
  }
  recentSessions: Array<{
    id: string
    date: string
    track: string
    role: string
    score: number
    durationMinutes: number
  }>
  joinedDate: string
}

interface AuthState {
  isAuthenticated: boolean
  user: UserProfile | null
  login: (email: string, password?: string) => Promise<boolean>
  register: (name: string, email: string, targetRole: string, password?: string) => Promise<boolean>
  demoLogin: (persona?: 'sde' | 'frontend' | 'lead') => void
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
  markQuestionSolved: (questionId: string) => void
  toggleFavorite: (questionId: string) => void
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_demo_01',
  name: 'Alex Chen',
  email: 'alex.chen@lockedin.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  targetRole: 'Software Engineer (SDE)',
  seniority: 'mid',
  bio: 'Full-stack developer preparing for Tier-1 product company coding rounds. Focused on Distributed Systems, Advanced DSA, and Patterns.',
  streakDays: 14,
  totalInterviews: 8,
  totalQuestionsSolved: 42,
  solvedQuestionIds: [
    'dsa-kadane',
    'dsa-two-sum',
    'pattern-diamond',
    'pattern-floyds-triangle',
    'cs-mcq-os-deadlock',
    'cs-mcq-dbms-acid-isolation',
    'code-mcq-js-event-loop',
    'code-mcq-dsa-master-theorem',
    'apt-quant-1',
    'apt-quant-2'
  ],
  favoriteQuestionIds: ['dsa-kadane', 'pattern-pascals-triangle', 'code-mcq-js-event-loop'],
  skillsRadar: {
    dsa: 82,
    patterns: 90,
    csFundamentals: 85,
    practicalCoding: 88,
    aptitude: 78,
  },
  recentSessions: [
    {
      id: 'sess_101',
      date: '2026-08-16',
      track: 'Data Structures & Algorithms',
      role: 'SDE II (Meta / Google)',
      score: 88,
      durationMinutes: 42,
    },
    {
      id: 'sess_102',
      date: '2026-08-14',
      track: 'Pattern Programming',
      role: 'SDE Entry (TCS / Infosys)',
      score: 95,
      durationMinutes: 25,
    },
    {
      id: 'sess_103',
      date: '2026-08-11',
      track: 'CS Fundamentals & Architecture',
      role: 'Backend Engineer (Uber)',
      score: 82,
      durationMinutes: 35,
    }
  ],
  joinedDate: 'August 2026',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: true,
      user: DEFAULT_USER,

      login: async (email: string) => {
        set({
          isAuthenticated: true,
          user: {
            ...DEFAULT_USER,
            email,
            name: email.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()),
          },
        })
        return true
      },

      register: async (name: string, email: string, targetRole: string) => {
        set({
          isAuthenticated: true,
          user: {
            ...DEFAULT_USER,
            id: `usr_${Date.now()}`,
            name,
            email,
            targetRole,
            totalInterviews: 0,
            totalQuestionsSolved: 0,
            streakDays: 1,
            solvedQuestionIds: [],
            recentSessions: [],
          },
        })
        return true
      },

      demoLogin: (persona = 'sde') => {
        if (persona === 'frontend') {
          set({
            isAuthenticated: true,
            user: {
              ...DEFAULT_USER,
              id: 'usr_demo_fe',
              name: 'Sarah Connor',
              email: 'sarah.connor@lockedin.ai',
              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
              targetRole: 'Senior Frontend Engineer',
              seniority: 'senior',
              bio: 'React, Web Performance, and JavaScript Internals specialist.',
              streakDays: 21,
              totalInterviews: 14,
              totalQuestionsSolved: 68,
              skillsRadar: { dsa: 76, patterns: 95, csFundamentals: 80, practicalCoding: 96, aptitude: 84 },
            },
          })
        } else if (persona === 'lead') {
          set({
            isAuthenticated: true,
            user: {
              ...DEFAULT_USER,
              id: 'usr_demo_lead',
              name: 'David Kim',
              email: 'david.kim@lockedin.ai',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
              targetRole: 'Staff Software Architect',
              seniority: 'lead',
              bio: 'High-throughput microservices, distributed consensus, and concurrency specialist.',
              streakDays: 35,
              totalInterviews: 22,
              totalQuestionsSolved: 110,
              skillsRadar: { dsa: 92, patterns: 88, csFundamentals: 96, practicalCoding: 92, aptitude: 90 },
            },
          })
        } else {
          set({
            isAuthenticated: true,
            user: DEFAULT_USER,
          })
        }
      },

      logout: () => {
        set({ isAuthenticated: false, user: null })
      },

      updateProfile: (updates) => {
        const current = get().user
        if (current) {
          set({ user: { ...current, ...updates } })
        }
      },

      markQuestionSolved: (questionId: string) => {
        const current = get().user
        if (!current) return
        const setIds = new Set(current.solvedQuestionIds)
        if (!setIds.has(questionId)) {
          setIds.add(questionId)
          set({
            user: {
              ...current,
              solvedQuestionIds: Array.from(setIds),
              totalQuestionsSolved: setIds.size,
            },
          })
        }
      },

      toggleFavorite: (questionId: string) => {
        const current = get().user
        if (!current) return
        const setIds = new Set(current.favoriteQuestionIds)
        if (setIds.has(questionId)) {
          setIds.delete(questionId)
        } else {
          setIds.add(questionId)
        }
        set({
          user: {
            ...current,
            favoriteQuestionIds: Array.from(setIds),
          },
        })
      },
    }),
    {
      name: 'lockedin_auth_storage',
    }
  )
)
