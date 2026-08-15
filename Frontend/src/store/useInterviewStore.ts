import { create } from 'zustand'
import type {
  InterviewSessionState,
  Question,
  AnswerFeedback,
  CandidateAnswer,
  TranscriptItem,
  SessionReport,
} from '@/types'
import { QUESTION_BANK } from '@/data/questions'
import { evaluateCandidateSubmission } from '@/lib/evaluator'

const DEFAULT_MOCK_QUESTIONS: Question[] = QUESTION_BANK.slice(0, 3)

export const useInterviewStore = create<InterviewSessionState>((set, get) => ({
  sessionId: 'session-' + Math.random().toString(36).substring(2, 9),
  candidateName: 'Alex Chen',
  targetRole: 'Software Engineer (SDE)',
  companyTarget: 'Top Tech / SDE',
  roundType: 'dsa',
  difficulty: 'mid',
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
  activeCode: DEFAULT_MOCK_QUESTIONS[0]?.starterCode || '',
  activeLanguage: DEFAULT_MOCK_QUESTIONS[0]?.language || 'typescript',

  // Transcripts & Feedbacks
  transcripts: [
    {
      id: 'tr-0',
      speaker: 'ai',
      text: "Welcome Alex! I'm your AI interviewer today. Let's start with our first question. When you're ready, review the prompt in the workspace and begin.",
      timestamp: '00:00',
    },
  ],
  answers: {},
  feedbacks: {},
  isFeedbackPanelOpen: false,
  activeTab: 'workspace',

  // Reports & History
  currentReport: null,
  pastReports: (() => {
    try {
      const saved = localStorage.getItem('lockedin_past_reports')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })(),

  initSession: (params) => {
    set((state) => {
      const questions = params?.questions || state.questions
      const initialCode = questions[0]?.starterCode || ''
      const initialLang = questions[0]?.language || 'typescript'
      const newSessionId = params?.sessionId || 'session-' + Math.random().toString(36).substring(2, 9)
      return {
        ...state,
        ...params,
        sessionId: newSessionId,
        activeCode: initialCode,
        activeLanguage: initialLang,
      }
    })
  },

  launchQuestionSession: (questionOrQuestions) => {
    const questionsList = Array.isArray(questionOrQuestions) ? questionOrQuestions : [questionOrQuestions]
    const primaryQ = questionsList[0]
    const totalMinutes = questionsList.reduce((acc, q) => acc + (q.timeLimitMinutes || 15), 0)
    const newSessionId = 'session-' + Math.random().toString(36).substring(2, 9)

    set({
      sessionId: newSessionId,
      questions: questionsList,
      currentQuestionIndex: 0,
      roundType: primaryQ.roundType,
      difficulty: primaryQ.difficulty,
      sessionStatus: 'in-progress',
      isTimerRunning: true,
      timeElapsedSeconds: 0,
      timeRemainingSeconds: totalMinutes * 60,
      activeCode: primaryQ.starterCode || '',
      activeLanguage: primaryQ.language || 'typescript',
      answers: {},
      feedbacks: {},
      isFeedbackPanelOpen: false,
      transcripts: [
        {
          id: 'tr-0',
          speaker: 'ai',
          text: `Welcome! Today we are practicing "${primaryQ.title}". Please read the problem description, take a moment to formulate your thoughts or architecture, and begin when you're ready.`,
          timestamp: '00:00',
        },
      ],
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

  completeAndGenerateReport: () => {
    const state = get()
    const {
      sessionId,
      candidateName,
      targetRole,
      companyTarget,
      roundType,
      difficulty,
      questions,
      answers,
      feedbacks,
      transcripts,
      timeElapsedSeconds,
    } = state

    // Build question summaries using real answers and feedbacks
    const questionSummaries = questions.map((q) => {
      const ans = answers[q.id]
      let fb = feedbacks[q.id]

      if (!fb) {
        // If candidate submitted code/notes but hadn't clicked individual evaluation before finishing
        if (ans && (ans.code || ans.speechText)) {
          fb = evaluateCandidateSubmission(q, ans)
        } else {
          // Question was skipped or unattempted
          fb = {
            questionId: q.id,
            overallScore: 0,
            technicalScore: 0,
            communicationScore: 0,
            problemSolvingScore: 0,
            codeQualityScore: 0,
            strengths: [],
            weaknesses: ['Question was skipped or unattempted during the mock loop.'],
            suggestions: ['Attempt all questions in the loop to maximize overall evaluation score.'],
            modelAnswerSummary: q.hints?.[0] || 'Optimal solution uses modular logic with verified complexity.',
            evaluatedAt: new Date().toISOString(),
            status: 'completed',
          }
        }
      }

      return {
        question: q,
        answer: ans,
        feedback: fb,
      }
    })

    const totalQuestions = questionSummaries.length || 1
    const attemptedQuestions = questionSummaries.filter((q) => (q.feedback?.overallScore || 0) > 0)
    const attemptedCount = attemptedQuestions.length

    // Calculate aggregated scores across all questions in the loop (unanswered questions count as 0)
    const totalScoreSum = questionSummaries.reduce((sum, item) => sum + (item.feedback?.overallScore || 0), 0)
    const overallScore = Math.round(totalScoreSum / totalQuestions)

    const avgTech = Math.round(
      questionSummaries.reduce((sum, item) => sum + (item.feedback?.technicalScore || 0), 0) / totalQuestions
    )
    const avgComm = Math.round(
      questionSummaries.reduce((sum, item) => sum + (item.feedback?.communicationScore || 0), 0) / totalQuestions
    )
    const avgProb = Math.round(
      questionSummaries.reduce((sum, item) => sum + (item.feedback?.problemSolvingScore || 0), 0) / totalQuestions
    )
    const avgCode = Math.round(
      questionSummaries.reduce((sum, item) => sum + (item.feedback?.codeQualityScore || 0), 0) / totalQuestions
    )
    const avgArch = Math.round(avgTech * 0.5 + avgProb * 0.5)

    // Determine Hiring Decision
    let hiringDecision: import('@/types').HiringDecision = 'needs-work'
    if (attemptedCount === 0 || overallScore < 45) {
      hiringDecision = 'needs-work'
    } else if (overallScore >= 85 && attemptedCount === totalQuestions) {
      hiringDecision = 'strong-hire'
    } else if (overallScore >= 68) {
      hiringDecision = 'hire'
    } else {
      hiringDecision = 'lean-hire'
    }

    const percentileRank =
      attemptedCount === 0
        ? 5
        : Math.min(99, Math.max(15, Math.round(overallScore * 1.05)))

    // Extract unique strengths & weaknesses
    const allStrengths = Array.from(
      new Set(questionSummaries.flatMap((q) => q.feedback?.strengths || []))
    ).filter(Boolean).slice(0, 4) as string[]

    const allGrowthAreas = Array.from(
      new Set(questionSummaries.flatMap((q) => q.feedback?.weaknesses || []))
    ).filter(Boolean).slice(0, 3) as string[]

    const allSuggestions = Array.from(
      new Set(questionSummaries.flatMap((q) => q.feedback?.suggestions || []))
    ).filter(Boolean).slice(0, 3) as string[]

    let summaryHeadline = ''
    let summaryNotes = ''

    if (attemptedCount === 0) {
      summaryHeadline = 'Incomplete Session: No questions were submitted for evaluation during this mock loop.'
      summaryNotes = `${candidateName} finished the interview session after ${Math.floor(timeElapsedSeconds / 60)} minutes without submitting answers for the ${totalQuestions} problem stages.`
    } else {
      summaryHeadline =
        hiringDecision === 'strong-hire'
          ? `Outstanding performance across all ${totalQuestions} stages with clean code and optimal problem solving.`
          : hiringDecision === 'hire'
          ? `Solid technical performance meeting core interview benchmarks across ${attemptedCount} of ${totalQuestions} questions.`
          : `Attempted ${attemptedCount} of ${totalQuestions} questions. Core logic demonstrated but needs more complete solutions.`

      summaryNotes = `${candidateName} completed ${attemptedCount} of ${totalQuestions} questions in ${Math.floor(timeElapsedSeconds / 60)} minutes targeting ${targetRole}. Evaluated with highest marks in ${avgTech >= avgProb ? 'Data Structures & Algorithms' : 'Problem Solving & Logic'}.`
    }

    const report: SessionReport = {
      sessionId,
      candidateName,
      targetRole,
      companyTarget: companyTarget || 'Tier 1 Tech',
      roundType,
      difficulty,
      completedAt: new Date().toISOString(),
      timeSpentSeconds: timeElapsedSeconds,
      totalTimeAllocatedSeconds: 2700,
      overallScore,
      hiringDecision,
      percentileRank,
      summaryHeadline,
      summaryNotes,
      dimensions: [
        { dimension: 'Data Structures & Algorithms', score: avgTech, benchmark: 76, fullMark: 100 },
        { dimension: 'CS Core Fundamentals', score: avgArch, benchmark: 72, fullMark: 100 },
        { dimension: 'Problem Solving & Logic', score: avgProb, benchmark: 74, fullMark: 100 },
        { dimension: 'Code Quality & Cleanliness', score: avgCode, benchmark: 80, fullMark: 100 },
        { dimension: 'Communication & Articulation', score: avgComm, benchmark: 78, fullMark: 100 },
      ],
      questionSummaries,
      topStrengths: allStrengths,
      keyGrowthAreas: allGrowthAreas,
      recommendedNextSteps: allSuggestions,
      transcripts,
    }

    // Persist to past reports in state & localStorage
    const updatedPast = [report, ...state.pastReports.filter((r) => r.sessionId !== sessionId)]
    try {
      localStorage.setItem('lockedin_past_reports', JSON.stringify(updatedPast))
      localStorage.setItem(`lockedin_report_${sessionId}`, JSON.stringify(report))
    } catch (e) {
      console.warn('Failed to save report to localStorage', e)
    }

    set({
      sessionStatus: 'completed',
      isTimerRunning: false,
      currentReport: report,
      pastReports: updatedPast,
    })

    return report
  },

  getReportById: (sessionId: string) => {
    const { currentReport, pastReports } = get()
    if (currentReport && currentReport.sessionId === sessionId) return currentReport
    const found = pastReports.find((r) => r.sessionId === sessionId)
    if (found) return found

    try {
      const item = localStorage.getItem(`lockedin_report_${sessionId}`)
      if (item) return JSON.parse(item)
    } catch {
      // ignore
    }
    return undefined
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

    // Run dynamic evaluation engine
    setTimeout(() => {
      const feedback = evaluateCandidateSubmission(currentQ, candidateAnswer)

      set((state) => ({
        sessionStatus: 'in-progress',
        feedbacks: { ...state.feedbacks, [currentQ.id]: feedback },
        isFeedbackPanelOpen: true,
      }))

      addTranscript(
        'ai',
        feedback.overallScore > 0
          ? `I evaluated your solution for "${currentQ.title}". Overall score: ${feedback.overallScore}/100. ${feedback.strengths[0] || ''}`
          : `I reviewed your submission for "${currentQ.title}". No complete implementation was detected in the editor. Please write your code or verbal walk-through to receive full credit.`
      )
    }, 1200)
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
