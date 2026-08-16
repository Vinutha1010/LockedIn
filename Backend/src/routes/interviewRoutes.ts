import { Router } from 'express'
import {
  startSession,
  submitQuestionAnswer,
  completeSession,
  getSessionReport,
} from '../controllers/interviewController.js'

export const interviewRouter = Router()

interviewRouter.post('/start', startSession)
interviewRouter.post('/:id/submit', submitQuestionAnswer)
interviewRouter.post('/:id/complete', completeSession)
interviewRouter.get('/:id/report', getSessionReport)
