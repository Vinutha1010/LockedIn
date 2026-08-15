export type RoundType =
  | 'dsa'
  | 'cs-fundamentals'
  | 'coding'
  | 'aptitude'
  | 'technical'
  | 'system-design'
  | 'behavioral'
  | 'resume-deep-dive'

export type Difficulty = 'junior' | 'mid' | 'senior' | 'lead' | 'easy' | 'medium' | 'hard'

export type SessionStatus = 'idle' | 'in-progress' | 'paused' | 'evaluating' | 'completed'

export interface Question {
  id: string
  title: string
  description: string
  roundType: RoundType
  difficulty: Difficulty
  category: string
  tags?: string[]
  companyTags?: string[]
  frequency?: 'High' | 'Medium' | 'Trending'
  acceptanceRate?: string
  hints?: string[]
  starterCode?: string
  language?: string
  expectedComplexity?: {
    time?: string
    space?: string
  }
  rubricCriteria?: string[]
  timeLimitMinutes?: number
}

export interface AnswerFeedback {
  questionId: string
  overallScore: number // 0-100
  technicalScore: number // 0-100
  communicationScore: number // 0-100
  problemSolvingScore: number // 0-100
  codeQualityScore?: number // 0-100
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  modelAnswerSummary?: string
  evaluatedAt: string
  status: 'evaluating' | 'completed' | 'failed'
}

export interface TranscriptItem {
  id: string
  speaker: 'ai' | 'candidate'
  text: string
  timestamp: string
}

export interface CandidateAnswer {
  questionId: string
  speechText?: string
  code?: string
  language?: string
  submittedAt: string
}

export type HiringDecision = 'strong-hire' | 'hire' | 'lean-hire' | 'needs-work'

export interface PerformanceDimension {
  dimension: string
  score: number // 0-100
  benchmark: number // 0-100
  fullMark: number
}

export interface QuestionReportSummary {
  question: Question
  answer?: CandidateAnswer
  feedback?: AnswerFeedback
}

export interface SessionReport {
  sessionId: string
  candidateName: string
  targetRole: string
  companyTarget?: string
  roundType: RoundType
  difficulty: Difficulty
  completedAt: string
  timeSpentSeconds: number
  totalTimeAllocatedSeconds: number

  // Executive Evaluation
  overallScore: number
  hiringDecision: HiringDecision
  percentileRank: number
  summaryHeadline: string
  summaryNotes: string

  // Dimensional metrics
  dimensions: PerformanceDimension[]

  // Question-by-question review
  questionSummaries: QuestionReportSummary[]

  // Aggregated Highlights
  topStrengths: string[]
  keyGrowthAreas: string[]
  recommendedNextSteps: string[]

  // Transcripts
  transcripts: TranscriptItem[]
}

export interface InterviewSessionState {
  sessionId: string
  candidateName: string
  targetRole: string
  companyTarget?: string
  roundType: RoundType
  difficulty: Difficulty
  questions: Question[]
  currentQuestionIndex: number
  sessionStatus: SessionStatus
  
  // Timer state
  timeElapsedSeconds: number
  timeRemainingSeconds: number
  isTimerRunning: boolean
  
  // Audio / Stream state
  isAiSpeaking: boolean
  isListening: boolean
  candidateAudioEnabled: boolean
  candidateVideoEnabled: boolean
  
  // Workspace / Code
  activeCode: string
  activeLanguage: string
  
  // Live transcripts & answers
  transcripts: TranscriptItem[]
  answers: Record<string, CandidateAnswer>
  feedbacks: Record<string, AnswerFeedback>
  isFeedbackPanelOpen: boolean
  activeTab: 'workspace' | 'transcript' | 'feedback'

  // Reports & History
  currentReport: SessionReport | null
  pastReports: SessionReport[]

  // Actions
  initSession: (params?: Partial<InterviewSessionState>) => void
  startSession: () => void
  pauseSession: () => void
  resumeSession: () => void
  endSession: () => void
  completeAndGenerateReport: () => SessionReport
  getReportById: (sessionId: string) => SessionReport | undefined
  launchQuestionSession: (questionOrQuestions: Question | Question[]) => void
  
  setQuestionIndex: (index: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  
  tickTimer: () => void
  resetTimer: (totalSeconds?: number) => void
  
  setActiveCode: (code: string) => void
  setActiveLanguage: (lang: string) => void
  
  toggleAudio: () => void
  toggleVideo: () => void
  setIsAiSpeaking: (speaking: boolean) => void
  setIsListening: (listening: boolean) => void
  
  addTranscript: (speaker: 'ai' | 'candidate', text: string) => void
  submitAnswer: (answerPayload?: Partial<CandidateAnswer>) => Promise<void>
  setFeedback: (questionId: string, feedback: AnswerFeedback) => void
  toggleFeedbackPanel: (open?: boolean) => void
  setActiveTab: (tab: 'workspace' | 'transcript' | 'feedback') => void
}
