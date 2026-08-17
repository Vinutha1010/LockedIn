import { useState, useEffect, type FC } from 'react'
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Send,
  Lightbulb,
  FileEdit,
  Mic,
} from 'lucide-react'
import type { Question, AnswerFeedback } from '@/types'
import { cn } from '@/lib/utils'

interface MCQWorkspaceProps {
  question: Question
  feedback?: AnswerFeedback
  isEvaluating?: boolean
  candidateNotes?: string
  speechDraft?: string
  onSubmitAnswer: (payload: { selectedOption: string; notes?: string; speechText?: string }) => void
  onNotesChange?: (notes: string) => void
  isListening?: boolean
  onToggleSpeech?: () => void
}

export const MCQWorkspace: FC<MCQWorkspaceProps> = ({
  question,
  feedback,
  isEvaluating = false,
  candidateNotes = '',
  speechDraft = '',
  onSubmitAnswer,
  onNotesChange,
  isListening = false,
  onToggleSpeech,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState<boolean>(false)
  const [activeSubTab, setActiveSubTab] = useState<'options' | 'scratchpad'>('options')

  // Reset state on question change
  useEffect(() => {
    setSelectedOption('')
    setShowExplanation(false)
  }, [question.id])

  // Extract letter like 'A', 'B', 'C', 'D' from option string e.g. "A) 6.5 days"
  const getOptionLetter = (opt: string) => {
    const match = opt.match(/^([A-D])\)/i)
    return match ? match[1].toUpperCase() : ''
  }

  const getOptionText = (opt: string) => {
    return opt.replace(/^[A-D]\)\s*/i, '')
  }

  const isSubmitted = Boolean(feedback && feedback.status === 'completed')
  const correctLetter = question.correctAnswer ? question.correctAnswer.charAt(0).toUpperCase() : ''

  // Keyboard shortcut listener for A, B, C, D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return
      }
      const key = e.key.toUpperCase()
      if (['A', 'B', 'C', 'D'].includes(key) && question.options) {
        const matchingOpt = question.options.find((opt) => getOptionLetter(opt) === key)
        if (matchingOpt) {
          setSelectedOption(matchingOpt)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [question])

  const handleSubmit = () => {
    if (!selectedOption) return
    onSubmitAnswer({
      selectedOption,
      notes: candidateNotes,
      speechText: speechDraft,
    })
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0f18] text-slate-100 font-sans">
      {/* Top Bar for MCQ Workspace */}
      <div className="h-12 px-6 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-950/70 border border-amber-500/40 text-amber-300 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            Multiple Choice Question
          </span>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Category: <strong className="text-slate-200">{question.category}</strong>
          </span>
        </div>

        {/* Workspace Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('options')}
            className={cn(
              'px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
              activeSubTab === 'options'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Options & Questions</span>
          </button>
          <button
            onClick={() => setActiveSubTab('scratchpad')}
            className={cn(
              'px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
              activeSubTab === 'scratchpad'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Scratchpad & Notes</span>
            {candidateNotes && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
        {activeSubTab === 'options' ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Question Card */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-cyan-400 uppercase tracking-wider text-[11px]">
                  Problem Statement
                </span>
                <span className="text-slate-400 text-[11px]">Use keys (A, B, C, D) to select</span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                {question.description}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>Select Your Answer</span>
                <span className="text-[10px] text-slate-400 lowercase font-normal">(choose one)</span>
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {question.options?.map((option) => {
                  const letter = getOptionLetter(option)
                  const text = getOptionText(option)
                  const isSelected = selectedOption === option
                  const isCorrect = isSubmitted && letter === correctLetter
                  const isWrongSelected = isSubmitted && isSelected && letter !== correctLetter

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => !isEvaluating && setSelectedOption(option)}
                      className={cn(
                        'w-full text-left p-4 md:p-5 rounded-2xl border transition-all flex items-center gap-4 group relative overflow-hidden',
                        isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                          : isWrongSelected
                          ? 'bg-rose-950/60 border-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                          : isSelected
                          ? 'bg-indigo-950/70 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.25)] scale-[1.01]'
                          : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850/60'
                      )}
                    >
                      {/* Option Letter Badge */}
                      <div
                        className={cn(
                          'w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm border shrink-0 transition-all',
                          isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-md'
                            : isWrongSelected
                            ? 'bg-rose-500 text-white border-rose-400'
                            : isSelected
                            ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white border-cyan-400 shadow-md'
                            : 'bg-slate-950 text-slate-300 border-slate-800 group-hover:border-slate-700'
                        )}
                      >
                        {letter || '•'}
                      </div>

                      {/* Option Content */}
                      <span
                        className={cn(
                          'flex-1 text-sm md:text-base font-medium transition-colors',
                          isCorrect
                            ? 'text-emerald-200 font-bold'
                            : isWrongSelected
                            ? 'text-rose-200 font-semibold'
                            : isSelected
                            ? 'text-white font-bold'
                            : 'text-slate-300 group-hover:text-white'
                        )}
                      >
                        {text}
                      </span>

                      {/* Result Check/X Icon */}
                      {isCorrect && (
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span className="hidden sm:inline">Correct Answer</span>
                        </div>
                      )}
                      {isWrongSelected && (
                        <div className="flex items-center gap-1 text-xs font-bold text-rose-400 shrink-0">
                          <XCircle className="w-5 h-5 text-rose-400" />
                          <span className="hidden sm:inline">Your Selection</span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Submission Action Button */}
            <div className="flex items-center justify-between pt-2 gap-4 flex-wrap">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 py-2 transition-colors font-medium"
              >
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>{showExplanation ? 'Hide' : 'Reveal'} Step-by-Step Derivation</span>
              </button>

              <button
                onClick={handleSubmit}
                disabled={!selectedOption || isEvaluating}
                className={cn(
                  'flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg',
                  !selectedOption || isEvaluating
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                )}
              >
                {isEvaluating ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Evaluating...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit MCQ Choice</span>
                  </>
                )}
              </button>
            </div>

            {/* Step-by-Step Mathematical Explanation Accordion */}
            {(showExplanation || isSubmitted) && question.explanation && (
              <div className="p-6 rounded-3xl bg-indigo-950/30 border border-indigo-500/40 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Step-by-Step Solution & Mathematical Derivation
                  </h4>
                  {question.correctAnswer && (
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
                      Answer: {question.correctAnswer}
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-line bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Scratchpad & Notes View */
          <div className="max-w-3xl mx-auto space-y-4 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Mathematical Scratchpad & Working Notes</h3>
                <p className="text-xs text-slate-400">
                  Jot down formulas, fraction steps, or dictation notes for this question.
                </p>
              </div>

              {onToggleSpeech && (
                <button
                  onClick={onToggleSpeech}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all',
                    isListening
                      ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  )}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isListening ? 'Listening...' : 'Voice Dictate'}</span>
                </button>
              )}
            </div>

            <textarea
              value={candidateNotes}
              onChange={(e) => onNotesChange?.(e.target.value)}
              placeholder="Write your calculations step-by-step:
• Step 1: Initial values & given constraints...
• Step 2: Formula applied: Rate = Work / Time...
• Step 3: Calculation & simplification...
• Step 4: Final verification..."
              className="flex-1 min-h-[300px] w-full p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono resize-none leading-relaxed shadow-inner"
            />
          </div>
        )}
      </div>
    </div>
  )
}
