import { useState, useEffect, useRef, useCallback } from 'react'

interface CameraStreamHookResult {
  isStreaming: boolean
  hasPermission: boolean
  error: string | null
  videoRef: React.RefObject<HTMLVideoElement | null>
  startStream: () => Promise<void>
  stopStream: () => void
}

export function useCameraStream(autoStart = false): CameraStreamHookResult {
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
  }, [])

  const startStream = useCallback(async () => {
    setError(null)
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setError('Webcam is not supported in this browser.')
      return
    }

    try {
      // Stop existing stream if any
      stopStream()

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: false, // Audio is managed separately by speech recognition / audio visualizer
      })

      streamRef.current = stream
      setHasPermission(true)
      setIsStreaming(true)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play().catch(() => {})
      }
    } catch (err: any) {
      let errorMsg = 'Failed to access camera.'
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg = 'Camera permission was denied. Please allow camera access in your browser settings.'
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMsg = 'No camera device found on this system.'
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMsg = 'Camera is already in use by another application.'
      }
      setError(errorMsg)
      setIsStreaming(false)
    }
  }, [stopStream])

  // Attach stream when videoRef mounts or updates
  useEffect(() => {
    if (isStreaming && streamRef.current && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = streamRef.current
      videoRef.current.play().catch(() => {})
    }
  }, [isStreaming])

  useEffect(() => {
    if (autoStart) {
      startStream()
    }
    return () => {
      stopStream()
    }
  }, [autoStart, startStream, stopStream])

  return {
    isStreaming,
    hasPermission,
    error,
    videoRef,
    startStream,
    stopStream,
  }
}
