import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma.js'

export async function getQuestions(req: Request, res: Response): Promise<void> {
  try {
    const { roundType, difficulty, category } = req.query

    const where: any = {}
    if (roundType) where.roundType = String(roundType)
    if (difficulty) where.difficulty = String(difficulty)
    if (category) where.category = String(category)

    const questions = await prisma.question.findMany({
      where,
      orderBy: { id: 'asc' },
    })

    const parsed = questions.map((q) => ({
      ...q,
      tags: q.tags ? JSON.parse(q.tags) : [],
      companyTags: q.companyTags ? JSON.parse(q.companyTags) : [],
      hints: q.hints ? JSON.parse(q.hints) : [],
      languageStarterCodes: q.languageStarterCodes ? JSON.parse(q.languageStarterCodes) : {},
      testCases: q.testCases ? JSON.parse(q.testCases) : [],
      rubricCriteria: q.rubricCriteria ? JSON.parse(q.rubricCriteria) : [],
    }))

    res.json({ success: true, count: parsed.length, data: parsed })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch questions' })
  }
}

export async function getQuestionById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const question = await prisma.question.findUnique({
      where: { id },
    })

    if (!question) {
      res.status(404).json({ success: false, error: 'Question not found' })
      return
    }

    const parsed = {
      ...question,
      tags: question.tags ? JSON.parse(question.tags) : [],
      companyTags: question.companyTags ? JSON.parse(question.companyTags) : [],
      hints: question.hints ? JSON.parse(question.hints) : [],
      languageStarterCodes: question.languageStarterCodes ? JSON.parse(question.languageStarterCodes) : {},
      testCases: question.testCases ? JSON.parse(question.testCases) : [],
      rubricCriteria: question.rubricCriteria ? JSON.parse(question.rubricCriteria) : [],
    }

    res.json({ success: true, data: parsed })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch question' })
  }
}
