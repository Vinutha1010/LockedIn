import { Router } from 'express'
import { getAiHint, chatWithLocky } from '../controllers/aiController.js'

export const aiRouter = Router()

aiRouter.post('/hint', getAiHint)
aiRouter.post('/chat', chatWithLocky)
