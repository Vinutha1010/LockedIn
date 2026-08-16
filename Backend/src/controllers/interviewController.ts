import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma.js'
import {
  evaluateSubmissionWithGemini,
  generateHolisticReportWithGemini,
} from '../services/geminiService.js'

export async function startSession(req: Request, res: Response): Promise<void> {
  try {
    const {
      candidateName = 'Alex Chen',
      targetRole = 'Software Engineer (SDE)',
      roundType = 'dsa',
      difficulty = 'Medium',
      timeLimitMinutes = 45,
      questionIds,
    } = req.body

    let selectedQIds = questionIds
    if (!selectedQIds || selectedQIds.length === 0) {
      const dbQuestions = await prisma.question.findMany({
        where: { roundType },
        take: 3,
      })
      selectedQIds = dbQuestions.map((q) => q.id)
    }

    const session = await prisma.interviewSession.create({
      data: {
        candidateName,
        targetRole,
        roundType,
        difficulty,
        timeLimitMinutes,
        questionIds: JSON.stringify(selectedQIds),
      },
    })

    res.status(201).json({ success: true, data: session })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to start interview session' })
  }
}

export async function submitQuestionAnswer(req: Request, res: Response): Promise<void> {
  try {
    const { id: sessionId } = req.params
    const {
      questionId,
      submittedCode = '',
      submittedNotes = '',
      language = 'typescript',
      testsPassed = 0,
      testsTotal = 0,
      executionTimeMs = 0,
      timeSpentSeconds = 0,
    } = req.body

    const question = await prisma.question.findUnique({
      where: { id: questionId },
    })

    if (!question) {
      res.status(404).json({ success: false, error: 'Question not found' })
      return
    }

    // Evaluate using Gemini AI
    const evaluation = await evaluateSubmissionWithGemini({
      questionTitle: question.title,
      questionDescription: question.description,
      submittedCode,
      submittedNotes,
      language,
      testsPassed,
      testsTotal,
      expectedTimeComplexity: question.expectedTimeComplexity || undefined,
      expectedSpaceComplexity: question.expectedSpaceComplexity || undefined,
      rubricCriteria: question.rubricCriteria ? JSON.parse(question.rubricCriteria) : undefined,
    })

    // Upsert QuestionAnswer record
    const existingAnswer = await prisma.questionAnswer.findFirst({
      where: { sessionId, questionId },
    })

    let answer
    if (existingAnswer) {
      answer = await prisma.questionAnswer.update({
        where: { id: existingAnswer.id },
        data: {
          submittedCode,
          submittedNotes,
          language,
          testsPassed,
          testsTotal,
          executionTimeMs,
          timeSpentSeconds,
          aiEvaluationScore: evaluation.score,
          aiFeedback: JSON.stringify(evaluation),
          submittedAt: new Date(),
        },
      })
    } else {
      answer = await prisma.questionAnswer.create({
        data: {
          sessionId,
          questionId,
          submittedCode,
          submittedNotes,
          language,
          testsPassed,
          testsTotal,
          executionTimeMs,
          timeSpentSeconds,
          aiEvaluationScore: evaluation.score,
          aiFeedback: JSON.stringify(evaluation),
        },
      })
    }

    res.json({
      success: true,
      data: {
        answerId: answer.id,
        evaluation,
      },
    })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to submit question answer' })
  }
}

export async function completeSession(req: Request, res: Response): Promise<void> {
  try {
    const { id: sessionId } = req.params

    const session = await prisma.interviewSession.findUnique({
      where: { id: sessionId },
      include: {
        answers: {
          include: { question: true },
        },
      },
    })

    if (!session) {
      res.status(404).json({ success: false, error: 'Session not found' })
      return
    }

    // Prepare questions summary for Gemini
    const questionsSummary = session.answers.map((ans) => ({
      title: ans.question.title,
      category: ans.question.category,
      testsPassed: ans.testsPassed,
      testsTotal: ans.testsTotal,
      evaluationScore: ans.aiEvaluationScore || 80,
    }))

    // Generate holistic report
    const reportData = await generateHolisticReportWithGemini({
      candidateName: session.candidateName,
      targetRole: session.targetRole,
      roundType: session.roundType,
      questions: questionsSummary,
    })

    // Upsert report record
    const report = await prisma.interviewReport.upsert({
      where: { sessionId },
      update: {
        overallScore: reportData.overallScore,
        technicalScore: reportData.technicalScore,
        communicationScore: reportData.communicationScore,
        problemSolvingScore: reportData.problemSolvingScore,
        systemDesignScore: reportData.systemDesignScore,
        behavioralScore: reportData.behavioralScore,
        radarScores: JSON.stringify({
          technical: reportData.technicalScore,
          communication: reportData.communicationScore,
          problemSolving: reportData.problemSolvingScore,
          systemDesign: reportData.systemDesignScore,
          behavioral: reportData.behavioralScore,
        }),
        hiringRecommendation: reportData.hiringRecommendation,
        summary: reportData.summary,
        strengths: JSON.stringify(reportData.strengths),
        weaknesses: JSON.stringify(reportData.weaknesses),
        roadmap: JSON.stringify(reportData.roadmap),
      },
      create: {
        sessionId,
        overallScore: reportData.overallScore,
        technicalScore: reportData.technicalScore,
        communicationScore: reportData.communicationScore,
        problemSolvingScore: reportData.problemSolvingScore,
        systemDesignScore: reportData.systemDesignScore,
        behavioralScore: reportData.behavioralScore,
        radarScores: JSON.stringify({
          technical: reportData.technicalScore,
          communication: reportData.communicationScore,
          problemSolving: reportData.problemSolvingScore,
          systemDesign: reportData.systemDesignScore,
          behavioral: reportData.behavioralScore,
        }),
        hiringRecommendation: reportData.hiringRecommendation,
        summary: reportData.summary,
        strengths: JSON.stringify(reportData.strengths),
        weaknesses: JSON.stringify(reportData.weaknesses),
        roadmap: JSON.stringify(reportData.roadmap),
      },
    })

    // Mark session as completed
    await prisma.interviewSession.update({
      where: { id: sessionId },
      data: {
        status: 'completed',
        completedAt: new Date(),
        overallScore: reportData.overallScore,
      },
    })

    res.json({
      success: true,
      data: {
        sessionId,
        report: {
          ...reportData,
          radarScores: {
            technical: reportData.technicalScore,
            communication: reportData.communicationScore,
            problemSolving: reportData.problemSolvingScore,
            systemDesign: reportData.systemDesignScore,
            behavioral: reportData.behavioralScore,
          },
        },
      },
    })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to complete interview session' })
  }
}

export async function getSessionReport(req: Request, res: Response): Promise<void> {
  try {
    const { id: sessionId } = req.params

    const report = await prisma.interviewReport.findUnique({
      where: { sessionId },
      include: {
        session: {
          include: {
            answers: {
              include: { question: true },
            },
          },
        },
      },
    })

    if (!report) {
      res.status(404).json({ success: false, error: 'Report not found' })
      return
    }

    const parsed = {
      ...report,
      radarScores: JSON.parse(report.radarScores),
      strengths: JSON.parse(report.strengths),
      weaknesses: JSON.parse(report.weaknesses),
      roadmap: JSON.parse(report.roadmap),
    }

    res.json({ success: true, data: parsed })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch interview report' })
  }
}
