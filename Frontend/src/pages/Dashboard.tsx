import { useState, type FC, type ReactNode } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Flame,
  Sparkles,
  Layers,
  Code,
  Users,
  Compass,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  BookOpen,
  BarChart3,
  Shapes,
} from 'lucide-react'
import { useInterviewStore } from '@/store/useInterviewStore'
import type { RoundType } from '@/types'
import { cn } from '@/lib/utils'

import { QUESTION_BANK } from '@/data/questions'

export const Dashboard: FC = () => {
  const navigate = useNavigate()
  const { initSession, startSession } = useInterviewStore()

  const [candidateName, setCandidateName] = useState('Alex Chen')
  const [targetRole, setTargetRole] = useState('Software Engineer (SDE)')
  const [selectedRound, setSelectedRound] = useState<RoundType>('dsa')

  const tracks: Array<{
    id: RoundType
    title: string
    icon: ReactNode
    description: string
    tag: string
    color: string
  }> = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      icon: <Code className="w-5 h-5" />,
      description: 'Arrays, HashMaps, Linked Lists, Stacks, Binary Trees & Kadane algorithms.',
      tag: 'Core DSA',
      color: 'from-cyan-500/20 to-indigo-500/10 border-cyan-500/40 text-cyan-400',
    },
    {
      id: 'cs-fundamentals',
      title: 'CS Fundamentals (OS, DBMS, Networks, OOPs)',
      icon: <Cpu className="w-5 h-5" />,
      description: 'Processes vs Threads, ACID & B+ Trees, TCP 3-way handshake, and 4 OOP pillars.',
      tag: 'Essential Core',
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/40 text-indigo-400',
    },
    {
      id: 'coding',
      title: 'Practical Coding & Problem Solving',
      icon: <Layers className="w-5 h-5" />,
      description: 'Sliding window, string manipulation, intervals, and clean code implementation.',
      tag: 'Hands-on Coding',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400',
    },
    {
      id: 'pattern-programming',
      title: 'Pattern Programming & Logic',
      icon: <Shapes className="w-5 h-5" />,
      description: 'Diamond, Pyramid, Pascal Triangle, Spiral Matrix, Floyd, and Checkerboard patterns.',
      tag: 'Logic & Loops',
      color: 'from-pink-500/20 to-rose-500/10 border-pink-500/40 text-pink-400',
    },
    {
      id: 'aptitude',
      title: 'Quantitative & Logical Aptitude',
      icon: <Users className="w-5 h-5" />,
      description: 'Time & Work, Probability, Clock angles, Speed-Distance, and Brainteasers.',
      tag: 'Screening Round',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400',
    },
  ]

  const handleLaunchSession = () => {
    const trackQuestions = QUESTION_BANK.filter((q) => q.roundType === selectedRound)
    const questionsToUse = trackQuestions.length > 0 ? trackQuestions : QUESTION_BANK.slice(0, 3)

    initSession({
      candidateName,
      targetRole,
      roundType: selectedRound,
      difficulty: 'medium',
      questions: questionsToUse,
      sessionStatus: 'in-progress',
      isTimerRunning: true,
      timeRemainingSeconds: questionsToUse.length * 15 * 60,
    })
    startSession()
    navigate('/interview')
  }

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-emerald-600/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="px-6 lg:px-12 py-5 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              LockedIn
            </h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-wide uppercase">
              AI Mock Interview Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/questions"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Question Bank</span>
          </Link>

          <Link
            to="/report"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Reports</span>
          </Link>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Calibration Active</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Technical Interview Practice</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Lock In Your Next{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
              Top-Tier Tech Offer
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Real-time simulated AI interviewer with dynamic follow-ups, Monaco code editor, voice
            synthesis, and dimensional rubric scoring.
          </p>

          {/* Quick link to Question Bank */}
          <div className="pt-2">
            <Link
              to="/questions"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-all shadow-md group"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Browse 16+ Curated Problems in Practice Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Configuration Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Track Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>1. Select Interview Track</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Choose the specialized domain to evaluate your problem solving and architecture skills.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => setSelectedRound(track.id)}
                  className={cn(
                    'p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden bg-slate-900/60 backdrop-blur-md',
                    selectedRound === track.id
                      ? `border-indigo-500 shadow-[0_0_25px_-5px_rgba(99,102,241,0.3)] bg-gradient-to-b ${track.color}`
                      : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850/60'
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200">
                      {track.icon}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] font-mono text-slate-300">
                      {track.tag}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white mb-1.5">{track.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{track.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Candidate Profile & Start Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/80 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>Session Parameters</span>
              </div>

              {/* Candidate Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Candidate Name</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="e.g. Alex Chen"
                />
              </div>

              {/* Target Role Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Role / Tier</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="e.g. Senior Fullstack Engineer"
                />
              </div>

              {/* Round Summary Card */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Duration</span>
                  <span className="text-slate-200 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> 45 Minutes
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Questions</span>
                  <span className="text-slate-200 font-mono">3 Problem Stages</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Feedback</span>
                  <span className="text-emerald-400 font-semibold">Real-Time Rubric</span>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={handleLaunchSession}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_-5px_rgba(99,102,241,0.5)] transform active:scale-98"
            >
              <span>Enter Interview Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
