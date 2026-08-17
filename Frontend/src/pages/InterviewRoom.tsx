import { useState, useEffect, useRef, type FC } from 'react'
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
  VolumeX,
  Flame,
  Send,
  PanelRightOpen,
  PanelRightClose,
  Flag,
  BarChart3,
  AlertTriangle,
  X,
  Settings2,
  Square,
  Play,
} from 'lucide-react'
import { useInterviewStore } from '@/store/useInterviewStore'
import { Timer } from '@/components/interview/Timer'
import { FeedbackPanel } from '@/components/interview/FeedbackPanel'
import { AudioVisualizer } from '@/components/interview/AudioVisualizer'
import { SpeechControls } from '@/components/interview/SpeechControls'
import { VoiceSettingsModal } from '@/components/interview/VoiceSettingsModal'
import { CodeRunnerPanel } from '@/components/interview/CodeRunnerPanel'
import { MCQWorkspace } from '@/components/interview/MCQWorkspace'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { useCameraStream } from '@/hooks/useCameraStream'
import { useAudioVisualizer } from '@/hooks/useAudioVisualizer'
import { executeCodeAgainstTestCases } from '@/lib/codeRunner'
import { getStarterCodeForLanguage } from '@/lib/templates'
import { soundEffects } from '@/lib/soundEffects'
import type { TestExecutionResult } from '@/types'
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
    candidateAudioEnabled,
    candidateVideoEnabled,
    candidateNotes,
    speechRate = 1.0,
    autoSpeakQuestions = false,
    soundEffectsEnabled = true,
    selectedVoiceURI: storeSelectedVoiceURI,
    nextQuestion,
    prevQuestion,
    setQuestionIndex,
    setActiveCode,
    setActiveLanguage,
    setCandidateNotes,
    setVoiceSettings,
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
  const [candidateSpeechDraft, setCandidateSpeechDraft] = useState(candidateNotes || '')
  const [isSimulatingVoice, setIsSimulatingVoice] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [activeHintIndex, setActiveHintIndex] = useState(0)
  const [showEndModal, setShowEndModal] = useState(false)
  const [showVoiceSettings, setShowVoiceSettings] = useState(false)
  const [isTestingVoice, setIsTestingVoice] = useState(false)

  // 5. Code runner state
  const [isRunningCode, setIsRunningCode] = useState(false)
  const [testResults, setTestResults] = useState<TestExecutionResult[]>([])
  const [runnerLogs, setRunnerLogs] = useState<string[]>([])
  const [runnerExecutionTime, setRunnerExecutionTime] = useState<number | undefined>(undefined)
  const [runnerCompileError, setRunnerCompileError] = useState<string | undefined>(undefined)
  const [isRunnerPanelExpanded, setIsRunnerPanelExpanded] = useState(false)

  const currentQ = questions[currentQuestionIndex]

  const isCurrentMCQ = Boolean(
    currentQ &&
      (currentQ.type === 'mcq' ||
        currentQ.roundType === 'aptitude' ||
        (currentQ.options && currentQ.options.length > 0))
  )

  // Reset runner output on question change
  useEffect(() => {
    setTestResults([])
    setRunnerLogs([])
    setRunnerCompileError(undefined)
    setRunnerExecutionTime(undefined)
  }, [currentQuestionIndex])

  const currentFeedback = currentQ ? feedbacks[currentQ.id] : undefined
  const isEvaluating = sessionStatus === 'evaluating'

  // 1. Web Speech Synthesis (AI Interviewer Voice)
  const {
    isSpeaking: isSynthSpeaking,
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    speak: speakText,
    stop: stopSpeaking,
  } = useSpeechSynthesis({
    rate: speechRate,
    onStart: () => setIsAiSpeaking(true),
    onEnd: () => setIsAiSpeaking(false),
  })

  // Sync selected voice from store
  useEffect(() => {
    if (storeSelectedVoiceURI && storeSelectedVoiceURI !== selectedVoiceURI) {
      setSelectedVoiceURI(storeSelectedVoiceURI)
    }
  }, [storeSelectedVoiceURI, selectedVoiceURI, setSelectedVoiceURI])

  // 2. Camera Stream Hook
  const {
    videoRef,
    startStream: startCamera,
    stopStream: stopCamera,
  } = useCameraStream(false)

  // Handle Camera toggling
  useEffect(() => {
    if (candidateVideoEnabled) {
      startCamera()
    } else {
      stopCamera()
    }
  }, [candidateVideoEnabled, startCamera, stopCamera])

  // 3. Audio Frequency Visualizer Hook
  const {
    frequencyData: micFrequencyData,
    startVisualizer,
    stopVisualizer,
  } = useAudioVisualizer({ barsCount: 7 })

  // 4. Speech Recognition (Candidate Voice-to-Text)
  const {
    isSupported: isSpeechRecognitionSupported,
    isListening: isRecListening,
    interimTranscript,
    error: speechRecError,
    startListening: startSpeechRec,
    stopListening: stopSpeechRec,
    resetTranscript: resetSpeechRec,
  } = useSpeechRecognition({
    onTranscriptUpdate: (newText, isFinal) => {
      if (isFinal && newText) {
        setCandidateSpeechDraft((prev) => {
          const updated = prev ? `${prev.trim()}\n${newText.trim()}` : newText.trim()
          setCandidateNotes(updated)
          return updated
        })
      }
    },
  })

  // Sync listening state with store & visualizer
  useEffect(() => {
    setIsListening(isRecListening)
    if (isRecListening && candidateAudioEnabled) {
      startVisualizer()
    } else if (!isRecListening) {
      stopVisualizer()
    }
  }, [isRecListening, candidateAudioEnabled, setIsListening, startVisualizer, stopVisualizer])

  // Auto-speak question prompt when advancing stages if enabled
  const prevQuestionIndexRef = useRef(currentQuestionIndex)
  useEffect(() => {
    if (
      autoSpeakQuestions &&
      currentQ &&
      prevQuestionIndexRef.current !== currentQuestionIndex
    ) {
      prevQuestionIndexRef.current = currentQuestionIndex
      const promptToRead = `Question ${currentQuestionIndex + 1}: ${currentQ.title}. ${currentQ.description.slice(0, 300)}`
      speakText(promptToRead)
    } else {
      prevQuestionIndexRef.current = currentQuestionIndex
    }
  }, [currentQuestionIndex, autoSpeakQuestions, currentQ, speakText])

  // Execute code against test cases
  const handleRunCode = async () => {
    if (!currentQ) return
    setIsRunningCode(true)
    setIsRunnerPanelExpanded(true)
    setRunnerCompileError(undefined)

    try {
      const execution = await executeCodeAgainstTestCases(
        activeCode,
        currentQ.functionName || 'twoSum',
        currentQ.testCases || [],
        activeLanguage
      )

      setTestResults(execution.results)
      setRunnerLogs(execution.logs)
      setRunnerExecutionTime(execution.totalExecutionTimeMs)
      setRunnerCompileError(execution.compileError)

      if (execution.allPassed && soundEffectsEnabled) {
        soundEffects.playSuccessSubmission()
      }
    } catch (err: any) {
      setRunnerCompileError(err.message || 'Execution error')
    } finally {
      setIsRunningCode(false)
    }
  }

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter to Run Code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        handleRunCode()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeCode, currentQ, soundEffectsEnabled])

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking()
      stopSpeechRec()
      stopCamera()
      stopVisualizer()
    }
  }, [stopSpeaking, stopSpeechRec, stopCamera, stopVisualizer])

  // Read current question prompt aloud
  const handleReadPrompt = () => {
    if (isSynthSpeaking) {
      stopSpeaking()
      return
    }
    if (!currentQ) return
    const textToSpeak = `${currentQ.title}. ${currentQ.description}`
    speakText(textToSpeak)
  }

  // Read current hint aloud
  const handleReadHint = (hintText: string) => {
    if (isSynthSpeaking) {
      stopSpeaking()
      return
    }
    speakText(`Here is a hint: ${hintText}`)
  }

  // Test Voice Sample
  const handleTestVoice = () => {
    setIsTestingVoice(true)
    speakText(
      "Hello! I'm Sarah, your AI interviewer. I'm excited to evaluate your technical and behavioral skills today.",
      {
        onEnd: () => setIsTestingVoice(false),
      }
    )
  }

  // Voice simulation handler (fallback)
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
        setCandidateSpeechDraft((prev) => {
          const updated = prev ? `${prev}\n${phrase}` : phrase
          setCandidateNotes(updated)
          return updated
        })
        currentIdx++
      } else {
        clearInterval(interval)
        setIsSimulatingVoice(false)
        setIsListening(false)
      }
    }, 1200)
  }

  const handleSubmit = async () => {
    stopSpeaking()
    if (isRecListening) {
      stopSpeechRec()
    }
    await submitAnswer({
      code: activeCode,
      language: activeLanguage,
      speechText: candidateSpeechDraft || 'Candidate presented architecture walk-through.',
    })
  }

  const handleAppendToEditor = () => {
    if (!candidateSpeechDraft) return
    const commentPrefix =
      activeLanguage === 'python' ? '# ' : activeLanguage === 'sql' ? '-- ' : '// '
    const formattedComment = candidateSpeechDraft
      .split('\n')
      .map((line) => `${commentPrefix}${line}`)
      .join('\n')

    setActiveCode(`${activeCode}\n\n/* Architecture & Verbal Explanation */\n${formattedComment}`)
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
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-transform">
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

        {/* Right: Audio Settings, AI Insights Toggle & Finish */}
        <div className="flex items-center gap-2.5">
          {/* Voice Settings Button */}
          <button
            onClick={() => setShowVoiceSettings(true)}
            className="p-2 rounded-lg bg-slate-850/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
            title="Audio & AI Voice Settings"
          >
            <Settings2 className="w-4 h-4 text-cyan-400" />
          </button>

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

              {/* AI Avatar Graphic with Synchronized Audio Wave */}
              <div className="flex flex-col items-center justify-center my-auto">
                <div
                  onClick={handleReadPrompt}
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer group',
                    isAiSpeaking
                      ? 'bg-indigo-600/30 border-2 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-105'
                      : 'bg-slate-800/90 border border-slate-700 hover:border-indigo-400 hover:bg-slate-800'
                  )}
                  title={isAiSpeaking ? 'Click to Stop Speaking' : 'Click to Read Question Aloud'}
                >
                  {isAiSpeaking ? (
                    <Square className="w-5 h-5 text-indigo-300 fill-indigo-300 animate-pulse" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                  )}
                </div>

                {/* Animated Wave Bars */}
                <div className="mt-2 h-4 flex items-center justify-center">
                  <AudioVisualizer
                    isActive={isAiSpeaking}
                    colorScheme="indigo"
                    heightClass="h-4"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 z-10">
                <span>Sarah (Meta Lead AI)</span>
                <span className="text-cyan-400 font-mono">
                  {isAiSpeaking ? 'Speaking...' : 'Listening'}
                </span>
              </div>
            </div>

            {/* Candidate Webcam / Audio Tile */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900/90 flex flex-col justify-between p-2.5 shadow-inner">
              <div className="flex items-center justify-between z-10">
                <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-[10px] font-semibold text-slate-300">
                  {candidateName}
                </span>
                {(isRecListening || isSimulatingVoice) && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                )}
              </div>

              {/* Video Element OR Fallback Initial Avatar */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {candidateVideoEnabled ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-slate-500 my-auto">
                    <VideoOff className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                    <span className="text-[10px]">Camera Off</span>
                  </div>
                )}
              </div>

              {/* Wave visualizer overlay when mic active */}
              {(isRecListening || isSimulatingVoice) && (
                <div className="absolute inset-x-0 bottom-8 flex justify-center z-10 pointer-events-none">
                  <div className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-emerald-500/30">
                    <AudioVisualizer
                      isActive={true}
                      frequencies={micFrequencyData}
                      colorScheme="emerald"
                      heightClass="h-3"
                    />
                  </div>
                </div>
              )}

              {/* Media Controls */}
              <div className="flex items-center justify-between z-10 mt-auto pt-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      toggleAudio()
                      if (isRecListening) {
                        stopSpeechRec()
                      }
                    }}
                    className={cn(
                      'p-1 rounded-md transition-colors backdrop-blur-sm',
                      candidateAudioEnabled
                        ? 'text-slate-300 hover:bg-slate-800 bg-slate-900/60'
                        : 'text-rose-400 bg-rose-950/70 border border-rose-500/30'
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
                      'p-1 rounded-md transition-colors backdrop-blur-sm',
                      candidateVideoEnabled
                        ? 'text-slate-300 hover:bg-slate-800 bg-slate-900/60'
                        : 'text-rose-400 bg-rose-950/70 border border-rose-500/30'
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
                  onClick={isRecListening ? stopSpeechRec : startSpeechRec}
                  disabled={!candidateAudioEnabled}
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-semibold transition-all backdrop-blur-sm',
                    isRecListening
                      ? 'bg-rose-600 text-white animate-pulse border border-rose-400'
                      : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80'
                  )}
                >
                  {isRecListening ? 'Recording' : 'Dictate'}
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
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-bold text-white leading-snug tracking-tight">
                  {currentQ?.title}
                </h2>
                <button
                  onClick={handleReadPrompt}
                  className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-colors shrink-0"
                  title={isAiSpeaking ? 'Stop Reading' : 'Read Prompt Aloud'}
                >
                  {isAiSpeaking ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
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
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className="flex gap-1">
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

                      <button
                        onClick={() => handleReadHint(currentQ.hints![activeHintIndex])}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:text-amber-300 transition-colors"
                        title="Read Hint Aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
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
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Live Transcript</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  {transcripts.length} exchanges
                </span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-2 text-xs pr-1">
                {transcripts.map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      'p-2.5 rounded-lg border text-xs leading-relaxed group relative',
                      t.speaker === 'ai'
                        ? 'bg-indigo-950/30 border-indigo-500/20 text-indigo-200'
                        : 'bg-slate-850 border-slate-700/60 text-slate-200'
                    )}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-semibold capitalize text-slate-300">
                        {t.speaker === 'ai' ? 'Interviewer' : candidateName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>{t.timestamp}</span>
                        {t.speaker === 'ai' && (
                          <button
                            onClick={() => speakText(t.text)}
                            className="text-slate-400 hover:text-cyan-300 transition-colors"
                            title="Replay Voice"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER/RIGHT: INTERACTIVE WORKSPACE (MCQ WORKSPACE OR MONACO & SPEECH NOTES) */}
        <div className="flex-1 flex flex-col bg-[#0b0f17] overflow-hidden">
          {isCurrentMCQ && currentQ ? (
            <MCQWorkspace
              question={currentQ}
              feedback={currentFeedback}
              isEvaluating={isEvaluating}
              candidateNotes={candidateNotes}
              speechDraft={candidateSpeechDraft}
              onNotesChange={(notes) => {
                setCandidateNotes(notes)
                setCandidateSpeechDraft(notes)
              }}
              onSubmitAnswer={async (payload) => {
                stopSpeaking()
                if (isRecListening) stopSpeechRec()
                await submitAnswer({
                  selectedOption: payload.selectedOption,
                  code: payload.notes,
                  speechText: payload.speechText,
                })
              }}
              isListening={isRecListening}
              onToggleSpeech={() => {
                if (isRecListening) stopSpeechRec()
                else startSpeechRec()
              }}
            />
          ) : (
            <>
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
                    {candidateSpeechDraft && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </button>
                </div>

                {activeTab === 'editor' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRunCode}
                      disabled={isRunningCode}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm',
                        isRunningCode
                          ? 'bg-slate-800 text-slate-400 cursor-wait'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                      )}
                      title="Run code against test cases (Ctrl + Enter)"
                    >
                      {isRunningCode ? (
                        <>
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Running...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-white" />
                          <span>Run Tests</span>
                        </>
                      )}
                    </button>

                    <select
                      value={activeLanguage}
                      onChange={(e) => {
                        const newLang = e.target.value
                        setActiveLanguage(newLang)
                        if (currentQ) {
                          const template = getStarterCodeForLanguage(currentQ, newLang)
                          setActiveCode(template)
                        }
                      }}
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
              <div className="flex-1 relative overflow-hidden bg-[#0d1117] flex flex-col">
                {activeTab === 'editor' ? (
                  <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <div className="flex-1 relative overflow-hidden">
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
                    </div>

                    {/* Bottom Test Cases & Console Runner Panel */}
                    <CodeRunnerPanel
                      testCases={currentQ?.testCases}
                      results={testResults}
                      isRunning={isRunningCode}
                      logs={runnerLogs}
                      totalExecutionTimeMs={runnerExecutionTime}
                      compileError={runnerCompileError}
                      onRunCode={handleRunCode}
                      isExpanded={isRunnerPanelExpanded}
                      onToggleExpand={() => setIsRunnerPanelExpanded(!isRunnerPanelExpanded)}
                    />
                  </div>
                ) : (
                  <div className="h-full p-5 flex flex-col space-y-4 bg-slate-950/60 overflow-y-auto">
                    {/* Speech Dictation Toolbar */}
                    <SpeechControls
                      isSupported={isSpeechRecognitionSupported}
                      isListening={isRecListening}
                      interimTranscript={interimTranscript}
                      speechDraft={candidateSpeechDraft}
                      onStartListening={startSpeechRec}
                      onStopListening={stopSpeechRec}
                      onClearDraft={() => {
                        setCandidateSpeechDraft('')
                        setCandidateNotes('')
                        resetSpeechRec()
                      }}
                      onInsertToEditor={handleAppendToEditor}
                      onSimulateSpeech={handleSimulateSpeech}
                      isSimulatingVoice={isSimulatingVoice}
                      visualizerFrequencies={micFrequencyData}
                      errorMessage={speechRecError}
                    />

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-semibold text-slate-300">
                        STAR Framework Response Notes
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Auto-transcribed & editable
                      </span>
                    </div>

                    <textarea
                      value={candidateSpeechDraft}
                      onChange={(e) => {
                        setCandidateSpeechDraft(e.target.value)
                        setCandidateNotes(e.target.value)
                      }}
                      placeholder="Record or type your structured response:
• Situation: Context of the system, challenge, or team dynamic...
• Task: Goal, constraints, throughput requirements...
• Action: Architecture choices, algorithm implementation, edge cases handled...
• Result: Concrete performance metrics, trade-offs, and lessons learned..."
                      className="flex-1 min-h-[220px] w-full p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono resize-none leading-relaxed shadow-inner"
                    />
                  </div>
                )}
              </div>
            </>
          )}

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

            {/* Right: Run Code & Submit & Evaluation */}
            <div className="flex items-center gap-2.5">
              {!isCurrentMCQ && (
                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-all shadow-sm"
                  title="Run test cases (Ctrl + Enter)"
                >
                  <Play className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Run Tests</span>
                </button>
              )}

              <button
                onClick={() => {
                  const hintText = currentQ?.hints?.[0] || 'Focus on breaking down the time and space trade-offs.'
                  addTranscript(
                    'ai',
                    `Hint for Question ${currentQuestionIndex + 1}: ${hintText}`
                  )
                  speakText(`Here is a hint: ${hintText}`)
                }}
                className="px-3 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Request AI Hint</span>
              </button>

              <button
                onClick={() => setShowEndModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all"
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

      {/* 3. VOICE & AUDIO SETTINGS MODAL */}
      <VoiceSettingsModal
        isOpen={showVoiceSettings}
        onClose={() => setShowVoiceSettings(false)}
        voices={voices}
        selectedVoiceURI={selectedVoiceURI}
        onSelectVoice={(uri) => {
          setSelectedVoiceURI(uri)
          setVoiceSettings({ voiceURI: uri })
        }}
        speechRate={speechRate}
        onChangeSpeechRate={(rate) => setVoiceSettings({ speechRate: rate })}
        autoSpeakQuestions={autoSpeakQuestions}
        onToggleAutoSpeak={(autoSpeak) => setVoiceSettings({ autoSpeakQuestions: autoSpeak })}
        soundEffectsEnabled={soundEffectsEnabled}
        onToggleSoundEffects={(sfx) => setVoiceSettings({ soundEffectsEnabled: sfx })}
        onTestVoice={handleTestVoice}
        isTestingVoice={isTestingVoice}
      />

      {/* 4. FINISH INTERVIEW CONFIRMATION MODAL */}
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
