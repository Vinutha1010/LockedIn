import { useState, useEffect, useRef, useCallback } from 'react'

interface SpeechRecognitionHookOptions {
  onTranscriptUpdate?: (transcript: string, isFinal: boolean) => void
  onError?: (error: string) => void
  continuous?: boolean
  language?: string
}

interface SpeechRecognitionHookResult {
  isSupported: boolean
  isListening: boolean
  transcript: string
  interimTranscript: string
  error: string | null
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
}

// Window typing for Web Speech API
interface IWindow extends Window {
  webkitSpeechRecognition?: any
  SpeechRecognition?: any
}

export function useSpeechRecognition({
  onTranscriptUpdate,
  onError,
  continuous = true,
  language = 'en-US',
}: SpeechRecognitionHookOptions = {}): SpeechRecognitionHookResult {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)
  const shouldListenRef = useRef(false)

  const isSupported =
    typeof window !== 'undefined' &&
    Boolean(
      (window as unknown as IWindow).SpeechRecognition ||
      (window as unknown as IWindow).webkitSpeechRecognition
    )

  // Initialize SpeechRecognition instance
  useEffect(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser. Please use Chrome/Edge or simulated dictation.')
      return
    }

    const win = window as unknown as IWindow
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition

    try {
      const recognition = new SpeechRecognitionClass()
      recognition.continuous = continuous
      recognition.interimResults = true
      recognition.lang = language
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
        setIsListening(true)
        setError(null)
      }

      recognition.onresult = (event: any) => {
        let currentInterim = ''
        let currentFinal = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i]
          if (result.isFinal) {
            currentFinal += result[0].transcript + ' '
          } else {
            currentInterim += result[0].transcript
          }
        }

        if (currentFinal) {
          setTranscript((prev) => {
            const next = prev ? `${prev.trim()} ${currentFinal.trim()}` : currentFinal.trim()
            onTranscriptUpdate?.(next, true)
            return next
          })
          setInterimTranscript('')
        } else {
          setInterimTranscript(currentInterim)
          if (currentInterim) {
            onTranscriptUpdate?.(currentInterim, false)
          }
        }
      }

      recognition.onerror = (event: any) => {
        // 'no-speech' is a common benign event during silent pauses
        if (event.error === 'no-speech') {
          return
        }
        
        let errorMsg = `Speech recognition error: ${event.error}`
        if (event.error === 'not-allowed') {
          errorMsg = 'Microphone permission denied. Please allow microphone access in your browser settings.'
        }
        setError(errorMsg)
        onError?.(errorMsg)
      }

      recognition.onend = () => {
        // If user hasn't explicitly stopped, restart continuous listening
        if (shouldListenRef.current) {
          try {
            recognition.start()
          } catch {
            setIsListening(false)
          }
        } else {
          setIsListening(false)
          setInterimTranscript('')
        }
      }

      recognitionRef.current = recognition
    } catch (err) {
      setError('Failed to initialize speech recognition engine.')
    }

    return () => {
      shouldListenRef.current = false
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch {}
      }
    }
  }, [isSupported, continuous, language, onError, onTranscriptUpdate])

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      setError('Speech recognition is not available.')
      return
    }
    setError(null)
    shouldListenRef.current = true
    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch {
      // If already started, ignore error
    }
  }, [isSupported])

  const stopListening = useCallback(() => {
    shouldListenRef.current = false
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch {}
    }
    setIsListening(false)
    setInterimTranscript('')
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
  }, [])

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  }
}
