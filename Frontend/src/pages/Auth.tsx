import { useState, type FC, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Flame,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { cn } from '@/lib/utils'

export const Auth: FC = () => {
  const navigate = useNavigate()
  const { login, register, demoLogin } = useAuthStore()

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [targetRole, setTargetRole] = useState('Software Engineer (SDE)')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (mode === 'signin') {
        if (!email) {
          setError('Please enter your email address.')
          setIsLoading(false)
          return
        }
        await login(email, password)
      } else {
        if (!name || !email) {
          setError('Please fill in your name and email.')
          setIsLoading(false)
          return
        }
        await register(name, email, targetRole, password)
      }
      navigate('/dashboard')
    } catch {
      setError('An error occurred during authentication. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoClick = (persona: 'sde' | 'frontend' | 'lead') => {
    demoLogin(persona)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[150px]" />
      </div>

      {/* Top Header */}
      <header className="px-6 sm:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            LockedIn
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          ← Back to App
        </Link>
      </header>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Value Props */}
        <div className="space-y-6 hidden md:block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Mock Interview Intelligence</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Master Technical Rounds with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
              Live AI Interviewers
            </span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            Practice algorithmic challenges in our sandboxed IDE, test pattern printing logic, and master core CS MCQs with real-time multi-dimensional scoring.
          </p>

          <div className="space-y-3 pt-2">
            {[
              {
                icon: <Code2 className="w-4 h-4 text-cyan-400" />,
                title: '191+ Structured Technical Questions',
                desc: 'DSA, Pattern Programming, CS Fundamentals, and Aptitude.',
              },
              {
                icon: <Zap className="w-4 h-4 text-emerald-400" />,
                title: 'Zero-Latency In-Browser Test Runner',
                desc: 'Automated test suite validation with instant execution time metrics.',
              },
              {
                icon: <ShieldCheck className="w-4 h-4 text-indigo-400" />,
                title: 'Gemini AI Rubric Evaluation',
                desc: 'Get strengths, weaknesses, and model answers tailored to your code.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <div className="p-2 rounded-lg bg-slate-800/80 shrink-0">{item.icon}</div>
                <div>
                  <div className="text-xs font-bold text-slate-200">{item.title}</div>
                  <div className="text-[11px] text-slate-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Auth Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-2xl shadow-2xl space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="flex p-1 rounded-2xl bg-slate-950/80 border border-slate-800/80">
            <button
              onClick={() => setMode('signin')}
              className={cn(
                'flex-1 py-2 rounded-xl text-xs font-bold transition-all',
                mode === 'signin'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={cn(
                'flex-1 py-2 rounded-xl text-xs font-bold transition-all',
                mode === 'signup'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-xs text-rose-300 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="Software Engineer (SDE)">Software Engineer (SDE)</option>
                  <option value="Frontend Engineer">Frontend Engineer (React/TypeScript)</option>
                  <option value="Backend / Systems Engineer">Backend / Systems Engineer</option>
                  <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                  <option value="Staff / Principal Architect">Staff / Principal Architect</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2"
            >
              <span>{mode === 'signin' ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Demo Login */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
            <div className="text-[11px] font-semibold text-slate-400 text-center uppercase tracking-wider">
              ⚡ Instant 1-Click Demo Personas
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoClick('sde')}
                className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/60 text-[11px] font-medium text-slate-300 hover:text-cyan-300 transition-all text-center"
              >
                <div className="font-bold">Alex Chen</div>
                <div className="text-[9px] text-slate-500">SDE Mid</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoClick('frontend')}
                className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/60 text-[11px] font-medium text-slate-300 hover:text-emerald-300 transition-all text-center"
              >
                <div className="font-bold">Sarah Connor</div>
                <div className="text-[9px] text-slate-500">Senior FE</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoClick('lead')}
                className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/60 text-[11px] font-medium text-slate-300 hover:text-purple-300 transition-all text-center"
              >
                <div className="font-bold">David Kim</div>
                <div className="text-[9px] text-slate-500">Lead Arch</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500">
        LockedIn AI • Next-Gen Technical Interview Intelligence Platform
      </footer>
    </div>
  )
}
