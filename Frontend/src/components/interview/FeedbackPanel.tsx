import type { FC } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Award,
  BookOpen,
  X,
  Loader2,
} from 'lucide-react'
import { useInterviewStore } from '@/store/useInterviewStore'
import { cn } from '@/lib/utils'

interface FeedbackPanelProps {
  onClose?: () => void
  className?: string
}

export const FeedbackPanel: FC<FeedbackPanelProps> = ({ onClose, className }) => {
  const { questions, currentQuestionIndex, feedbacks, sessionStatus } = useInterviewStore()
  const currentQ = questions[currentQuestionIndex]
  const feedback = currentQ ? feedbacks[currentQ.id] : undefined
  const isEvaluating = sessionStatus === 'evaluating' || feedback?.status === 'evaluating'

  if (!currentQ) {
    return null
  }

  const chartData = feedback
    ? [
        { subject: 'Technical Depth', score: feedback.technicalScore, fullMark: 100 },
        { subject: 'Communication', score: feedback.communicationScore, fullMark: 100 },
        { subject: 'Problem Solving', score: feedback.problemSolvingScore, fullMark: 100 },
        { subject: 'Code Quality', score: feedback.codeQualityScore || 85, fullMark: 100 },
        { subject: 'Speed & Structure', score: 90, fullMark: 100 },
      ]
    : []

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30'
    if (score >= 70) return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30'
    if (score >= 50) return 'text-amber-400 border-amber-500/40 bg-amber-950/30'
    return 'text-rose-400 border-rose-500/40 bg-rose-950/30'
  }

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-slate-900/95 border-l border-slate-800 backdrop-blur-xl text-slate-100 overflow-y-auto',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 sticky top-0 bg-slate-900/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-100">AI Evaluation & Insights</h3>
            <p className="text-[11px] text-slate-400">Question {currentQuestionIndex + 1} Analysis</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-6 flex-1">
        {isEvaluating ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="relative">
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
              <Sparkles className="w-4 h-4 text-indigo-400 absolute top-0 right-0 animate-bounce" />
            </div>
            <div>
              <h4 className="font-medium text-slate-200 text-sm">Synthesizing Answer Feedback...</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Analyzing technical precision, clarity, problem-solving trade-offs, and STAR structure.
              </p>
            </div>
          </div>
        ) : !feedback ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
            <div className="p-3 rounded-full bg-slate-800/60 border border-slate-700 text-slate-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-medium text-slate-300 text-sm">No Evaluation Yet</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Submit your answer or code for Question {currentQuestionIndex + 1} to trigger real-time AI scoring.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Score Overview Card */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-850/60 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Overall Score
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white tracking-tight">
                    {feedback.overallScore}
                  </span>
                  <span className="text-xs text-slate-400">/ 100</span>
                </div>
              </div>

              <div
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider',
                  getScoreColor(feedback.overallScore)
                )}
              >
                {feedback.overallScore >= 90
                  ? 'Strong Hire'
                  : feedback.overallScore >= 75
                  ? 'Hire'
                  : feedback.overallScore >= 60
                  ? 'Lean Hire'
                  : 'Needs Practice'}
              </div>
            </div>

            {/* Radar / Metrics Visualizer */}
            <div className="glass-panel p-3 rounded-xl border border-slate-800/80 bg-slate-850/40">
              <span className="text-xs font-medium text-slate-300 px-2 block mb-1">
                Skill Dimension Breakdown
              </span>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      stroke="#475569"
                      tick={{ fill: '#64748b', fontSize: 9 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Strengths */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4" />
                <span>Identified Strengths</span>
              </div>
              <div className="space-y-2">
                {feedback.strengths.map((st, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-200 leading-relaxed"
                  >
                    {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            {feedback.weaknesses.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wide">
                  <AlertCircle className="w-4 h-4" />
                  <span>Growth Areas</span>
                </div>
                <div className="space-y-2">
                  {feedback.weaknesses.map((w, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-slate-200 leading-relaxed"
                    >
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actionable Suggestions */}
            {feedback.suggestions.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                  <Lightbulb className="w-4 h-4" />
                  <span>Key Optimization Tips</span>
                </div>
                <div className="space-y-2">
                  {feedback.suggestions.map((sug, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-200 leading-relaxed"
                    >
                      {sug}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Model Answer Summary */}
            {feedback.modelAnswerSummary && (
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Model Answer Key Points</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {feedback.modelAnswerSummary}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
