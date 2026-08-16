import { Router } from 'express'
import { questionRouter } from './questionRoutes.js'
import { interviewRouter } from './interviewRoutes.js'
import { aiRouter } from './aiRoutes.js'

export const apiRouter = Router()

// Root API Landing & Documentation Index
apiRouter.get('/', (req, res) => {
  // If requested from browser (HTML), render a sleek status dashboard
  if (req.accepts('html')) {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LockedIn AI Backend & Gemini Engine</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0f17; color: #e2e8f0; margin: 0; padding: 40px 20px; display: flex; justify-content: center; }
    .card { max-width: 760px; width: 100%; background: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 32px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: #064e3b; color: #34d399; border: 1px solid #059669; }
    h1 { margin: 16px 0 8px 0; font-size: 26px; color: #fff; display: flex; align-items: center; gap: 10px; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 24px 0; }
    .stat { background: #1f2937; padding: 14px; border-radius: 10px; border: 1px solid #374151; }
    .stat-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 600; }
    .stat-val { font-size: 15px; color: #38bdf8; font-weight: 700; margin-top: 4px; }
    .endpoints { margin-top: 24px; }
    .endpoint { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; margin-bottom: 8px; font-family: monospace; font-size: 13px; }
    .method { font-weight: 700; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
    .get { background: #0369a1; color: #e0f2fe; }
    .post { background: #4338ca; color: #e0e7ff; }
    a { color: #38bdf8; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">🟢 System Online & Operational</div>
    <h1>🔒 LockedIn Backend & AI Intelligence Engine</h1>
    <p>High-performance Node.js / Express / Prisma / Google Gemini 2.0 AI API powering real-time code evaluation, Socratic hints, and post-interview analytics.</p>
    
    <div class="grid">
      <div class="stat"><div class="stat-label">AI Engine</div><div class="stat-val">Google Gemini 2.0 / 1.5 Flash</div></div>
      <div class="stat"><div class="stat-label">Database</div><div class="stat-val">Prisma ORM (SQLite / Postgres)</div></div>
      <div class="stat"><div class="stat-label">Frontend Client</div><div class="stat-val"><a href="http://localhost:5173" target="_blank">http://localhost:5173</a></div></div>
    </div>

    <div class="endpoints">
      <h3 style="color: #f1f5f9; font-size: 15px; margin-bottom: 12px;">Active REST Endpoints</h3>
      <div class="endpoint"><div><span class="method get">GET</span> <a href="/api/health">/api/health</a></div><span style="color:#64748b;">Service Status</span></div>
      <div class="endpoint"><div><span class="method get">GET</span> <a href="/api/questions">/api/questions</a></div><span style="color:#64748b;">Question Bank & Test Cases</span></div>
      <div class="endpoint"><div><span class="method post">POST</span> <span>/api/interviews/start</span></div><span style="color:#64748b;">Initialize Interview</span></div>
      <div class="endpoint"><div><span class="method post">POST</span> <span>/api/interviews/:id/submit</span></div><span style="color:#64748b;">Gemini AI Code Evaluation</span></div>
      <div class="endpoint"><div><span class="method post">POST</span> <span>/api/interviews/:id/complete</span></div><span style="color:#64748b;">Diagnostic Report Generator</span></div>
      <div class="endpoint"><div><span class="method post">POST</span> <span>/api/ai/hint</span></div><span style="color:#64748b;">Socratic Hint Assistant</span></div>
      <div class="endpoint"><div><span class="method post">POST</span> <span>/api/ai/chat</span></div><span style="color:#64748b;">Locky Mascot Copilot</span></div>
    </div>
  </div>
</body>
</html>`)
    return
  }

  res.json({
    status: 'online',
    service: 'LockedIn Backend AI Engine',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      questions: 'GET /api/questions',
      startInterview: 'POST /api/interviews/start',
      submitAnswer: 'POST /api/interviews/:id/submit',
      completeInterview: 'POST /api/interviews/:id/complete',
      getReport: 'GET /api/interviews/:id/report',
      aiHint: 'POST /api/ai/hint',
      lockyChat: 'POST /api/ai/chat',
    },
  })
})

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'LockedIn Backend AI Engine',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  })
})

apiRouter.use('/questions', questionRouter)
apiRouter.use('/interviews', interviewRouter)
apiRouter.use('/ai', aiRouter)
