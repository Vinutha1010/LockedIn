import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env.js'
import { apiRouter } from './routes/index.js'

const app = express()

// Security & Middleware
app.use(helmet())
app.use(
  cors({
    origin: [env.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Root redirect
app.get('/', (_req, res) => res.redirect('/api'))

// Mount API router
app.use('/api', apiRouter)

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err)
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  })
})

const PORT = parseInt(env.PORT, 10) || 5000

app.listen(PORT, () => {
  console.log(`
🚀 LockedIn Backend & Gemini AI Engine is running!
📡 Server URL: http://localhost:${PORT}
🩺 Health Check: http://localhost:${PORT}/api/health
📚 API Base: http://localhost:${PORT}/api
  `)
})
