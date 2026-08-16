import { Router } from 'express'
import { getQuestions, getQuestionById } from '../controllers/questionController.js'

export const questionRouter = Router()

questionRouter.get('/', getQuestions)
questionRouter.get('/:id', getQuestionById)
