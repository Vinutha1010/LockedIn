import type { FC } from 'react'
import { cn } from '@/lib/utils'

interface AudioVisualizerProps {
  frequencies?: number[]
  isActive?: boolean
  colorScheme?: 'cyan' | 'indigo' | 'emerald' | 'amber'
  heightClass?: string
  className?: string
}

export const AudioVisualizer: FC<AudioVisualizerProps> = ({
  frequencies = [20, 45, 80, 55, 90, 35, 60],
  isActive = false,
  colorScheme = 'cyan',
  heightClass = 'h-4',
  className,
}) => {
  const colorMap = {
    cyan: 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]',
    indigo: 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]',
    emerald: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    amber: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
  }

  const barColor = colorMap[colorScheme]

  return (
    <div className={cn('flex items-center gap-1 shrink-0', heightClass, className)}>
      {frequencies.map((heightPercent, i) => (
        <span
          key={i}
          className={cn(
            'w-1 rounded-full transition-all duration-75',
            isActive ? barColor : 'bg-slate-700/60'
          )}
          style={{
            height: isActive ? `${Math.max(15, Math.min(100, heightPercent))}%` : '15%',
          }}
        />
      ))}
    </div>
  )
}
