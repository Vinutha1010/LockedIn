import { create } from 'zustand'
import type {
  InterviewSessionState,
  Question,
  AnswerFeedback,
  CandidateAnswer,
  TranscriptItem,
} from '@/types'

const DEFAULT_MOCK_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    title: 'Design a Distributed Rate Limiter',
    description:
      'Explain how you would design a distributed rate limiter for a high-scale microservices architecture handling over 100,000 requests/second. Discuss token bucket vs sliding window log algorithms, storage considerations (e.g., Redis cluster), race conditions, and handling edge cases with network partitions.',
    roundType: 'system-design',
    difficulty: 'senior',
    category: 'System Design & Scalability',
    hints: [
      'Consider the memory footprint of Sliding Window Counter vs Token Bucket.',
      'How would you handle Redis replication latency or atomic increment with Lua scripts?',
      'What fallback strategy should client gateways adopt if the central Redis cache is unreachable?',
    ],
    starterCode: `// Pseudo-code or architecture outline for Distributed Rate Limiter
class RateLimiter {
  constructor(private redisClient: any, private limit: number, private windowMs: number) {}

  async isAllowed(userId: string): Promise<{ allowed: boolean; remaining: number }> {
    const key = \`rate_limit:\${userId}\`;
    const currentTime = Date.now();
    
    // TODO: Implement atomic Lua script execution with Redis
    return { allowed: true, remaining: this.limit - 1 };
  }
}`,
    language: 'typescript',
    expectedComplexity: {
      time: 'O(1) lookup & update with Redis Lua',
      space: 'O(N) where N is active user keys',
    },
    rubricCriteria: [
      'Clarification of requirements (concurrency, throughput, accuracy vs latency trade-offs)',
      'Selection and justification of rate limiting algorithm',
      'High-level architecture (API Gateway, Redis cache cluster, fallback mechanisms)',
      'Deep dive into concurrency (race conditions, Lua scripting, Redis multi/exec)',
    ],
    timeLimitMinutes: 15,
  },
  {
    id: 'q-2',
    title: 'Two Sum II - Input Array Is Sorted',
    description:
      'Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return the indices of the two numbers, `[index1, index2]`, added by one as an integer array [index1, index2] of length 2.\n\nYou may not use the same element twice. Your solution must use only O(1) extra space.',
    roundType: 'coding',
    difficulty: 'medium',
    category: 'Algorithms & Two Pointers',
    hints: [
      'Since the array is sorted, how can two pointers from the left and right boundaries guide your search?',
      'If numbers[left] + numbers[right] > target, which pointer should move?',
    ],
    starterCode: `function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}`,
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N)',
      space: 'O(1)',
    },
    rubricCriteria: [
      'Correct two-pointer implementation',
      'Edge cases (empty, minimal elements, negative numbers)',
      'O(1) space constraint compliance',
    ],
    timeLimitMinutes: 10,
  },
  {
    id: 'q-3',
    title: 'Resolving Technical Disagreements in Engineering Teams',
    description:
      'Tell me about a time when you and a principal engineer or team lead disagreed strongly on a technical architecture or library choice. How did you advocate for your point of view, how was the final decision made, and what was the outcome?',
    roundType: 'behavioral',
    difficulty: 'senior',
    category: 'Behavioral & Leadership',
    hints: [
      'Structure using STAR method: Situation, Task, Action, Result.',
      'Emphasize data-driven decision making, prototyping/benchmarking, and "disagree and commit".',
    ],
    rubricCriteria: [
      'Clarity and structure using STAR framework',
      'Demonstration of empathy, active listening, and technical maturity',
      'Focus on team cohesion and business goals over ego',
    ],
    timeLimitMinutes: 8,
  },
]

export const useInterviewStore = create<InterviewSessionState>((set, get) => ({
  sessionId: 'session-' + Math.random().toString(36).substring(2, 9),
  candidateName: 'Alex Chen',
  targetRole: 'Senior Fullstack & Distributed Systems Engineer',
  companyTarget: 'Meta / Stripe tier',
  roundType: 'technical',
  difficulty: 'senior',
  questions: DEFAULT_MOCK_QUESTIONS,
  currentQuestionIndex: 0,
  sessionStatus: 'idle',

  // Timer
  timeElapsedSeconds: 0,
  timeRemainingSeconds: 2700, // 45 minutes
  isTimerRunning: false,

  // AV
  isAiSpeaking: false,
  isListening: false,
  candidateAudioEnabled: true,
  candidateVideoEnabled: true,

  // Code & Language
  activeCode: DEFAULT_MOCK_QUESTIONS[0].starterCode || '',
  activeLanguage: DEFAULT_MOCK_QUESTIONS[0].language || 'typescript',

  // Transcripts & Feedbacks
  transcripts: [
    {
      id: 'tr-0',
      speaker: 'ai',
      text: "Welcome Alex! I'm your AI interviewer today for the Senior Fullstack & Distributed Systems Engineer loop. Let's start with our first question on system architecture. When you're ready, take a look at the prompt.",
      timestamp: '00:00',
    },
  ],
  answers: {},
  feedbacks: {},
  isFeedbackPanelOpen: false,
  activeTab: 'workspace',

  initSession: (params) => {
    set((state) => {
      const questions = params?.questions || state.questions
      const initialCode = questions[0]?.starterCode || ''
      const initialLang = questions[0]?.language || 'typescript'
      return {
        ...state,
        ...params,
        activeCode: initialCode,
        activeLanguage: initialLang,
      }
    })
  },

  startSession: () => {
    set({ sessionStatus: 'in-progress', isTimerRunning: true })
  },

  pauseSession: () => {
    set({ sessionStatus: 'paused', isTimerRunning: false })
  },

  resumeSession: () => {
    set({ sessionStatus: 'in-progress', isTimerRunning: true })
  },

  endSession: () => {
    set({ sessionStatus: 'completed', isTimerRunning: false })
  },

  setQuestionIndex: (index: number) => {
    const { questions, answers } = get()
    if (index >= 0 && index < questions.length) {
      const q = questions[index]
      const existingAnswer = answers[q.id]
      set({
        currentQuestionIndex: index,
        activeCode: existingAnswer?.code ?? q.starterCode ?? '',
        activeLanguage: existingAnswer?.language ?? q.language ?? 'typescript',
      })
    }
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get()
    if (currentQuestionIndex < questions.length - 1) {
      get().setQuestionIndex(currentQuestionIndex + 1)
    }
  },

  prevQuestion: () => {
    const { currentQuestionIndex } = get()
    if (currentQuestionIndex > 0) {
      get().setQuestionIndex(currentQuestionIndex - 1)
    }
  },

  tickTimer: () => {
    set((state) => {
      if (!state.isTimerRunning) return state
      const newElapsed = state.timeElapsedSeconds + 1
      const newRemaining = Math.max(0, state.timeRemainingSeconds - 1)
      return {
        timeElapsedSeconds: newElapsed,
        timeRemainingSeconds: newRemaining,
        sessionStatus: newRemaining === 0 ? 'completed' : state.sessionStatus,
        isTimerRunning: newRemaining === 0 ? false : state.isTimerRunning,
      }
    })
  },

  resetTimer: (totalSeconds = 2700) => {
    set({
      timeElapsedSeconds: 0,
      timeRemainingSeconds: totalSeconds,
    })
  },

  setActiveCode: (code: string) => {
    set({ activeCode: code })
  },

  setActiveLanguage: (lang: string) => {
    set({ activeLanguage: lang })
  },

  toggleAudio: () => {
    set((state) => ({ candidateAudioEnabled: !state.candidateAudioEnabled }))
  },

  toggleVideo: () => {
    set((state) => ({ candidateVideoEnabled: !state.candidateVideoEnabled }))
  },

  setIsAiSpeaking: (speaking: boolean) => {
    set({ isAiSpeaking: speaking })
  },

  setIsListening: (listening: boolean) => {
    set({ isListening: listening })
  },

  addTranscript: (speaker: 'ai' | 'candidate', text: string) => {
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const newItem: TranscriptItem = {
      id: 'tr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      speaker,
      text,
      timestamp: formatTime(get().timeElapsedSeconds),
    }

    set((state) => ({
      transcripts: [...state.transcripts, newItem],
    }))
  },

  submitAnswer: async (answerPayload) => {
    const { questions, currentQuestionIndex, activeCode, activeLanguage, addTranscript } = get()
    const currentQ = questions[currentQuestionIndex]
    if (!currentQ) return

    const candidateAnswer: CandidateAnswer = {
      questionId: currentQ.id,
      code: answerPayload?.code ?? activeCode,
      language: answerPayload?.language ?? activeLanguage,
      speechText: answerPayload?.speechText,
      submittedAt: new Date().toISOString(),
    }

    // Save answer and set status to evaluating
    set((state) => ({
      answers: { ...state.answers, [currentQ.id]: candidateAnswer },
      sessionStatus: 'evaluating',
      feedbacks: {
        ...state.feedbacks,
        [currentQ.id]: {
          questionId: currentQ.id,
          overallScore: 0,
          technicalScore: 0,
          communicationScore: 0,
          problemSolvingScore: 0,
          strengths: [],
          weaknesses: [],
          suggestions: [],
          evaluatedAt: new Date().toISOString(),
          status: 'evaluating',
        },
      },
    }))

    addTranscript('candidate', answerPayload?.speechText || 'I have submitted my solution and explanation for review.')

    // Simulate AI synthesis & evaluation
    setTimeout(() => {
      const isSystemDesign = currentQ.roundType === 'system-design'
      const feedback: AnswerFeedback = {
        questionId: currentQ.id,
        overallScore: isSystemDesign ? 88 : 94,
        technicalScore: isSystemDesign ? 90 : 96,
        communicationScore: 85,
        problemSolvingScore: 92,
        codeQualityScore: isSystemDesign ? 82 : 95,
        strengths: [
          'Strong command of fundamental scalability trade-offs and atomic operations.',
          'Clear architectural reasoning with consideration for network partition fallbacks.',
          'Concise variable naming and structured modular pseudo-code.',
        ],
        weaknesses: [
          'Could elaborate deeper on client-side jitter/backoff during rate-limit rejections.',
          'Memory cost estimation per 100k active users was slightly understated.',
        ],
        suggestions: [
          'Consider mentioning Sliding Window Counter as a hybrid compromise between memory and accuracy.',
          'Highlight circuit breaker patterns in the API gateway for resilience when Redis latency spikes.',
        ],
        modelAnswerSummary:
          'A production-grade distributed rate limiter typically employs a Redis cluster executing atomic Lua scripts implementing the Token Bucket algorithm with local memory caching for hot tier routing.',
        evaluatedAt: new Date().toISOString(),
        status: 'completed',
      }

      set((state) => ({
        sessionStatus: 'in-progress',
        feedbacks: { ...state.feedbacks, [currentQ.id]: feedback },
        isFeedbackPanelOpen: true,
      }))

      addTranscript(
        'ai',
        `Great job! I evaluated your answer for "${currentQ.title}". Your technical depth is solid with an overall score of ${feedback.overallScore}/100. Open the feedback drawer to see specific actionable points.`
      )
    }, 1600)
  },

  setFeedback: (questionId: string, feedback: AnswerFeedback) => {
    set((state) => ({
      feedbacks: { ...state.feedbacks, [questionId]: feedback },
    }))
  },

  toggleFeedbackPanel: (open) => {
    set((state) => ({
      isFeedbackPanelOpen: open !== undefined ? open : !state.isFeedbackPanelOpen,
    }))
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab })
  },
}))
