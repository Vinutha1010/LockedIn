import { useState, type FC, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Award,
} from 'lucide-react'
import { useInterviewStore } from '@/store/useInterviewStore'
import type { RoundType, Difficulty } from '@/types'
import { cn } from '@/lib/utils'

export const Dashboard: FC = () => {
  const navigate = useNavigate()
  const { initSession, startSession } = useInterviewStore()

  const [candidateName, setCandidateName] = useState('Alex Chen')
  const [targetRole, setTargetRole] = useState('Senior Fullstack Engineer')
  const [selectedRound, setSelectedRound] = useState<RoundType>('system-design')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('senior')

  const tracks: Array<{
    id: RoundType
    title: string
    icon: ReactNode
    description: string
    tag: string
    color: string
  }> = [
    {
      id: 'system-design',
      title: 'Distributed System Design',
      icon: <Cpu className="w-5 h-5" />,
      description: 'Microservices, caching, sharding, consensus, rate limiters & scaling.',
      tag: 'FAANG Favorite',
      color: 'from-cyan-500/20 to-indigo-500/10 border-cyan-500/40 text-cyan-400',
    },
    {
      id: 'coding',
      title: 'Data Structures & Algorithms',
      icon: <Code className="w-5 h-5" />,
      description: 'Dynamic programming, graphs, trees, two pointers with Monaco IDE.',
      tag: 'Live Execution',
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/40 text-indigo-400',
    },
    {
      id: 'behavioral',
      title: 'STAR Behavioral & Leadership',
      icon: <Users className="w-5 h-5" />,
      description: 'Conflict resolution, leadership principles, system trade-off defense.',
      tag: 'Voice & AI Scoring',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400',
    },
    {
      id: 'technical',
      title: 'Full Technical Loop',
      icon: <Layers className="w-5 h-5" />,
      description: 'Comprehensive 45-minute multi-part interview simulating principal loop.',
      tag: 'Full Simulation',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400',
    },
  ]

  const difficulties: Array<{ id: Difficulty; label: string; exp: string }> = [
    { id: 'junior', label: 'Junior / Entry', exp: '0-2 Yrs' },
    { id: 'mid', label: 'Mid-Level', exp: '2-5 Yrs' },
    { id: 'senior', label: 'Senior', exp: '5-8 Yrs' },
    { id: 'lead', label: 'Staff / Principal', exp: '8+ Yrs' },
  ]

  const handleLaunchSession = () => {
    initSession({
      candidateName,
      targetRole,
      roundType: selectedRound,
      difficulty: selectedDifficulty,
      sessionStatus: 'in-progress',
      isTimerRunning: true,
      timeRemainingSeconds: 2700,
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
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
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

            {/* Seniority / Difficulty */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>2. Seniority Level</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {difficulties.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all',
                      selectedDifficulty === diff.id
                        ? 'border-cyan-500 bg-cyan-950/30 text-white shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    )}
                  >
                    <div className="text-xs font-bold text-slate-200">{diff.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{diff.exp}</div>
                  </button>
                ))}
              </div>
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
