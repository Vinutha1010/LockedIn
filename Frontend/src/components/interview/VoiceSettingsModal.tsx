import { type FC } from 'react'
import { X, Volume2, Sparkles, Gauge, Bell, Check } from 'lucide-react'
import type { VoiceOption } from '@/hooks/useSpeechSynthesis'

interface VoiceSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  voices: VoiceOption[]
  selectedVoiceURI: string | null
  onSelectVoice: (uri: string) => void
  speechRate: number
  onChangeSpeechRate: (rate: number) => void
  autoSpeakQuestions: boolean
  onToggleAutoSpeak: (enabled: boolean) => void
  soundEffectsEnabled: boolean
  onToggleSoundEffects: (enabled: boolean) => void
  onTestVoice: () => void
  isTestingVoice?: boolean
}

export const VoiceSettingsModal: FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  voices,
  selectedVoiceURI,
  onSelectVoice,
  speechRate,
  onChangeSpeechRate,
  autoSpeakQuestions,
  onToggleAutoSpeak,
  soundEffectsEnabled,
  onToggleSoundEffects,
  onTestVoice,
  isTestingVoice = false,
}) => {
  if (!isOpen) return null

  const rates = [0.8, 1.0, 1.15, 1.3]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Audio & Voice Settings</h3>
              <p className="text-[11px] text-slate-400">Configure AI interviewer voice & sound effects</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 text-xs text-slate-300 max-h-[75vh] overflow-y-auto">
          {/* 1. Voice Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Interviewer Voice (Sarah)
            </label>
            {voices.length === 0 ? (
              <p className="text-slate-500 text-[11px] italic">Loading available browser voices...</p>
            ) : (
              <select
                value={selectedVoiceURI || ''}
                onChange={(e) => onSelectVoice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang}) {v.isNatural ? '✨ Natural' : ''}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={onTestVoice}
              disabled={isTestingVoice}
              className="mt-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isTestingVoice ? 'Speaking sample...' : 'Preview Voice Sample'}</span>
            </button>
          </div>

          {/* 2. Speaking Rate */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-indigo-400" />
              Interviewer Speed
            </label>
            <div className="grid grid-cols-4 gap-2">
              {rates.map((r) => (
                <button
                  key={r}
                  onClick={() => onChangeSpeechRate(r)}
                  className={`py-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
                    speechRate === r
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>

          {/* 3. Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            {/* Auto-read questions */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-slate-200 block">Auto-Read Questions</span>
                <span className="text-[11px] text-slate-500 block">
                  AI reads question prompt aloud when switching stages
                </span>
              </div>
              <button
                onClick={() => onToggleAutoSpeak(!autoSpeakQuestions)}
                className={`w-10 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  autoSpeakQuestions ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    autoSpeakQuestions ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Sound effects */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-slate-200 block flex items-center gap-1.5">
                  <Bell className="w-3 h-3 text-cyan-400" />
                  Procedural Sound Effects
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Subtle audio chimes on question transitions & evaluations
                </span>
              </div>
              <button
                onClick={() => onToggleSoundEffects(!soundEffectsEnabled)}
                className={`w-10 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  soundEffectsEnabled ? 'bg-cyan-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    soundEffectsEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 hover:opacity-95 transition-opacity"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  )
}
