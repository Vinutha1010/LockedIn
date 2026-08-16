/**
 * Zero-dependency Web Audio API procedural sound effects synthesizer.
 * Generates pleasant, latency-free feedback chimes directly in the browser.
 */

class SoundEffectsEngine {
  private ctx: AudioContext | null = null
  private isEnabled: boolean = true

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  public setSoundEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  public getSoundEnabled(): boolean {
    return this.isEnabled
  }

  /**
   * Warm 2-tone melodic chime when an interview session begins
   */
  public playSessionStart() {
    if (!this.isEnabled) return
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc1.type = 'sine'
    osc2.type = 'triangle'

    // C5 -> G5 upward chime
    osc1.frequency.setValueAtTime(523.25, now)
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.18)

    osc2.frequency.setValueAtTime(261.63, now)
    osc2.frequency.exponentialRampToValueAtTime(392.0, now + 0.18)

    gainNode.gain.setValueAtTime(0.001, now)
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.04)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

    osc1.connect(gainNode)
    osc2.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + 0.5)
    osc2.stop(now + 0.5)
  }

  /**
   * Crisp transition chime when advancing to next question
   */
  public playQuestionAdvance() {
    if (!this.isEnabled) return
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(659.25, now) // E5
    osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.12) // A5

    gainNode.gain.setValueAtTime(0.001, now)
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.03)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.35)
  }

  /**
   * Rewarding chord when submitting code or speech for evaluation
   */
  public playSuccessSubmission() {
    if (!this.isEnabled) return
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime
    const freqs = [523.25, 659.25, 783.99, 1046.5] // C major chord

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.05)

      gainNode.gain.setValueAtTime(0.001, now + idx * 0.05)
      gainNode.gain.linearRampToValueAtTime(0.06, now + idx * 0.05 + 0.03)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4)

      osc.connect(gainNode)
      gainNode.connect(ctx.destination)

      osc.start(now + idx * 0.05)
      osc.stop(now + idx * 0.05 + 0.4)
    })
  }

  /**
   * Subtle alert pulse when remaining time drops below warning threshold
   */
  public playTimerWarning() {
    if (!this.isEnabled) return
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(440.0, now) // A4
    osc.frequency.setValueAtTime(349.23, now + 0.1) // F4

    gainNode.gain.setValueAtTime(0.001, now)
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.25)
  }
}

export const soundEffects = new SoundEffectsEngine()
