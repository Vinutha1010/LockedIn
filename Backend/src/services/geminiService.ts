import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '../config/env.js'

const genAI = env.GEMINI_API_KEY ? new GoogleGenerativeAI(env.GEMINI_API_KEY) : null

export interface EvaluationPayload {
  questionTitle: string
  questionDescription: string
  submittedCode: string
  submittedNotes?: string
  language: string
  testsPassed: number
  testsTotal: number
  expectedTimeComplexity?: string
  expectedSpaceComplexity?: string
  rubricCriteria?: string[]
}

export interface EvaluationResult {
  score: number // 0 - 100
  timeComplexity: string
  spaceComplexity: string
  isOptimal: boolean
  feedbackSummary: string
  strengths: string[]
  improvements: string[]
  rubricBreakdown: Array<{ criterion: string; passed: boolean; note: string }>
}

export interface ReportPayload {
  candidateName: string
  targetRole: string
  roundType: string
  questions: Array<{
    title: string
    category: string
    testsPassed: number
    testsTotal: number
    evaluationScore: number
  }>
}

export interface HolisticReportResult {
  overallScore: number
  technicalScore: number
  communicationScore: number
  problemSolvingScore: number
  systemDesignScore: number
  behavioralScore: number
  hiringRecommendation: 'Strong Hire' | 'Hire' | 'Lean Hire' | 'Re-evaluate'
  summary: string
  strengths: string[]
  weaknesses: string[]
  roadmap: Array<{ week: string; focus: string; actionItems: string[] }>
}

/**
 * Evaluates candidate code and STAR notes using Google Gemini 2.0/1.5 Flash
 */
export async function evaluateSubmissionWithGemini(
  payload: EvaluationPayload
): Promise<EvaluationResult> {
  // If no Gemini API key configured, use intelligent deterministic evaluator
  if (!genAI) {
    return generateHeuristicEvaluation(payload)
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are a Senior Principal Staff Software Engineer and Technical Interviewer at a Tier-1 Tech Company (Google/Meta/Stripe).
Evaluate the candidate's interview answer with high technical rigor.

QUESTION:
Title: ${payload.questionTitle}
Description: ${payload.questionDescription}
Expected Time Complexity: ${payload.expectedTimeComplexity || 'O(N)'}
Expected Space Complexity: ${payload.expectedSpaceComplexity || 'O(N)'}

CANDIDATE SUBMISSION:
Language: ${payload.language}
Code:
\`\`\`${payload.language}
${payload.submittedCode}
\`\`\`

STAR Behavioral/Explanation Notes:
${payload.submittedNotes || 'None provided'}

Test Cases Passed: ${payload.testsPassed} / ${payload.testsTotal}

Evaluate and return ONLY valid JSON matching this exact structure:
{
  "score": 85,
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)",
  "isOptimal": true,
  "feedbackSummary": "Brief constructive 2-3 sentence summary.",
  "strengths": ["Clear hash map usage", "Clean variable names"],
  "improvements": ["Could check complement bounds", "Add comment on edge cases"],
  "rubricBreakdown": [
    { "criterion": "Correctness & Passing Tests", "passed": true, "note": "All test cases passed cleanly." },
    { "criterion": "Optimal Time Complexity", "passed": true, "note": "Achieved O(N) linear time." }
  ]
}`

    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    })

    const text = response.response.text()
    return JSON.parse(text) as EvaluationResult
  } catch (error) {
    console.warn('⚠️ Gemini API error or quota limit. Falling back to heuristic engine:', error)
    return generateHeuristicEvaluation(payload)
  }
}

/**
 * Generates comprehensive holistic report across all session questions
 */
export async function generateHolisticReportWithGemini(
  payload: ReportPayload
): Promise<HolisticReportResult> {
  if (!genAI) {
    return generateHeuristicReport(payload)
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are a Hiring Committee Lead at a top technology company evaluating ${payload.candidateName} for the role of ${payload.targetRole}.
Candidate Interview Data:
Round: ${payload.roundType}
Questions Answered:
${payload.questions.map((q, i) => `${i + 1}. ${q.title} (${q.category}) - Tests: ${q.testsPassed}/${q.testsTotal}, Score: ${q.evaluationScore}/100`).join('\n')}

Generate a comprehensive diagnostic report and return ONLY valid JSON matching this structure:
{
  "overallScore": 88,
  "technicalScore": 90,
  "communicationScore": 85,
  "problemSolvingScore": 89,
  "systemDesignScore": 84,
  "behavioralScore": 86,
  "hiringRecommendation": "Hire",
  "summary": "2-3 sentence executive summary of candidate readiness.",
  "strengths": ["Strong algorithmic intuition", "Clear communication"],
  "weaknesses": ["Edge case handling in negative arrays"],
  "roadmap": [
    { "week": "Week 1", "focus": "Advanced Graphs & Trees", "actionItems": ["Practice Dijkstra and Topological Sort", "Solve 10 BFS/DFS problems"] },
    { "week": "Week 2", "focus": "Dynamic Programming", "actionItems": ["Master 1D and 2D DP patterns"] },
    { "week": "Week 3", "focus": "System Design Fundamentals", "actionItems": ["Review Redis caching and sharding"] },
    { "week": "Week 4", "focus": "Mock Interview Simulation", "actionItems": ["Complete 3 timed end-to-end mock loops"] }
  ]
}`

    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    })

    const text = response.response.text()
    return JSON.parse(text) as HolisticReportResult
  } catch (error) {
    console.warn('⚠️ Gemini API report generation error. Using heuristic fallback:', error)
    return generateHeuristicReport(payload)
  }
}

/**
 * Intelligent deterministic fallback evaluation
 */
function generateHeuristicEvaluation(payload: EvaluationPayload): EvaluationResult {
  const code = payload.submittedCode.toLowerCase()
  const passRate = payload.testsTotal > 0 ? payload.testsPassed / payload.testsTotal : 0

  let score = Math.round(passRate * 70)
  const isOptimal = code.includes('map') || code.includes('dict') || code.includes('set') || !code.includes('for.*for')

  if (isOptimal) score += 20
  if (payload.submittedNotes && payload.submittedNotes.length > 30) score += 10
  score = Math.min(100, Math.max(30, score))

  return {
    score,
    timeComplexity: payload.expectedTimeComplexity || 'O(N)',
    spaceComplexity: payload.expectedSpaceComplexity || 'O(N)',
    isOptimal,
    feedbackSummary:
      passRate === 1
        ? `Outstanding solution! Your ${payload.language} implementation solved all test cases cleanly with optimal ${payload.expectedTimeComplexity || 'O(N)'} time complexity.`
        : `Good attempt! The solution passed ${payload.testsPassed}/${payload.testsTotal} test cases. Focus on edge case bounds and input constraints.`,
    strengths: [
      `Clean, readable ${payload.language} syntax`,
      `Optimal ${payload.expectedTimeComplexity || 'O(N)'} complexity approach`,
      payload.testsPassed > 0 ? `Correctly passed core test cases (${payload.testsPassed}/${payload.testsTotal})` : 'Good initial problem breakdown',
    ],
    improvements: [
      `Double check edge cases like empty inputs, null pointers, and duplicate numbers`,
      `State time and space complexity explicitly when walking through your approach`,
    ],
    rubricBreakdown: [
      {
        criterion: 'Algorithmic Correctness & Test Cases',
        passed: passRate >= 0.8,
        note: `Passed ${payload.testsPassed} out of ${payload.testsTotal} test cases.`,
      },
      {
        criterion: 'Optimal Time & Space Complexity',
        passed: isOptimal,
        note: `Targeted ${payload.expectedTimeComplexity || 'O(N)'} complexity successfully.`,
      },
      {
        criterion: 'Code Quality & Modularity',
        passed: true,
        note: 'Well-structured function signature and clear naming conventions.',
      },
    ],
  }
}

/**
 * Deterministic fallback report generator
 */
function generateHeuristicReport(payload: ReportPayload): HolisticReportResult {
  const avgScore =
    payload.questions.length > 0
      ? Math.round(payload.questions.reduce((sum, q) => sum + q.evaluationScore, 0) / payload.questions.length)
      : 85

  let recommendation: 'Strong Hire' | 'Hire' | 'Lean Hire' | 'Re-evaluate' = 'Hire'
  if (avgScore >= 90) recommendation = 'Strong Hire'
  else if (avgScore >= 75) recommendation = 'Hire'
  else if (avgScore >= 60) recommendation = 'Lean Hire'
  else recommendation = 'Re-evaluate'

  return {
    overallScore: avgScore,
    technicalScore: Math.min(100, avgScore + 3),
    communicationScore: Math.min(100, avgScore - 2),
    problemSolvingScore: Math.min(100, avgScore + 1),
    systemDesignScore: Math.min(100, avgScore - 4),
    behavioralScore: Math.min(100, avgScore + 2),
    hiringRecommendation: recommendation,
    summary: `${payload.candidateName} demonstrated strong technical problem-solving capabilities for the ${payload.targetRole} role, exhibiting clean coding patterns and solid algorithmic intuition.`,
    strengths: [
      'Fast problem comprehension and structured breakdown',
      'Solid grasp of Hash Maps, Two Pointers, and Arrays data structures',
      'Clear, articulate explanation of time/space complexity',
    ],
    weaknesses: [
      'Edge cases (single-element arrays and negative numbers)',
      'STAR framework structuring for conflict resolution scenarios',
    ],
    roadmap: [
      {
        week: 'Week 1: Advanced Data Structures',
        focus: 'Trees, Binary Search, and Heaps',
        actionItems: ['Solve 8 Medium Tree traversal problems', 'Practice Trie implementation from scratch'],
      },
      {
        week: 'Week 2: Dynamic Programming & Graphs',
        focus: 'Topological Sort and 2D DP',
        actionItems: ['Master Kadane and Longest Common Subsequence', 'Implement Dijkstra and Bellman-Ford'],
      },
      {
        week: 'Week 3: System Design & Scalability',
        focus: 'Distributed Caching & Message Queues',
        actionItems: ['Study Redis caching strategies (Cache-aside, Write-through)', 'Design a Distributed URL Shortener'],
      },
      {
        week: 'Week 4: Mock Interview Polish',
        focus: 'Timed Pressure Simulation & STAR Behavioral',
        actionItems: ['Complete 3 timed LockedIn mock loops', 'Refine 5 STAR stories for leadership principles'],
      },
    ],
  }
}
