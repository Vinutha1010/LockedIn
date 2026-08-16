import { useState, useEffect, useRef, useCallback } from 'react'

interface AudioVisualizerHookOptions {
  barsCount?: number
  smoothingTimeConstant?: number
  fftSize?: number
}

interface AudioVisualizerHookResult {
  frequencyData: number[]
  isAnalyzing: boolean
  startVisualizer: () => Promise<void>
  stopVisualizer: () => void
  volumeLevel: number
}

export function useAudioVisualizer({
  barsCount = 7,
  smoothingTimeConstant = 0.8,
  fftSize = 64,
}: AudioVisualizerHookOptions = {}): AudioVisualizerHookResult {
  const [frequencyData, setFrequencyData] = useState<number[]>(() =>
    new Array(barsCount).fill(15)
  )
  const [volumeLevel, setVolumeLevel] = useState<number>(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const stopVisualizer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {})
      audioCtxRef.current = null
    }
    setIsAnalyzing(false)
    setFrequencyData(new Array(barsCount).fill(15))
    setVolumeLevel(0)
  }, [barsCount])

  const startVisualizer = useCallback(async () => {
    stopVisualizer()

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })

      streamRef.current = stream

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const analyser = ctx.createAnalyser()
      analyser.fftSize = fftSize
      analyser.smoothingTimeConstant = smoothingTimeConstant
      analyserRef.current = analyser

      const source = ctx.createMediaStreamSource(stream)
      source.connect(analyser)

      setIsAnalyzing(true)

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const render = () => {
        if (!analyserRef.current) return

        analyserRef.current.getByteFrequencyData(dataArray)

        // Calculate average volume
        let total = 0
        for (let i = 0; i < bufferLength; i++) {
          total += dataArray[i]
        }
        const avg = total / bufferLength
        setVolumeLevel(Math.min(100, Math.round((avg / 128) * 100)))

        // Sample bars across the frequency spectrum
        const step = Math.max(1, Math.floor(bufferLength / barsCount))
        const bars: number[] = []

        for (let i = 0; i < barsCount; i++) {
          const sampleIndex = Math.min(i * step, bufferLength - 1)
          const value = dataArray[sampleIndex]
          // Normalize to 15% - 100%
          const normalized = Math.max(15, Math.min(100, Math.round((value / 255) * 100)))
          bars.push(normalized)
        }

        setFrequencyData(bars)
        animationFrameRef.current = requestAnimationFrame(render)
      }

      render()
    } catch {
      setIsAnalyzing(false)
    }
  }, [barsCount, fftSize, smoothingTimeConstant, stopVisualizer])

  useEffect(() => {
    return () => {
      stopVisualizer()
    }
  }, [stopVisualizer])

  return {
    frequencyData,
    isAnalyzing,
    startVisualizer,
    stopVisualizer,
    volumeLevel,
  }
}
