import { useState, useEffect, useCallback, useRef } from 'react'

export interface VoiceOption {
  name: string
  lang: string
  voiceURI: string
  default: boolean
  isNatural?: boolean
  label?: string
}

interface SpeechSynthesisHookOptions {
  onStart?: () => void
  onEnd?: () => void
  onError?: (error: any) => void
  rate?: number
  pitch?: number
  volume?: number
}

interface SpeechSynthesisHookResult {
  isSupported: boolean
  isSpeaking: boolean
  isPaused: boolean
  voices: VoiceOption[]
  selectedVoiceURI: string | null
  setSelectedVoiceURI: (uri: string) => void
  speak: (text: string, options?: { onStart?: () => void; onEnd?: () => void; pitch?: number; rate?: number }) => void
  stop: () => void
  pause: () => void
  resume: () => void
}

/**
 * Clean English Voice Filter & Natural Ranking.
 * Strictly avoids foreign accented voices and prioritizes crisp, friendly US/UK English voices.
 */
function isCleanEnglishVoice(voice: SpeechSynthesisVoice): boolean {
  const lang = voice.lang.toLowerCase()
  const name = voice.name.toLowerCase()

  // Must be English (en, en-US, en-GB, en-AU, en-CA)
  if (!lang.startsWith('en')) return false

  // Reject foreign names/accents that might be mislabeled under en
  const foreignPattern = /russian|irina|pavel|tatiana|katya|yuri|chinese|french|german|spanish|hindi|italian|japanese|korean|vietnamese/i
  if (foreignPattern.test(name)) return false

  return true
}

export function useSpeechSynthesis({
  onStart,
  onEnd,
  onError,
  rate = 1.0,
  pitch = 1.0,
  volume = 1.0,
}: SpeechSynthesisHookOptions = {}): SpeechSynthesisHookResult {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<VoiceOption[]>([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(null)

  const synthRef = useRef<SpeechSynthesis | null>(null)
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Load available system voices
  const updateVoices = useCallback(() => {
    if (!synthRef.current) return
    const allAvailable = synthRef.current.getVoices()

    // 1. Filter strictly for clean English voices
    const englishVoices = allAvailable.filter(isCleanEnglishVoice)
    const voiceList = englishVoices.length > 0 ? englishVoices : allAvailable.filter((v) => v.lang.startsWith('en'))

    // 2. Format and rank cutest, most natural voices first
    const formatted: VoiceOption[] = voiceList.map((v) => {
      const nameLower = v.name.toLowerCase()
      const isTopTier = /jenny|aria|samantha|google us|zira|karen|victoria|michelle|libby|sonia|natural/i.test(nameLower)
      
      let label = v.name
        .replace(/Microsoft\s+/g, '')
        .replace(/Online\s+\(Natural\)\s+-/g, 'Natural -')
        .replace(/Desktop\s+-/g, '-')
        .replace(/\(United States\)/g, 'US')
        .replace(/\(United Kingdom\)/g, 'UK')
        .replace(/\(Australia\)/g, 'AU')

      return {
        name: v.name,
        lang: v.lang,
        voiceURI: v.voiceURI,
        default: v.default,
        isNatural: isTopTier,
        label,
      }
    })

    // Sort: Natural/Cute US female voices first (Jenny, Samantha, Google US, Aria, Zira), then others
    formatted.sort((a, b) => {
      const score = (voice: VoiceOption) => {
        const n = voice.name.toLowerCase()
        if (/jenny/i.test(n)) return 100
        if (/aria/i.test(n)) return 95
        if (/samantha/i.test(n)) return 90
        if (/google us english/i.test(n)) return 85
        if (/zira/i.test(n)) return 80
        if (/natural/i.test(n) && /female/i.test(n)) return 75
        if (/natural/i.test(n)) return 70
        if (voice.lang.includes('US') || voice.lang.includes('en-US')) return 60
        if (voice.lang.includes('GB') || voice.lang.includes('en-GB')) return 50
        return 10
      }
      return score(b) - score(a)
    })

    setVoices(formatted)

    // Select the best cute voice
    if (formatted.length > 0) {
      const bestVoice =
        formatted.find((v) => /jenny|aria|samantha|google us|zira/i.test(v.name)) ||
        formatted[0]

      setSelectedVoiceURI((prev) => prev || bestVoice.voiceURI)
    }
  }, [])

  useEffect(() => {
    if (!isSupported) return
    synthRef.current = window.speechSynthesis

    updateVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices
    }

    return () => {
      if (synthRef.current) {
        try {
          synthRef.current.cancel()
        } catch {}
      }
    }
  }, [isSupported, updateVoices])

  const stop = useCallback(() => {
    if (!synthRef.current) return
    try {
      synthRef.current.cancel()
      setIsSpeaking(false)
      setIsPaused(false)
    } catch {}
  }, [])

  const pause = useCallback(() => {
    if (!synthRef.current) return
    try {
      synthRef.current.pause()
      setIsPaused(true)
    } catch {}
  }, [])

  const resume = useCallback(() => {
    if (!synthRef.current) return
    try {
      synthRef.current.resume()
      setIsPaused(false)
    } catch {}
  }, [])

  const speak = useCallback(
    (
      text: string,
      options?: { onStart?: () => void; onEnd?: () => void; pitch?: number; rate?: number }
    ) => {
      if (!synthRef.current || !text) return

      stop()

      // Clean up markdown/code blocks for speech clarity
      const cleanText = text
        .replace(/```[\s\S]*?```/g, 'Code example omitted.')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[#*_~>]/g, '')
        .replace(/\$O\(([^)]+)\)\$/g, 'Big O of $1')
        .trim()

      if (!cleanText) return

      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.rate = options?.rate ?? rate
      utterance.pitch = options?.pitch ?? pitch
      utterance.volume = volume

      // Attach selected clean voice
      const allVoices = synthRef.current.getVoices()
      if (selectedVoiceURI) {
        const found = allVoices.find((v) => v.voiceURI === selectedVoiceURI)
        if (found) {
          utterance.voice = found
        }
      } else {
        // Fallback to top rated English voice
        const fallback = allVoices.find((v) =>
          /jenny|aria|samantha|google us|zira/i.test(v.name)
        )
        if (fallback) utterance.voice = fallback
      }

      utterance.onstart = () => {
        setIsSpeaking(true)
        setIsPaused(false)
        onStart?.()
        options?.onStart?.()
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        setIsPaused(false)
        onEnd?.()
        options?.onEnd?.()
      }

      utterance.onerror = (err) => {
        setIsSpeaking(false)
        setIsPaused(false)
        onError?.(err)
        onEnd?.()
        options?.onEnd?.()
      }

      try {
        synthRef.current.speak(utterance)
      } catch (err) {
        setIsSpeaking(false)
      }
    },
    [rate, pitch, volume, selectedVoiceURI, stop, onStart, onEnd, onError]
  )

  return {
    isSupported,
    isSpeaking,
    isPaused,
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    speak,
    stop,
    pause,
    resume,
  }
}
