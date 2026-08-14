import { useEffect, type FC } from 'react'
import { useInterviewStore } from '@/store/useInterviewStore'
import { Clock, Play, Pause, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimerProps {
  className?: string
  showControls?: boolean
}

export const Timer: FC<TimerProps> = ({ className, showControls = true }) => {
  const {
    timeRemainingSeconds,
    timeElapsedSeconds,
    isTimerRunning,
    tickTimer,
    pauseSession,
    resumeSession,
  } = useInterviewStore()

  useEffect(() => {
    if (!isTimerRunning) return

    const interval = setInterval(() => {
      tickTimer()
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning, tickTimer])

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  // Warning thresholds
  const isCritical = timeRemainingSeconds <= 120 // < 2 mins
  const isWarning = !isCritical && timeRemainingSeconds <= 300 // < 5 mins

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 backdrop-blur-md',
        isCritical
          ? 'bg-rose-950/40 border-rose-500/50 text-rose-300 shadow-[0_0_15px_-3px_rgba(244,63,94,0.4)] animate-pulse'
          : isWarning
          ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]'
          : 'bg-slate-900/80 border-slate-700/60 text-slate-200 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)]',
        className
      )}
    >
      <div className="flex items-center gap-1.5">
        {isCritical ? (
          <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
        ) : (
          <Clock className={cn('w-4 h-4', isWarning ? 'text-amber-400' : 'text-cyan-400')} />
        )}
        <span className="font-mono text-sm font-semibold tracking-wider">
          {formatTime(timeRemainingSeconds)}
        </span>
      </div>

      <div className="h-3 w-[1px] bg-slate-700/80" />

      <div className="text-[11px] text-slate-400 font-mono">
        +{formatTime(timeElapsedSeconds)}
      </div>

      {showControls && (
        <button
          onClick={isTimerRunning ? pauseSession : resumeSession}
          className="ml-1 p-1 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500"
          title={isTimerRunning ? 'Pause Session' : 'Resume Session'}
          aria-label={isTimerRunning ? 'Pause Session' : 'Resume Session'}
        >
          {isTimerRunning ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 text-emerald-400" />
          )}
        </button>
      )}
    </div>
  )
}
