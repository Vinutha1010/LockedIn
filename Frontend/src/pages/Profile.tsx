import { useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Flame,
  Award,
  BarChart3,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Layers,
  Shapes,
  Users,
  ArrowRight,
  Sparkles,
  Edit3,
  Save,
  Zap,
} from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import { useAuthStore } from '@/store/useAuthStore'
import { QUESTION_BANK } from '@/data/questions'
import { cn } from '@/lib/utils'

export const Profile: FC = () => {
  const { user, updateProfile } = useAuthStore()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || 'Alex Chen')
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Engineer (SDE)')
  const [bio, setBio] = useState(
    user?.bio ||
      'Full-stack developer preparing for Tier-1 product company coding rounds. Focused on Distributed Systems, Advanced DSA, and Patterns.'
  )
  const [savedSuccess, setSavedSuccess] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Guest Candidate</h2>
          <p className="text-xs text-slate-400">
            Sign in or activate a demo profile to track your interview scores and question mastery.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-bold text-xs"
          >
            Sign In / Demo Login
          </Link>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    updateProfile({ name, targetRole, bio })
    setIsEditing(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const domainSkills = [
    {
      domain: 'Data Structures & Algorithms',
      score: user.skillsRadar.dsa,
      count: '75 Problems',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      color: 'bg-cyan-500',
      track: 'dsa',
    },
    {
      domain: 'Pattern Programming & Logic',
      score: user.skillsRadar.patterns,
      count: '14 Patterns',
      icon: <Shapes className="w-4 h-4 text-pink-400" />,
      color: 'bg-pink-500',
      track: 'pattern-programming',
    },
    {
      domain: 'CS Fundamentals (OS/DBMS/Net)',
      score: user.skillsRadar.csFundamentals,
      count: '15 Core MCQs',
      icon: <Cpu className="w-4 h-4 text-indigo-400" />,
      color: 'bg-indigo-500',
      track: 'cs-fundamentals',
    },
    {
      domain: 'Practical Coding & JS Engine',
      score: user.skillsRadar.practicalCoding,
      count: '15 Coding MCQs',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      color: 'bg-emerald-500',
      track: 'coding',
    },
    {
      domain: 'Quantitative & Logical Aptitude',
      score: user.skillsRadar.aptitude,
      count: '70 MCQs',
      icon: <Users className="w-4 h-4 text-amber-400" />,
      color: 'bg-amber-500',
      track: 'aptitude',
    },
  ]

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pb-28">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[140px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px]" />
      </div>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Profile Banner */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-2 ring-cyan-500/50 shadow-xl"
                />
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">{user.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                    {user.seniority.toUpperCase()} LEVEL
                  </span>
                </div>
                <p className="text-xs text-cyan-400 font-mono">{user.targetRole}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-bold text-xs shadow-md transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Edit Form or Bio */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Candidate Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Target Role / Tier</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Bio & Interview Goal</label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">{user.bio}</p>
            )}

            {savedSuccess && (
              <div className="mt-2 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Profile updated successfully!</span>
              </div>
            )}
          </div>
        </section>

        {/* Overview Stat Counters */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: 'Mock Interviews Taken',
              value: user.totalInterviews,
              icon: <Award className="w-5 h-5 text-indigo-400" />,
              badge: 'Simulations',
            },
            {
              label: 'Problems Solved',
              value: user.totalQuestionsSolved,
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
              badge: `of ${QUESTION_BANK.length}`,
            },
            {
              label: 'Active Daily Streak',
              value: `${user.streakDays} Days`,
              icon: <Flame className="w-5 h-5 text-amber-400" />,
              badge: 'Consistent',
            },
            {
              label: 'Overall AI Readiness',
              value: `${Math.round(
                (user.skillsRadar.dsa +
                  user.skillsRadar.patterns +
                  user.skillsRadar.csFundamentals +
                  user.skillsRadar.practicalCoding +
                  user.skillsRadar.aptitude) /
                  5
              )}%`,
              icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
              badge: 'Top 15%',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono text-slate-400">{stat.badge}</span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-[11px] text-slate-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Skills Mastery Breakdown & Recent Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Domain Mastery */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span>Domain Mastery & Preparedness</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  AI-evaluated competency across the 5 core interview domains.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {domainSkills.map((d, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700">
                        {d.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{d.domain}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">{d.count}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-cyan-300">{d.score}%</span>
                      <Link
                        to={`/questions?track=${d.track}`}
                        className="text-[11px] font-semibold text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <span>Practice</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className={cn('h-full rounded-full transition-all duration-700', d.color)}
                      style={{ width: `${d.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Recent Completed Sessions */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                <span>Recent Mock Sessions</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Past simulations and AI feedback reports.
              </p>
            </div>

            <div className="space-y-3">
              {user.recentSessions.map((sess, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-2 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">{sess.date}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-[10px] font-bold">
                      Score: {sess.score}/100
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{sess.track}</h4>
                  <p className="text-[11px] text-slate-400">{sess.role}</p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-mono">
                      ⏱ {sess.durationMinutes} mins
                    </span>
                    <Link
                      to="/report"
                      className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>View Rubric Report</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  to="/"
                  className="w-full py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Launch New Interview Session</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
