import { useState, useRef, useEffect, type FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  BarChart3,
  User,
  LogOut,
  LogIn,
  ChevronDown,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { cn } from '@/lib/utils'

export const Navbar: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout, demoLogin } = useAuthStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { label: 'Dashboard', path: '/', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: 'Question Bank', path: '/questions', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: 'Reports', path: '/report', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { label: 'Profile', path: '/profile', icon: <User className="w-3.5 h-3.5" /> },
  ]

  return (
    <header className="px-4 sm:px-8 lg:px-12 py-3.5 border-b border-slate-800/80 bg-[#070b12]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40 transition-all">
      {/* Brand / Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-500/40 group-hover:scale-105 transition-transform bg-[#070b12]">
          <img src="/logo.jpg" alt="LockedIn Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
              LockedIn
            </h1>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-widest">
              AI
            </span>
          </div>
          <p className="text-[10px] text-cyan-400 font-mono tracking-wide uppercase">
            Mock Interview Intelligence
          </p>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-slate-800/80">
        {navLinks.map((link) => {
          const isActive =
            link.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.path)

          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User / Auth Pill */}
      <div className="flex items-center gap-3">
        {isAuthenticated && user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 transition-all text-left group"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-500/50"
              />
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">
                  {user.targetRole}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 ml-0.5" />
            </button>

            {/* Profile Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 border border-slate-700/90 shadow-2xl p-2.5 space-y-1.5 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 z-50">
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="text-xs font-bold text-white">{user.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-cyan-400 pt-1.5 border-t border-slate-800/80">
                    <span>🔥 {user.streakDays} Days Streak</span>
                    <span>{user.totalQuestionsSolved} Solved</span>
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>My Profile & Skills Radar</span>
                </Link>

                <Link
                  to="/questions"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Browse Question Bank</span>
                </Link>

                <Link
                  to="/report"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>AI Evaluation Reports</span>
                </Link>

                <div className="pt-1 border-t border-slate-800/80">
                  <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Switch Demo Persona
                  </div>
                  <div className="grid grid-cols-2 gap-1 px-1 py-1">
                    <button
                      onClick={() => {
                        demoLogin('frontend')
                        setDropdownOpen(false)
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-left"
                    >
                      Sarah (Frontend)
                    </button>
                    <button
                      onClick={() => {
                        demoLogin('lead')
                        setDropdownOpen(false)
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-purple-300 text-left"
                    >
                      David (Lead Arch)
                    </button>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      logout()
                      setDropdownOpen(false)
                      navigate('/login')
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sign In</span>
            </Link>
            <button
              onClick={() => demoLogin('sde')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <Zap className="w-3.5 h-3.5 text-black fill-black" />
              <span>1-Click Demo</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
