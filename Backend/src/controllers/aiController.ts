import type { Request, Response } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '../config/env.js'

const genAI = env.GEMINI_API_KEY ? new GoogleGenerativeAI(env.GEMINI_API_KEY) : null

export async function getAiHint(req: Request, res: Response): Promise<void> {
  try {
    const { questionTitle, questionDescription, currentCode, hintLevel = 1 } = req.body

    if (!genAI) {
      res.json({
        success: true,
        data: {
          hint: `Hint (Level ${hintLevel}): Consider using a Hash Map to store elements as you iterate. For each element, check if the complement (target - num) has already been seen!`,
        },
      })
      return
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = `You are an AI Interview Coach helping a candidate who requested a Hint (Level ${hintLevel} out of 3).
Question: ${questionTitle}
Description: ${questionDescription}
Candidate Code So Far:
\`\`\`
${currentCode || '// Empty editor'}
\`\`\`

Give a Socratic, gentle hint (2-3 sentences max) that guides them towards the right direction WITHOUT giving away the full code solution.`

    const response = await model.generateContent(prompt)
    const hint = response.response.text()

    res.json({ success: true, data: { hint } })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to generate AI hint' })
  }
}

export async function chatWithLocky(req: Request, res: Response): Promise<void> {
  try {
    const { message, context } = req.body

    if (!genAI) {
      res.json({
        success: true,
        data: {
          reply: `Hey! Locky here 🔒. When working on algorithms, always state your brute-force first, then optimize with Hash Maps or Two Pointers!`,
        },
      })
      return
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = `You are Locky 🤖🔒, the cute, super helpful, encouraging, and razor-sharp AI mock interview mascot and copilot for the LockedIn platform.
Current Context:
- Active Question: ${context?.questionTitle || 'General'}
- Active Language: ${context?.language || 'typescript'}
- Active Code: ${context?.code || 'None'}

User Message: "${message}"

Respond as Locky with emojis, high clarity, and concise actionable interview advice (markdown format, bullet points where appropriate). Keep under 150 words.`

    const response = await model.generateContent(prompt)
    const reply = response.response.text()

    res.json({ success: true, data: { reply } })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to chat with Locky' })
  }
}
