import { useState, type FC } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import {
  Flame,
  Printer,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Award,
  BookOpen,
  Code2,
  MessageSquare,
  Clock,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Check,
  Zap,
  TrendingUp,
  ShieldCheck,
  Cpu,
} from 'lucide-react'
import { useInterviewStore } from '@/store/useInterviewStore'
import type { SessionReport, HiringDecision } from '@/types'
import { cn } from '@/lib/utils'

export const Report: FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const { currentReport, getReportById, completeAndGenerateReport } = useInterviewStore()

  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'transcripts'>('overview')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Retrieve report from store / local storage / fallback
  const resolvedReport = (sessionId ? getReportById(sessionId) : null) || currentReport || completeAndGenerateReport()
  const report: SessionReport = resolvedReport

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return 'Recent Session'
    }
  }

  const getHiringBadge = (decision: HiringDecision) => {
    switch (decision) {
      case 'strong-hire':
        return {
          title: 'STRONG HIRE',
          subtitle: 'Top 5% Candidate Performance',
          color: 'from-emerald-500/20 via-teal-500/10 to-emerald-950/40 border-emerald-500/50 text-emerald-300',
          glow: 'shadow-[0_0_30px_-5px_rgba(16,185,129,0.35)]',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
          icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
        }
      case 'hire':
        return {
          title: 'HIRE',
          subtitle: 'Meets Core Technical Benchmark',
          color: 'from-cyan-500/20 via-indigo-500/10 to-slate-900 border-cyan-500/50 text-cyan-300',
          glow: 'shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
          icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
        }
      case 'lean-hire':
        return {
          title: 'LEAN HIRE',
          subtitle: 'Solid Fundamentals with Growth Areas',
          color: 'from-amber-500/20 via-yellow-500/10 to-slate-900 border-amber-500/50 text-amber-300',
          glow: 'shadow-[0_0_30px_-5px_rgba(245,158,11,0.25)]',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
          icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
        }
      case 'needs-work':
      default:
        return {
          title: 'DEVELOPMENT NEEDED',
          subtitle: 'Additional Preparation Recommended',
          color: 'from-rose-500/20 via-red-500/10 to-slate-900 border-rose-500/50 text-rose-300',
          glow: 'shadow-[0_0_30px_-5px_rgba(244,63,94,0.25)]',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
          icon: <AlertCircle className="w-5 h-5 text-rose-400" />,
        }
    }
  }

  const badgeConfig = getHiringBadge(report.hiringDecision)

  // Format chart data
  const chartData = report.dimensions.map((d) => ({
    subject: d.dimension,
    Candidate: d.score,
    Benchmark: d.benchmark,
    fullMark: 100,
  }))

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCodeId(id)
    setTimeout(() => setCopiedCodeId(null), 2000)
  }

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pb-20 print:bg-white print:text-black">
      {/* Background Gradients (hidden in print) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 print:hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute top-[30%] right-[-10%] w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[25%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[130px]" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)]">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              LockedIn
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-mono">
              Evaluation Report
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all"
            title="Copy Report Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/40 text-xs font-semibold text-indigo-300 hover:text-indigo-100 transition-all shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export / Print PDF</span>
          </button>

          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-semibold text-white transition-all shadow-[0_0_20px_-3px_rgba(6,182,212,0.4)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Practice Again</span>
          </Link>
        </div>
      </header>

      {/* MAIN REPORT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8 print:p-0 print:max-w-full">
        {/* 1. EXECUTIVE SUMMARY HERO BANNER */}
        <section
          className={cn(
            'relative rounded-3xl border p-6 sm:p-8 bg-gradient-to-br transition-all backdrop-blur-xl',
            badgeConfig.color,
            badgeConfig.glow,
            'print:border-slate-300 print:bg-none print:shadow-none print:p-4'
          )}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Meta & Candidate Info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase border flex items-center gap-1.5 shadow-sm',
                    badgeConfig.badgeBg
                  )}
                >
                  {badgeConfig.icon}
                  {badgeConfig.title}
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-cyan-300 capitalize font-medium">
                  {report.roundType.replace('-', ' ')} Track
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white print:text-black">
                  {report.candidateName} — Interview Performance Summary
                </h1>
                <p className="text-sm text-slate-300/90 mt-1 font-medium print:text-slate-700">
                  Targeting <span className="text-cyan-300 font-semibold">{report.targetRole}</span> • Evaluated on {formatDate(report.completedAt)}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300/80 max-w-2xl leading-relaxed pt-1 print:text-slate-600">
                {report.summaryHeadline}
              </p>
            </div>

            {/* Right: Big Score Gauge */}
            <div className="flex items-center gap-4 sm:gap-6 self-start lg:self-center shrink-0">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[120px] shadow-inner print:border-slate-300 print:bg-white">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Overall Score
                </span>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400 print:text-indigo-600">
                    {report.overallScore}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">/100</span>
                </div>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-medium">
                  {report.percentileRank}th Percentile
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[110px] shadow-inner print:border-slate-300 print:bg-white">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Time Taken
                </span>
                <div className="text-xl font-bold text-slate-200 mt-2 font-mono flex items-center justify-center gap-1.5 print:text-black">
                  <Clock className="w-4 h-4 text-cyan-400 print:text-black" />
                  {formatDuration(report.timeSpentSeconds)}
                </div>
                <span className="block text-[10px] text-slate-400 mt-1">
                  of {formatDuration(report.totalTimeAllocatedSeconds)} limit
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATS & QUICK METRICS ROW */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md print:border-slate-300 print:bg-white">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wide">Questions</span>
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white print:text-black">
              {report.questionSummaries.length} / {report.questionSummaries.length}
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">100% Loop Completed</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md print:border-slate-300 print:bg-white">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wide">Top Domain</span>
              <Award className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-lg font-bold text-indigo-300 truncate print:text-black">
              {report.dimensions[0]?.dimension || 'System Architecture'}
            </div>
            <span className="text-[11px] text-slate-400">Score: {report.dimensions[0]?.score || 90}/100</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md print:border-slate-300 print:bg-white">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wide">Benchmark Delta</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 print:text-black">
              +{Math.max(0, report.overallScore - 75)}%
            </div>
            <span className="text-[11px] text-slate-400">vs Senior Avg (75)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md print:border-slate-300 print:bg-white">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wide">Transcripts Log</span>
              <MessageSquare className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white print:text-black">
              {report.transcripts.length} Turns
            </div>
            <span className="text-[11px] text-slate-400">AI Speech & Code</span>
          </div>
        </section>

        {/* 3. TABS NAVIGATION (hidden in print) */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 print:hidden">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all',
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            )}
          >
            Multi-Dimensional Analysis
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all',
              activeTab === 'questions'
                ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            )}
          >
            Question Breakdown ({report.questionSummaries.length})
          </button>

          <button
            onClick={() => setActiveTab('transcripts')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all',
              activeTab === 'transcripts'
                ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            )}
          >
            Full Dialogue Transcript
          </button>
        </div>

        {/* 4. OVERVIEW SECTION: RADAR + STRENGTHS & WEAKNESSES */}
        {(activeTab === 'overview' || activeTab === 'questions') && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* RADAR CHART (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-xl flex flex-col justify-between print:border-slate-300 print:bg-white">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 print:text-black">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Skill Radar Matrix
                  </h3>
                  <span className="text-[11px] text-slate-400">vs Target Benchmark</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed print:text-slate-600">
                  Candidate evaluation across five primary architectural and coding competencies.
                </p>
              </div>

              <div className="h-[280px] w-full my-3 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                    <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: '#64748b', fontSize: 9 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        fontSize: '12px',
                        color: '#f8fafc',
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      formatter={(val) => <span className="text-slate-300 font-medium">{val}</span>}
                    />
                    <Radar
                      name="Alex (Candidate)"
                      dataKey="Candidate"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.45}
                    />
                    <Radar
                      name="Senior Benchmark"
                      dataKey="Benchmark"
                      stroke="#818cf8"
                      fill="#818cf8"
                      fillOpacity={0.15}
                      strokeDasharray="4 4"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Dimensional Score Sliders / Progress bars */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                {report.dimensions.map((dim) => (
                  <div key={dim.dimension} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">{dim.dimension}</span>
                      <span className="text-cyan-400 font-semibold">{dim.score}/100</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full"
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STRENGTHS, GROWTH AREAS & RECOMMENDATIONS (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Strengths Card */}
              <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 backdrop-blur-xl print:border-slate-300 print:bg-white">
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <h4 className="text-sm font-bold uppercase tracking-wider">Demonstrated Strengths</h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 print:text-slate-800">
                  {report.topStrengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Growth Areas Card */}
              <div className="p-6 rounded-3xl bg-amber-950/20 border border-amber-500/30 backdrop-blur-xl print:border-slate-300 print:bg-white">
                <div className="flex items-center gap-2 mb-3 text-amber-400">
                  <AlertCircle className="w-5 h-5" />
                  <h4 className="text-sm font-bold uppercase tracking-wider">Priority Growth Areas</h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 print:text-slate-800">
                  {report.keyGrowthAreas.map((gap, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actionable Next Steps Card */}
              <div className="p-6 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-xl print:border-slate-300 print:bg-white">
                <div className="flex items-center gap-2 mb-3 text-indigo-300">
                  <Lightbulb className="w-5 h-5 text-indigo-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider">Targeted Action Plan</h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 print:text-slate-800">
                  {report.recommendedNextSteps.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* 5. QUESTION-BY-QUESTION IN-DEPTH BREAKDOWN */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2 print:text-black">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Detailed Problem & Response Review
            </h3>
            <span className="text-xs text-slate-400">
              {report.questionSummaries.length} Questions Evaluated
            </span>
          </div>

          <div className="space-y-4">
            {report.questionSummaries.map((summary, idx) => {
              const q = summary.question
              const fb = summary.feedback
              const ans = summary.answer
              const isExpanded = expandedQuestion === q.id || activeTab === 'questions'

              return (
                <div
                  key={q.id}
                  className="rounded-3xl bg-slate-900/60 border border-slate-800/80 overflow-hidden backdrop-blur-xl transition-all print:border-slate-300 print:bg-white"
                >
                  {/* Header row */}
                  <div
                    onClick={() =>
                      setExpandedQuestion(isExpanded ? null : q.id)
                    }
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-slate-850/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-cyan-300 shrink-0">
                        Q{idx + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm sm:text-base font-bold text-white print:text-black">
                            {q.title}
                          </h4>
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700 capitalize">
                            {q.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 print:text-slate-600">
                          {q.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="block text-xs font-bold text-cyan-400">
                          {fb?.overallScore || 85}/100
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">Evaluated</span>
                      </div>

                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 space-y-6">
                      {/* Problem Description Full */}
                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed print:text-black">
                        <span className="font-semibold text-slate-200 block mb-1 text-xs">
                          Prompt Requirements & Constraints:
                        </span>
                        {q.description}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left: Candidate's Solution (Code & Speech) */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                              <Code2 className="w-4 h-4 text-cyan-400" />
                              Candidate Submitted Code ({ans?.language || q.language || 'typescript'})
                            </h5>
                            <button
                              onClick={() => handleCopyCode(q.id, ans?.code || q.starterCode || '')}
                              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                            >
                              {copiedCodeId === q.id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{copiedCodeId === q.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-[260px] shadow-inner print:border-slate-300 print:bg-slate-50 print:text-black">
                            <pre>{ans?.code || q.starterCode || '// No code submitted for this question'}</pre>
                          </div>

                          {/* Candidate Verbal Transcript */}
                          {ans?.speechText && (
                            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs">
                              <span className="font-bold text-slate-400 block mb-1 flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                                Candidate Architectural Walkthrough:
                              </span>
                              <p className="text-slate-300 italic leading-relaxed">
                                "{ans.speechText}"
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Right: AI Evaluator Feedback & Benchmark Comparison */}
                        <div className="space-y-4">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            AI Rubric Score & Key Feedback
                          </h5>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                              <span className="text-[10px] text-slate-400 block">Technical</span>
                              <span className="text-sm font-bold text-cyan-400">
                                {fb?.technicalScore || 85}%
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                              <span className="text-[10px] text-slate-400 block">Problem Solving</span>
                              <span className="text-sm font-bold text-indigo-400">
                                {fb?.problemSolvingScore || 88}%
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                              <span className="text-[10px] text-slate-400 block">Communication</span>
                              <span className="text-sm font-bold text-emerald-400">
                                {fb?.communicationScore || 90}%
                              </span>
                            </div>
                          </div>

                          {/* Feedback Strengths / Weaknesses */}
                          {fb && (
                            <div className="space-y-2.5 text-xs">
                              {fb.strengths.length > 0 && (
                                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-200">
                                  <span className="font-semibold text-emerald-400 block mb-1">
                                    Key Strengths:
                                  </span>
                                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                                    {fb.strengths.map((s, i) => (
                                      <li key={i}>{s}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {fb.suggestions.length > 0 && (
                                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-slate-200">
                                  <span className="font-semibold text-indigo-300 block mb-1">
                                    Model Recommendation:
                                  </span>
                                  <p className="text-slate-300 leading-relaxed">
                                    {fb.modelAnswerSummary || fb.suggestions[0]}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* 6. FULL INTERVIEW DIALOGUE TRANSCRIPTS (Tab or bottom section) */}
        {activeTab === 'transcripts' && (
          <section className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-xl space-y-4 print:border-slate-300 print:bg-white">
            <h3 className="text-base font-bold text-white flex items-center gap-2 print:text-black">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              Full Chronological Dialogue Timeline
            </h3>

            <div className="space-y-3 pt-2">
              {report.transcripts.map((t) => {
                const isAi = t.speaker === 'ai'
                return (
                  <div
                    key={t.id}
                    className={cn(
                      'p-4 rounded-2xl border text-xs leading-relaxed max-w-2xl',
                      isAi
                        ? 'bg-slate-950/90 border-slate-800 text-slate-200 mr-auto'
                        : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-100 ml-auto'
                    )}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5 font-semibold">
                      <span className="flex items-center gap-1.5">
                        {isAi ? (
                          <span className="text-cyan-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> AI Interviewer
                          </span>
                        ) : (
                          <span className="text-indigo-300">Alex Chen (Candidate)</span>
                        )}
                      </span>
                      <span className="font-mono text-slate-500">{t.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-line">{t.text}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* 7. FOOTER CALL TO ACTION */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-900/80 border border-indigo-500/30 text-center space-y-4 print:hidden">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
            <Zap className="w-6 h-6 text-white" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Ready for your next mock loop?</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Simulate diverse engineering tracks including System Design, DSA, and STAR Behavioral to sharpen your responses.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-bold text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              Start New Mock Session
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              Save PDF Report
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
