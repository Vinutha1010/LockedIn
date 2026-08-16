import type { FC } from 'react'
import {
  Mic,
  MicOff,
  Sparkles,
  RotateCcw,
  PlusCircle,
  FileCode,
  AlertCircle,
  Radio,
} from 'lucide-react'
import { AudioVisualizer } from './AudioVisualizer'
import { cn } from '@/lib/utils'

interface SpeechControlsProps {
  isSupported: boolean
  isListening: boolean
  interimTranscript: string
  speechDraft: string
  onStartListening: () => void
  onStopListening: () => void
  onClearDraft: () => void
  onAppendToNotes?: () => void
  onInsertToEditor?: () => void
  onSimulateSpeech?: () => void
  isSimulatingVoice?: boolean
  visualizerFrequencies?: number[]
  errorMessage?: string | null
}

export const SpeechControls: FC<SpeechControlsProps> = ({
  isSupported,
  isListening,
  interimTranscript,
  speechDraft,
  onStartListening,
  onStopListening,
  onClearDraft,
  onAppendToNotes,
  onInsertToEditor,
  onSimulateSpeech,
  isSimulatingVoice = false,
  visualizerFrequencies,
  errorMessage,
}) => {
  return (
    <div className="space-y-3">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center gap-2">
          {/* Main Dictation Toggle */}
          <button
            onClick={isListening ? onStopListening : onStartListening}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-md',
              isListening
                ? 'bg-rose-600 text-white animate-pulse border border-rose-400 shadow-rose-600/30'
                : 'bg-emerald-600/90 hover:bg-emerald-500 text-white border border-emerald-400/40 shadow-emerald-600/20'
            )}
          >
            {isListening ? (
              <>
                <MicOff className="w-3.5 h-3.5" />
                <span>Stop Dictation</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5" />
                <span>Start Live Voice</span>
              </>
            )}
          </button>

          {/* Fallback Simulator */}
          {onSimulateSpeech && (
            <button
              onClick={onSimulateSpeech}
              disabled={isListening || isSimulatingVoice}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-50"
              title="Simulate speech synthesis input if you do not have a microphone"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{isSimulatingVoice ? 'Transcribing...' : 'Simulate Voice'}</span>
            </button>
          )}
        </div>

        {/* Status / Audio EQ Wave */}
        <div className="flex items-center gap-2.5">
          {isListening && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>LISTENING</span>
            </div>
          )}

          <AudioVisualizer
            isActive={isListening || isSimulatingVoice}
            frequencies={visualizerFrequencies}
            colorScheme="emerald"
            heightClass="h-4"
          />
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-snug">{errorMessage}</p>
        </div>
      )}

      {!isSupported && (
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Speech Recognition API not detected. You can use the "Simulate Voice" button or type directly.</span>
        </div>
      )}

      {/* Real-time Interim Live Preview */}
      {interimTranscript && (
        <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 flex items-center gap-2 animate-in fade-in duration-150">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping shrink-0" />
          <span className="italic">"{interimTranscript}"</span>
        </div>
      )}

      {/* Quick Action Helpers for Drafted Speech */}
      {speechDraft && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="text-[11px] text-slate-400 font-medium">
            {speechDraft.split(/\s+/).filter(Boolean).length} words spoken
          </div>

          <div className="flex items-center gap-1.5">
            {onAppendToNotes && (
              <button
                onClick={onAppendToNotes}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-medium flex items-center gap-1 transition-colors"
                title="Append to STAR Behavioral Notes tab"
              >
                <PlusCircle className="w-3 h-3 text-indigo-400" />
                <span>Add to Notes</span>
              </button>
            )}

            {onInsertToEditor && (
              <button
                onClick={onInsertToEditor}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-medium flex items-center gap-1 transition-colors"
                title="Insert as comments into Code Editor"
              >
                <FileCode className="w-3 h-3 text-cyan-400" />
                <span>Insert in Code</span>
              </button>
            )}

            <button
              onClick={onClearDraft}
              className="p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
              title="Clear current transcription draft"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
