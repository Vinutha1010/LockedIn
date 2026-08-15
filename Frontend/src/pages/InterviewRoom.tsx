import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Code2,
  FileText,
  Volume2,
  Flame,
  Send,
  PanelRightOpen,
  PanelRightClose,
  Flag,
  BarChart3,
  AlertTriangle,
  X,
} from 'lucide-react'
import { useInterviewStore } from '@/store/useInterviewStore'
import { Timer } from '@/components/interview/Timer'
import { FeedbackPanel } from '@/components/interview/FeedbackPanel'
import { cn } from '@/lib/utils'

export const InterviewRoom: FC = () => {
  const navigate = useNavigate()
  const {
    candidateName,
    targetRole,
    questions,
    currentQuestionIndex,
    sessionStatus,
    activeCode,
    activeLanguage,
    transcripts,
    feedbacks,
    isFeedbackPanelOpen,
    isAiSpeaking,
    isListening,
    candidateAudioEnabled,
    candidateVideoEnabled,
    nextQuestion,
    prevQuestion,
    setQuestionIndex,
    setActiveCode,
    setActiveLanguage,
    toggleAudio,
    toggleVideo,
    submitAnswer,
    toggleFeedbackPanel,
    addTranscript,
    setIsAiSpeaking,
    setIsListening,
    completeAndGenerateReport,
  } = useInterviewStore()

  const [activeTab, setActiveTab] = useState<'editor' | 'notes'>('editor')
  const [candidateSpeechDraft, setCandidateSpeechDraft] = useState('')
  const [isSimulatingVoice, setIsSimulatingVoice] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [activeHintIndex, setActiveHintIndex] = useState(0)
  const [showEndModal, setShowEndModal] = useState(false)

  const currentQ = questions[currentQuestionIndex]
  const currentFeedback = currentQ ? feedbacks[currentQ.id] : undefined
  const isEvaluating = sessionStatus === 'evaluating'

  // Voice simulation handler
  const handleSimulateSpeech = () => {
    if (isSimulatingVoice) return
    setIsSimulatingVoice(true)
    setIsListening(true)

    const simulatedPhrases = [
      "To optimize for high throughput, I'm employing the Token Bucket algorithm with atomic Redis Lua scripts...",
      "By maintaining token refill calculations in-memory, we can reduce Redis read/write roundtrips.",
      "In the event of a cache partition, the API Gateway will fail-open with local in-memory fallback counters.",
    ]

    let currentIdx = 0
    const interval = setInterval(() => {
      if (currentIdx < simulatedPhrases.length) {
        const phrase = simulatedPhrases[currentIdx]
        setCandidateSpeechDraft((prev) => (prev ? `${prev}\n${phrase}` : phrase))
        currentIdx++
      } else {
        clearInterval(interval)
        setIsSimulatingVoice(false)
        setIsListening(false)
      }
    }, 1200)
  }

  const handleInterviewerSpeak = () => {
    setIsAiSpeaking(true)
    setTimeout(() => {
      setIsAiSpeaking(false)
    }, 3500)
  }

  const handleSubmit = async () => {
    await submitAnswer({
      code: activeCode,
      language: activeLanguage,
      speechText: candidateSpeechDraft || 'Candidate presented architecture walk-through.',
    })
  }

  const languages = [
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'Go', value: 'go' },
  ]

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070b12] text-slate-100 overflow-hidden font-sans">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="h-14 px-5 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl flex items-center justify-between shrink-0 z-20">
        {/* Left: Brand & Round Meta */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)]">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              LockedIn
            </span>
          </div>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800/90 text-cyan-300 border border-slate-700/60 font-medium">
              {targetRole}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 capitalize font-medium">
              {currentQ?.roundType.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Center: Question Stepper & Timer */}
        <div className="flex items-center gap-4">
          {/* Question Step Pills */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 border border-slate-800">
            {questions.map((q, idx) => {
              const isAnswered = Boolean(feedbacks[q.id])
              const isCurrent = idx === currentQuestionIndex
              return (
                <button
                  key={q.id}
                  onClick={() => setQuestionIndex(idx)}
                  className={cn(
                    'w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold transition-all',
                    isCurrent
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)] scale-110'
                      : isAnswered
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  )}
                >
                  {isAnswered ? <CheckCircle className="w-3.5 h-3.5" /> : idx + 1}
                </button>
              )
            })}
          </div>

          <Timer />
        </div>

        {/* Right: AI Insights Toggle & Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => toggleFeedbackPanel()}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all',
              isFeedbackPanelOpen
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)]'
                : 'bg-slate-850/80 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden sm:inline">AI Feedback</span>
            {currentFeedback && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setShowEndModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-semibold transition-all hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
            title="Finish Interview & View Report"
          >
            <Flag className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Finish Loop</span>
          </button>

          <button
            onClick={() => toggleFeedbackPanel()}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Toggle Right Panel"
          >
            {isFeedbackPanelOpen ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* 2. MAIN SPLIT INTERVIEW WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT COLUMN: AVATAR / VIDEO & QUESTION PANEL (Width 400px - 440px) */}
        <div className="w-full md:w-[420px] lg:w-[450px] shrink-0 border-r border-slate-800/80 bg-slate-950/90 flex flex-col overflow-y-auto">
          {/* A. AVATAR / INTERVIEWER & CANDIDATE TILES */}
          <div className="p-4 grid grid-cols-2 gap-3 border-b border-slate-800/80 bg-slate-900/40">
            {/* AI Interviewer Tile */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900/90 flex flex-col justify-between p-2.5 shadow-inner">
              <div className="flex items-center justify-between z-10">
                <span className="px-2 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-500/30 text-[10px] font-semibold text-indigo-300 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  AI Interviewer
                </span>
                {isAiSpeaking && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                )}
              </div>

              {/* AI Avatar Graphic with Audio Wave */}
              <div className="flex flex-col items-center justify-center my-auto">
                <div
                  onClick={handleInterviewerSpeak}
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer',
                    isAiSpeaking
                      ? 'bg-indigo-600/30 border-2 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-105'
                      : 'bg-slate-800/90 border border-slate-700 hover:border-slate-500'
                  )}
                >
                  <Volume2
                    className={cn(
                      'w-6 h-6',
                      isAiSpeaking ? 'text-indigo-300 animate-pulse' : 'text-slate-400'
                    )}
                  />
                </div>

                {/* Animated Wave Bars */}
                {isAiSpeaking && (
                  <div className="flex items-center gap-1 mt-2 h-4">
                    {[40, 75, 100, 60, 85, 30, 90].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-cyan-400 rounded-full animate-wave-bar"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 z-10">
                <span>Sarah (Meta Lead AI)</span>
                <span className="text-cyan-400 font-mono">
                  {isAiSpeaking ? 'Speaking...' : 'Listening'}
                </span>
              </div>
            </div>

            {/* Candidate Webcam Tile */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900/90 flex flex-col justify-between p-2.5 shadow-inner">
              <div className="flex items-center justify-between z-10">
                <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-[10px] font-semibold text-slate-300">
                  {candidateName}
                </span>
                {isListening && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-[9px] text-emerald-400 font-mono">
                    MIC LIVE
                  </span>
                )}
              </div>

              {/* Video placeholder or fallback */}
              <div className="flex items-center justify-center my-auto">
                {candidateVideoEnabled ? (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 font-bold text-sm shadow-md">
                    {candidateName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                ) : (
                  <div className="text-center text-slate-500">
                    <VideoOff className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-[10px]">Camera Off</span>
                  </div>
                )}
              </div>

              {/* Media Controls */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleAudio}
                    className={cn(
                      'p-1 rounded-md transition-colors',
                      candidateAudioEnabled
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-rose-400 bg-rose-950/40 border border-rose-500/30'
                    )}
                    title={candidateAudioEnabled ? 'Mute Mic' : 'Unmute Mic'}
                  >
                    {candidateAudioEnabled ? (
                      <Mic className="w-3.5 h-3.5" />
                    ) : (
                      <MicOff className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={toggleVideo}
                    className={cn(
                      'p-1 rounded-md transition-colors',
                      candidateVideoEnabled
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-rose-400 bg-rose-950/40 border border-rose-500/30'
                    )}
                    title={candidateVideoEnabled ? 'Turn Off Video' : 'Turn On Video'}
                  >
                    {candidateVideoEnabled ? (
                      <Video className="w-3.5 h-3.5" />
                    ) : (
                      <VideoOff className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <button
                  onClick={handleSimulateSpeech}
                  disabled={isSimulatingVoice}
                  className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 text-[10px] font-medium transition-all"
                >
                  {isSimulatingVoice ? 'Transcribing...' : 'Simulate Mic'}
                </button>
              </div>
            </div>
          </div>

          {/* B. QUESTION DETAILS HUD */}
          <div className="p-5 space-y-4 flex-1">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-cyan-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] capitalize">
                  {currentQ?.difficulty}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white leading-snug tracking-tight">
                {currentQ?.title}
              </h2>
            </div>

            {/* Description */}
            <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/50">
              {currentQ?.description}
            </div>

            {/* Expected Complexity or Rubric Tags */}
            {currentQ?.expectedComplexity && (
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                  <span className="text-slate-500 block">Expected Time:</span>
                  <span className="font-mono text-cyan-300">
                    {currentQ.expectedComplexity.time}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                  <span className="text-slate-500 block">Expected Space:</span>
                  <span className="font-mono text-indigo-300">
                    {currentQ.expectedComplexity.space}
                  </span>
                </div>
              </div>
            )}

            {/* Hints Accordion */}
            {currentQ?.hints && currentQ.hints.length > 0 && (
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/30">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-300 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Hints & Rubric Criteria ({currentQ.hints.length})</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {showHints ? 'Hide' : 'Reveal'}
                  </span>
                </button>

                {showHints && (
                  <div className="p-3.5 border-t border-slate-800 space-y-2.5 bg-slate-950/40 text-xs">
                    <div className="flex gap-1 mb-2">
                      {currentQ.hints.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveHintIndex(i)}
                          className={cn(
                            'px-2 py-0.5 rounded text-[10px] font-mono transition-colors',
                            activeHintIndex === i
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-800 text-slate-400'
                          )}
                        >
                          Hint {i + 1}
                        </button>
                      ))}
                    </div>
                    <p className="text-slate-300 leading-relaxed bg-amber-950/10 border border-amber-500/20 p-2.5 rounded-lg text-amber-200/90">
                      {currentQ.hints[activeHintIndex]}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Live Transcript Snippet */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                <span>Live Transcript</span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-2 text-xs pr-1">
                {transcripts.map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      'p-2.5 rounded-lg border text-xs leading-relaxed',
                      t.speaker === 'ai'
                        ? 'bg-indigo-950/30 border-indigo-500/20 text-indigo-200'
                        : 'bg-slate-850 border-slate-700/60 text-slate-200'
                    )}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-semibold capitalize text-slate-300">
                        {t.speaker === 'ai' ? 'Interviewer' : candidateName}
                      </span>
                      <span>{t.timestamp}</span>
                    </div>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER/RIGHT: INTERACTIVE WORKSPACE (MONACO & SPEECH NOTES) */}
        <div className="flex-1 flex flex-col bg-[#0b0f17] overflow-hidden">
          {/* Workspace Tab Header */}
          <div className="h-11 px-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                  activeTab === 'editor'
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Code Editor</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                  activeTab === 'notes'
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Behavioral / STAR Notes</span>
              </button>
            </div>

            {activeTab === 'editor' && (
              <div className="flex items-center gap-2">
                <select
                  value={activeLanguage}
                  onChange={(e) => setActiveLanguage(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-md px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  {languages.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Active Workspace Viewport */}
          <div className="flex-1 relative overflow-hidden bg-[#0d1117]">
            {activeTab === 'editor' ? (
              <Editor
                height="100%"
                language={activeLanguage}
                value={activeCode}
                theme="vs-dark"
                onChange={(value) => setActiveCode(value || '')}
                options={{
                  fontSize: 13,
                  fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
                  fontLigatures: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 12, bottom: 12 },
                  tabSize: 2,
                  lineNumbers: 'on',
                  cursorBlinking: 'smooth',
                  smoothScrolling: true,
                }}
              />
            ) : (
              <div className="h-full p-5 flex flex-col space-y-3 bg-slate-950/60 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    STAR Response Framework Draft
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Supports voice simulation & manual markdown
                  </span>
                </div>
                <textarea
                  value={candidateSpeechDraft}
                  onChange={(e) => setCandidateSpeechDraft(e.target.value)}
                  placeholder="Record or draft your verbal explanation here:
• Situation: Context of the architecture or challenge...
• Task: Key objective & constraints...
• Action: How you designed, coded, or solved it...
• Result: Concrete outcome, metrics, and reflections..."
                  className="flex-1 w-full p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono resize-none leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* 3. WORKSPACE FOOTER / ACTIONS BAR */}
          <div className="h-16 px-5 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md flex items-center justify-between shrink-0 z-10">
            {/* Left: Prev / Next Question Nav */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Submit & Evaluation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  addTranscript(
                    'ai',
                    `Hint for Question ${currentQuestionIndex + 1}: ${currentQ?.hints?.[0] || 'Focus on breaking down the time and space trade-offs.'}`
                  )
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Request AI Hint
              </button>

              <button
                onClick={() => setShowEndModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all"
              >
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Finish & View Report</span>
              </button>

              <button
                onClick={handleSubmit}
                disabled={isEvaluating}
                className={cn(
                  'flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-xs text-white transition-all shadow-lg',
                  isEvaluating
                    ? 'bg-indigo-900/60 border border-indigo-500/40 cursor-wait'
                    : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 shadow-[0_0_20px_-3px_rgba(6,182,212,0.4)]'
                )}
              >
                {isEvaluating ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Evaluating Solution...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit for AI Evaluation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT DRAWER: FEEDBACK & METRICS PANEL (380px) */}
        {isFeedbackPanelOpen && (
          <div className="w-[380px] lg:w-[420px] shrink-0 border-l border-slate-800 z-20">
            <FeedbackPanel onClose={() => toggleFeedbackPanel(false)} />
          </div>
        )}
      </div>

      {/* 3. FINISH INTERVIEW CONFIRMATION MODAL */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowEndModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Complete Mock Interview?</h3>
                <p className="text-xs text-slate-400">Generate executive score & hiring report</p>
              </div>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 mb-5 space-y-2.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Questions Answered:</span>
                <span className="font-semibold text-cyan-400">
                  {Object.keys(feedbacks).length} / {questions.length}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.max(5, (Object.keys(feedbacks).length / questions.length) * 100)}%`,
                  }}
                />
              </div>

              <div className="space-y-1.5 pt-1">
                {questions.map((q, idx) => {
                  const answered = Boolean(feedbacks[q.id])
                  return (
                    <div key={q.id} className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="truncate max-w-[240px]">Q{idx + 1}: {q.title}</span>
                      {answered ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Submitted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-400/80">
                          <AlertTriangle className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Ending the session will synthesize all your code, STAR speech responses, and rubric scores into a comprehensive multi-dimensional report with PDF download.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEndModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Continue Practicing
              </button>
              <button
                onClick={() => {
                  setShowEndModal(false)
                  const report = completeAndGenerateReport()
                  navigate(`/report/${report.sessionId}`)
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
