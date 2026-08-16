import { useState, useRef, useEffect, type FC } from 'react'
import {
  X,
  Send,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  Sliders,
} from 'lucide-react'
import { useInterviewStore } from '@/store/useInterviewStore'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { soundEffects } from '@/lib/soundEffects'
import { generateLockyResponse, type LockyMessage } from '@/lib/lockyBot'
import lockyAvatar from '@/assets/locky.jpg'
import { cn } from '@/lib/utils'

interface VoicePersonality {
  id: string
  label: string
  pitch: number
  rate: number
}

const VOICE_PERSONALITIES: VoicePersonality[] = [
  { id: 'cute', label: ' Cute & Cheerful', pitch: 1.25, rate: 1.05 },
  { id: 'natural', label: ' Natural & Clear', pitch: 1.1, rate: 1.0 },
  { id: 'calm', label: ' Calm Tech Coach', pitch: 1.0, rate: 0.95 },
]

export const LockyChatbot: FC = () => {
  const {
    candidateName,
    questions,
    currentQuestionIndex,
    activeCode,
    activeLanguage,
    targetRole,
    timeRemainingSeconds,
  } = useInterviewStore()

  const currentQ = questions[currentQuestionIndex]

  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [showVoiceSettings, setShowVoiceSettings] = useState(false)
  const [selectedPersonality, setSelectedPersonality] = useState<VoicePersonality>(
    VOICE_PERSONALITIES[0] // Default to Cute & Cheerful
  )
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [hasUnread, setHasUnread] = useState(true)

  const [messages, setMessages] = useState<LockyMessage[]>([
    {
      id: 'msg-0',
      sender: 'locky',
      text: `Hi ${candidateName || 'there'}! I'm **Locky** 🔒, your AI mock interview copilot!
      
I can review your code in real-time, explain tricky algorithmic concepts, give gentle socratic hints, or coach you on STAR behavioral answers. How can I help you ace this?`,
      timestamp: 'Just now',
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Speech Synthesis for Locky voice with clean English filter
  const {
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    speak: speakLocky,
    stop: stopSpeaking,
    isSpeaking,
  } = useSpeechSynthesis({
    rate: selectedPersonality.rate,
    pitch: selectedPersonality.pitch,
  })

  // Speech Recognition for user voice questions
  const {
    isListening,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    onTranscriptUpdate: (newText, isFinal) => {
      if (isFinal && newText) {
        setInputText((prev) => (prev ? `${prev} ${newText}` : newText))
      }
    },
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim()
    if (!query) return

    stopSpeaking()
    if (isListening) stopListening()
    resetTranscript()
    setInputText('')

    const userMsg: LockyMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const lockyReply = generateLockyResponse(query, {
        currentQuestion: currentQ,
        activeCode,
        activeLanguage,
        candidateName,
        targetRole,
        timeRemainingMinutes: Math.ceil(timeRemainingSeconds / 60),
      })

      const botMsg: LockyMessage = {
        id: 'lck-' + Date.now(),
        sender: 'locky',
        text: lockyReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)

      soundEffects.playQuestionAdvance()

      if (isVoiceEnabled) {
        speakLocky(lockyReply, {
          pitch: selectedPersonality.pitch,
          rate: selectedPersonality.rate,
        })
      }
    }, 600)
  }

  const handleQuickAction = (actionPrompt: string) => {
    handleSendMessage(actionPrompt)
  }

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const testVoiceSample = () => {
    speakLocky(`Hey! I'm Locky, your mock interview copilot. Let's lock in and get that offer!`, {
      pitch: selectedPersonality.pitch,
      rate: selectedPersonality.rate,
    })
  }

  const quickChips = [
    { label: '🔍 Review My Code', prompt: 'Please review and debug my current code for any bugs or edge cases.' },
    { label: '💡 Give Me a Hint', prompt: 'Can you give me a friendly hint for this question without spoiling the full code?' },
    { label: '⚡ Time Complexity', prompt: 'What is the optimal time and space complexity for this problem?' },
    { label: '🗣️ STAR Method Tips', prompt: 'How should I structure a STAR response for behavioral rounds?' },
  ]

  return (
    <>
      {/* 1. FLOATING LOCKY MASCOT TRIGGER BUTTON */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
          {/* Greeting Speech Bubble */}
          {hasUnread && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-xs text-slate-200 shadow-xl shadow-cyan-500/10 animate-bounce backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Need a hint or code review? Ask Locky!</span>
              <button
                onClick={() => setHasUnread(false)}
                className="text-slate-500 hover:text-white p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Cute Mascot Button */}
          <button
            onClick={() => {
              setIsOpen(true)
              setHasUnread(false)
            }}
            className="group relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-indigo-700 p-0.5 shadow-2xl shadow-indigo-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center focus:outline-none"
            title="Chat with Locky AI Coach"
          >
            {/* Glowing ring animation */}
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-60 blur-md group-hover:opacity-90 transition-opacity animate-pulse" />

            <div className="relative w-full h-full rounded-[14px] bg-slate-950 overflow-hidden flex items-center justify-center">
              <img
                src={lockyAvatar}
                alt="Locky AI Mascot"
                className="w-full h-full object-cover rounded-[14px] transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-900 flex items-center justify-center text-[9px] font-bold text-slate-950 shadow-sm">
              ✨
            </span>
          </button>
        </div>
      )}

      {/* 2. EXPANDED LOCKY CHAT WINDOW */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[410px] h-[570px] bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3 px-4 bg-slate-950/85 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/40 shadow-md">
                <img
                  src={lockyAvatar}
                  alt="Locky"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">Locky</h3>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-semibold">
                    AI Copilot
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{selectedPersonality.label}</span>
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  showVoiceSettings
                    ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                )}
                title="Voice & Accent Settings"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (isSpeaking) stopSpeaking()
                  setIsVoiceEnabled(!isVoiceEnabled)
                }}
                className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  isVoiceEnabled
                    ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                )}
                title={isVoiceEnabled ? 'Voice Responses Enabled' : 'Voice Muted'}
              >
                {isVoiceEnabled ? (
                  <Volume2 className="w-3.5 h-3.5" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                onClick={() => {
                  setMessages([
                    {
                      id: 'msg-0',
                      sender: 'locky',
                      text: `Chat cleared! What shall we tackle next?`,
                      timestamp: 'Just now',
                    },
                  ])
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Clear Chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  stopSpeaking()
                  setIsOpen(false)
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Minimize Locky"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Voice Personality & Accent Settings Panel (Dropdown drawer) */}
          {showVoiceSettings && (
            <div className="p-3 bg-slate-950 border-b border-cyan-500/20 text-xs space-y-2.5 animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 text-[11px] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Locky's Voice Personality</span>
                </span>
                <button
                  onClick={testVoiceSample}
                  className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 text-[10px] font-medium flex items-center gap-1"
                >
                  <Volume2 className="w-2.5 h-2.5" />
                  <span>Test Voice</span>
                </button>
              </div>

              {/* Personality Presets */}
              <div className="grid grid-cols-3 gap-1.5">
                {VOICE_PERSONALITIES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPersonality(p)
                      speakLocky(`Hi! I'm speaking in ${p.label}!`, {
                        pitch: p.pitch,
                        rate: p.rate,
                      })
                    }}
                    className={cn(
                      'p-1.5 rounded-lg text-[10.5px] font-medium border text-center transition-all',
                      selectedPersonality.id === p.id
                        ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* System Voice Selection */}
              {voices.length > 0 && (
                <div className="space-y-1 pt-1">
                  <label className="text-[10px] text-slate-400 font-medium">
                    Native Voice Engine (Neutral English Only):
                  </label>
                  <select
                    value={selectedVoiceURI || ''}
                    onChange={(e) => {
                      setSelectedVoiceURI(e.target.value)
                      speakLocky(`Voice updated! Ready to assist you.`, {
                        pitch: selectedPersonality.pitch,
                        rate: selectedPersonality.rate,
                      })
                    }}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    {voices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.label || v.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Quick Action Prompt Chips */}
          <div className="p-2 border-b border-slate-800/80 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(chip.prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-850 text-slate-300 hover:text-white text-[10.5px] font-medium whitespace-nowrap transition-all flex items-center gap-1 shrink-0"
              >
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => {
              const isLocky = msg.sender === 'locky'
              return (
                <div
                  key={msg.id}
                  className={cn(
                    'flex gap-2 max-w-[90%]',
                    isLocky ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse'
                  )}
                >
                  {isLocky ? (
                    <div className="w-6 h-6 rounded-lg overflow-hidden shrink-0 border border-cyan-500/30 mt-0.5">
                      <img
                        src={lockyAvatar}
                        alt="Locky"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 text-white font-bold text-[9px] mt-0.5">
                      {candidateName?.[0] || 'U'}
                    </div>
                  )}

                  <div
                    className={cn(
                      'p-2.5 rounded-2xl leading-relaxed relative group',
                      isLocky
                        ? 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-sm'
                        : 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-tr-sm shadow-md'
                    )}
                  >
                    <div className="whitespace-pre-line prose prose-invert prose-xs">
                      {msg.text}
                    </div>

                    <div
                      className={cn(
                        'flex items-center justify-between gap-2 mt-1.5 text-[9.5px]',
                        isLocky ? 'text-slate-500' : 'text-indigo-200'
                      )}
                    >
                      <span>{msg.timestamp}</span>

                      {isLocky && (
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="p-1 hover:text-white transition-colors"
                            title="Copy message"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>

                          <button
                            onClick={() =>
                              speakLocky(msg.text, {
                                pitch: selectedPersonality.pitch,
                                rate: selectedPersonality.rate,
                              })
                            }
                            className="p-1 hover:text-cyan-300 transition-colors"
                            title="Speak message"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-400">
                <div className="w-6 h-6 rounded-lg overflow-hidden shrink-0 border border-cyan-500/30">
                  <img
                    src={lockyAvatar}
                    alt="Locky"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-3 py-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10.5px] text-slate-400 ml-1">Locky is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Interim Display */}
          {interimTranscript && (
            <div className="px-3.5 py-1 bg-indigo-950/40 border-t border-indigo-500/20 text-xs text-indigo-300 italic flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
              <span>"{interimTranscript}"</span>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-2.5 bg-slate-950/90 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={isListening ? stopListening : startListening}
              className={cn(
                'p-2 rounded-xl border transition-all',
                isListening
                  ? 'bg-rose-600 text-white animate-pulse border-rose-400'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-850'
              )}
              title={isListening ? 'Stop recording' : 'Dictate with microphone'}
            >
              {isListening ? (
                <MicOff className="w-3.5 h-3.5" />
              ) : (
                <Mic className="w-3.5 h-3.5" />
              )}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Ask Locky a question or for code help..."
              className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              title="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
