# 🔒 LockedIn — AI-Powered Mock Interview Platform

<p align="center">
  <img src="Frontend/src/assets/locky.jpg" alt="LockedIn Mascot" width="120" style="border-radius: 20px; box-shadow: 0 0 25px rgba(6, 182, 212, 0.4);" />
</p>

<h2 align="center">Next-Gen Full-Stack Technical & Behavioral Interview Simulation Platform</h2>

<p align="center">
  Practice algorithmic coding, pattern programming, CS fundamentals, and quantitative aptitude with real-time in-browser code execution, AI evaluation, Monaco editor, speech analysis, and interactive 4-choice MCQ workspaces with mathematical derivations.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma_ORM-5.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Google_Gemini-AI-orange?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Monaco_Editor-0.4x-007acc?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Monaco Editor" />
</p>

---

## 🌟 Key Features

### 1. 🤖 Dual-Mode Interview Experience
- **Monaco Code Editor for Technical Rounds**: Full-featured IDE with syntax highlighting, multi-language support, custom keybindings, and real-time execution.
- **Interactive MCQ Workspace for Aptitude & Core CS**: 4-choice selectable cards (`A`, `B`, `C`, `D`) with keyboard hotkeys, mathematical calculation scratchpad, voice dictation, and a toggle for step-by-step formula derivations.
- **Multimodal AI Interviewer**: Live audio synthesis via Web Speech API and voice transcription.

### 2. ⚡ In-Browser Safe Sandboxed Code Runner
- **Zero-Latency Execution**: In-browser JavaScript sandbox with AST TypeScript stripping.
- **Timeout Protection**: 3000ms infinite-loop safeguard.
- **Live Test-Case Verification**: Multi-case automated runner reporting execution time, formatted output matching, and pass/fail indicators.

### 3. 📚 191+ Curated Problem Library Across 5 Specialized Tracks
- **🔷 Pattern Programming**: 14 classic & complex matrix/star patterns (Diamond, Pascal's Triangle, Floyd's Triangle, Spiral Matrix, Cross X, Zig-Zag, etc.).
- **⚡ Data Structures & Algorithms**: 75 problems covering Kadane's, Sliding Window, Two Pointers, Linked Lists, Stacks, Binary Trees, Graphs, Dynamic Programming, and Backtracking (N-Queens, Sudoku).
- **🧠 CS Fundamentals**: 15 high-yield MCQs covering Operating Systems (Deadlocks, Process States, Virtual Memory), DBMS (ACID, B+ Trees, BCNF, WAL), Computer Networks (TCP Handshake, DNS, OSI), and OOP (LSP, Polymorphism).
- **💻 Practical Coding**: 15 MCQs covering JavaScript Event Loop microtasks, Hoisting/TDZ, `this` binding, closures, and Master Theorem complexity analysis.
- **🎯 Quantitative & Logical Aptitude**: 70 MCQs covering Time & Work, Speed-Distance, Probability, Seating Arrangements, and Verbal Reasoning.

### 4. 📊 Multi-Dimensional Performance Evaluation
- **Instant Rubric Scoring**: Weighted grading across Technical Depth, Problem Solving, Communication, and Code Quality.
- **Comprehensive Feedback**: Strengths, weaknesses, optimization tips, and full reference solutions.

---

## 🏗️ Architecture & Project Structure

```
LockedIN/
├── Frontend/                 # React 19 + Vite + TypeScript + TailwindCSS
│   ├── src/
│   │   ├── components/       # Interview room, MCQ workspace, Monaco editor, modals
│   │   ├── data/             # 191 structured questions dataset
│   │   ├── lib/              # Sandboxed codeRunner & evaluator engines
│   │   ├── pages/            # Dashboard, Questions Hub, Live Room, Performance Report
│   │   ├── store/            # Zustand interview state store
│   │   └── types/            # TypeScript interfaces
│   └── vercel.json           # SPA rewrite routing for Vercel
│
└── Backend/                  # Node.js + Express + Prisma ORM
    ├── prisma/               # Database schema & 191-question seed script
    └── src/
        ├── controllers/      # Question & interview AI evaluation handlers
        ├── routes/           # REST API endpoints
        └── services/         # Google Gemini AI intelligence service
```

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js 18+ & npm

### 1. Start the Backend API
```bash
cd Backend
npm install
npm run build      # Generates Prisma client, pushes SQLite schema, and seeds 191 questions
npm run dev        # Starts server on http://localhost:5000
```

### 2. Start the Frontend Client
```bash
cd Frontend
npm install
npm run dev        # Starts Vite dev server on http://localhost:5173
```

---

## 🌐 1-Click Deployment Guide

### A. Deploy Frontend to Vercel (Free)
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your `LockedIn` repository.
4. Set **Root Directory** to `Frontend`.
5. Add Environment Variable (optional, if backend deployed):
   - `VITE_API_URL`: `https://your-backend.onrender.com/api`
6. Click **Deploy**.

### B. Deploy Backend to Render (Free)
1. Go to [Render](https://render.com) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Set **Root Directory** to `Backend`.
4. Configure:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `GEMINI_API_KEY`: *(Your Google AI Studio API key)*
6. Click **Create Web Service**.
