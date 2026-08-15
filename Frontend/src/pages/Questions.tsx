import { useState, useMemo, type FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Flame,
  Search,
  ArrowLeft,
  Sparkles,
  Code2,
  Cpu,
  Users,
  Layers,
  Clock,
  Filter,
  CheckCircle2,
  Tag,
  Building2,
  X,
  Play,
  Copy,
  Check,
  Zap,
  Award,
} from 'lucide-react'
import { QUESTION_BANK } from '@/data/questions'
import { useInterviewStore } from '@/store/useInterviewStore'
import type { Question, RoundType, Difficulty } from '@/types'
import { cn } from '@/lib/utils'

export const Questions: FC = () => {
  const navigate = useNavigate()
  const { launchQuestionSession } = useInterviewStore()

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTrack, setSelectedTrack] = useState<RoundType | 'all'>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all')
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all')
  const [selectedCompany, setSelectedCompany] = useState<string | 'all'>('all')

  // Preview drawer state
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([])

  // Collect all unique tags and companies
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    QUESTION_BANK.forEach((q) => q.tags?.forEach((t) => tagsSet.add(t)))
    return Array.from(tagsSet)
  }, [])

  const allCompanies = useMemo(() => {
    const compSet = new Set<string>()
    QUESTION_BANK.forEach((q) => q.companyTags?.forEach((c) => compSet.add(c)))
    return Array.from(compSet)
  }, [])

  // Filtered list
  const filteredQuestions = useMemo(() => {
    return QUESTION_BANK.filter((q) => {
      // Search query filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.companyTags?.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))

      // Track filter
      const matchesTrack = selectedTrack === 'all' || q.roundType === selectedTrack

      // Difficulty filter
      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        q.difficulty === selectedDifficulty ||
        (selectedDifficulty === 'senior' && (q.difficulty === 'senior' || q.difficulty === 'hard')) ||
        (selectedDifficulty === 'mid' && (q.difficulty === 'mid' || q.difficulty === 'medium'))

      // Tag filter
      const matchesTag = selectedTag === 'all' || q.tags?.includes(selectedTag)

      // Company filter
      const matchesCompany = selectedCompany === 'all' || q.companyTags?.includes(selectedCompany)

      return matchesSearch && matchesTrack && matchesDifficulty && matchesTag && matchesCompany
    })
  }, [searchQuery, selectedTrack, selectedDifficulty, selectedTag, selectedCompany])

  const handleStartSoloSession = (q: Question) => {
    launchQuestionSession(q)
    navigate('/interview')
  }

  const handleStartCustomLoop = () => {
    const selected = QUESTION_BANK.filter((q) => selectedQuestionIds.includes(q.id))
    if (selected.length === 0) return
    launchQuestionSession(selected)
    navigate('/interview')
  }

  const toggleQuestionSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedQuestionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'junior':
      case 'easy':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
      case 'mid':
      case 'medium':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40'
      case 'senior':
      case 'hard':
        return 'bg-indigo-950/80 text-indigo-400 border-indigo-500/40'
      case 'lead':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/40'
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700'
    }
  }

  const getTrackIcon = (track: RoundType) => {
    switch (track) {
      case 'dsa':
        return <Code2 className="w-3.5 h-3.5 text-cyan-400" />
      case 'cs-fundamentals':
        return <Cpu className="w-3.5 h-3.5 text-indigo-400" />
      case 'coding':
        return <Layers className="w-3.5 h-3.5 text-emerald-400" />
      case 'aptitude':
        return <Users className="w-3.5 h-3.5 text-amber-400" />
      default:
        return <Sparkles className="w-3.5 h-3.5 text-slate-400" />
    }
  }

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pb-28">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[140px]" />
        <div className="absolute top-[30%] right-[-10%] w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[130px]" />
      </div>

      {/* TOP HEADER BAR */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)]">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              LockedIn
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-mono hidden md:inline">
              Practice Hub
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/report"
            className="text-xs text-slate-400 hover:text-slate-200 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors hidden sm:inline-block"
          >
            Past Reports
          </Link>

          <button
            onClick={() => navigate('/interview')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-semibold text-white transition-all shadow-[0_0_20px_-3px_rgba(6,182,212,0.4)]"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Launch Mock Loop</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* HERO TITLE & STATS */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {QUESTION_BANK.length} Calibrated Questions
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs">
              4 Engineering Tracks
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs">
              FAANG / Tier-1 Tech
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Practice Question Bank & Problem Library
              </h1>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Filter by architecture domain, algorithmic pattern, or behavioral leadership principles. Practice solo or build a custom mock loop with real-time AI evaluation.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topics, Redis, DP, Kafka..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-8 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ADVANCED FILTERING TABS & DROPDOWNS */}
        <section className="space-y-4">
          {/* Track Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Domains', icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'dsa', label: 'Data Structures & Algorithms', icon: <Code2 className="w-3.5 h-3.5" /> },
              { id: 'cs-fundamentals', label: 'CS Fundamentals (OS/DBMS/Net/OOP)', icon: <Cpu className="w-3.5 h-3.5" /> },
              { id: 'coding', label: 'Practical Coding', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'aptitude', label: 'Aptitude & Logic', icon: <Users className="w-3.5 h-3.5" /> },
            ].map((tab) => {
              const isSelected = selectedTrack === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTrack(tab.id as RoundType | 'all')}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all border',
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Secondary Filter Badges: Difficulty, Companies, Tags */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">Filters:</span>
            </div>

            {/* Difficulty select */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'all')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700/80 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Seniorities</option>
              <option value="junior">Junior / Entry</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
              <option value="lead">Staff / Principal</option>
            </select>

            {/* Company select */}
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700/80 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Companies</option>
              {allCompanies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Tag Quick Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pt-1 sm:pt-0">
              <button
                onClick={() => setSelectedTag('all')}
                className={cn(
                  'px-2 py-1 rounded-md text-[11px] font-medium transition-colors border',
                  selectedTag === 'all'
                    ? 'bg-slate-800 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                )}
              >
                All Topics
              </button>
              {allTags.slice(0, 8).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTag(selectedTag === t ? 'all' : t)}
                  className={cn(
                    'px-2 py-1 rounded-md text-[11px] font-medium transition-colors border shrink-0',
                    selectedTag === t
                      ? 'bg-indigo-950/90 text-indigo-300 border-indigo-500/50'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Reset Filters */}
            {(searchQuery || selectedTrack !== 'all' || selectedDifficulty !== 'all' || selectedTag !== 'all' || selectedCompany !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedTrack('all')
                  setSelectedDifficulty('all')
                  setSelectedTag('all')
                  setSelectedCompany('all')
                }}
                className="text-[11px] text-rose-400 hover:text-rose-300 ml-auto font-medium transition-colors"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </section>

        {/* RESULTS GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredQuestions.length}</strong> of{' '}
              {QUESTION_BANK.length} problems
            </span>
            {selectedQuestionIds.length > 0 && (
              <span className="text-cyan-300 font-semibold">
                {selectedQuestionIds.length} question(s) selected
              </span>
            )}
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No matching questions found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try adjusting your search query or reset track and topic filters to explore our full library.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedTrack('all')
                  setSelectedDifficulty('all')
                  setSelectedTag('all')
                  setSelectedCompany('all')
                }}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuestions.map((q) => {
                const isSelected = selectedQuestionIds.includes(q.id)

                return (
                  <div
                    key={q.id}
                    onClick={() => setPreviewQuestion(q)}
                    className={cn(
                      'group p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between backdrop-blur-xl relative overflow-hidden',
                      isSelected
                        ? 'bg-indigo-950/30 border-indigo-500/60 shadow-[0_0_25px_-5px_rgba(99,102,241,0.3)]'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850/60 hover:shadow-lg'
                    )}
                  >
                    {/* Top Row: Track Icon, Difficulty, Selection Checkbox */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800">
                          {getTrackIcon(q.roundType)}
                        </span>
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border',
                            getDifficultyColor(q.difficulty)
                          )}
                        >
                          {q.difficulty}
                        </span>
                        {q.frequency === 'High' && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 text-[10px] font-medium flex items-center gap-0.5">
                            🔥 High Freq
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => toggleQuestionSelection(q.id, e)}
                        className={cn(
                          'w-5 h-5 rounded-md border flex items-center justify-center transition-colors',
                          isSelected
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'border-slate-700 hover:border-slate-500 text-transparent'
                        )}
                        title="Select for custom interview playlist"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Problem Title & Excerpt */}
                    <div className="space-y-1.5 mb-4">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {q.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {q.description}
                      </p>
                    </div>

                    {/* Company & Topic Tags */}
                    <div className="space-y-2 mb-4">
                      {q.companyTags && q.companyTags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                          {q.companyTags.map((comp) => (
                            <span
                              key={comp}
                              className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 font-medium"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      )}

                      {q.tags && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Tag className="w-3 h-3 text-slate-500 shrink-0" />
                          {q.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-slate-800/60 text-[10px] text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                          {q.tags.length > 3 && (
                            <span className="text-[10px] text-slate-500">
                              +{q.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata & Action */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          ~{q.timeLimitMinutes || 15}m
                        </span>
                        {q.acceptanceRate && (
                          <span className="text-emerald-400 font-medium">
                            {q.acceptanceRate} Pass
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStartSoloSession(q)
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Practice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>

      {/* STICKY BOTTOM BAR FOR MULTI-QUESTION CUSTOM PLAYLIST */}
      {selectedQuestionIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-in slide-in-from-bottom-5">
          <div className="p-4 rounded-2xl bg-slate-900/95 border border-indigo-500/50 shadow-2xl backdrop-blur-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                {selectedQuestionIds.length}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Custom Interview Playlist</h4>
                <p className="text-[11px] text-slate-400">
                  Estimated {selectedQuestionIds.length * 15} mins • Real-time AI grading
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedQuestionIds([])}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleStartCustomLoop}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Mock Loop ({selectedQuestionIds.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OUT PROBLEM DETAILS DRAWER / MODAL */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative text-left">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/40">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      'px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border',
                      getDifficultyColor(previewQuestion.difficulty)
                    )}
                  >
                    {previewQuestion.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs capitalize font-medium">
                    {previewQuestion.roundType.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> ~{previewQuestion.timeLimitMinutes || 15}m limit
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-white">{previewQuestion.title}</h2>
              </div>

              <button
                onClick={() => setPreviewQuestion(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Problem Statement & System Requirements
                </h4>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line">
                  {previewQuestion.description}
                </div>
              </div>

              {/* Starter Code Preview */}
              {previewQuestion.starterCode && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      Starter Code ({previewQuestion.language || 'typescript'})
                    </h4>
                    <button
                      onClick={() => handleCopyCode(previewQuestion.starterCode || '')}
                      className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-[220px] shadow-inner">
                    <pre>{previewQuestion.starterCode}</pre>
                  </div>
                </div>
              )}

              {/* Complexity Constraints */}
              {previewQuestion.expectedComplexity && (
                <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between">
                  <span className="font-semibold text-indigo-300">Target Complexity:</span>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-cyan-300">Time: {previewQuestion.expectedComplexity.time}</span>
                    <span className="text-emerald-300">Space: {previewQuestion.expectedComplexity.space}</span>
                  </div>
                </div>
              )}

              {/* Rubric Points */}
              {previewQuestion.rubricCriteria && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    AI Evaluator Rubric Criteria
                  </h4>
                  <ul className="space-y-1.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-300">
                    {previewQuestion.rubricCriteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3">
              <button
                onClick={() => setPreviewQuestion(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Close Preview
              </button>

              <button
                onClick={() => {
                  const q = previewQuestion
                  setPreviewQuestion(null)
                  handleStartSoloSession(q)
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch 1-on-1 AI Interview</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
