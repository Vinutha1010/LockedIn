# 🔒 LockedIn — AI-Powered Mock Interview Platform

<p align="center">
  <img src="Frontend/src/assets/react.svg" alt="LockedIn Logo" width="80" height="80" />
</p>

<h3 align="center">Next-Gen Technical & Behavioral Interview Simulation Platform</h3>

<p align="center">
  Practice technical coding, distributed systems design, and STAR behavioral interviews with real-time AI evaluation, Monaco editor, speech analysis, and dynamic rubric grading.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.x-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Zustand-5.x-443e38?style=for-the-badge" alt="Zustand" />
  <img src="https://img.shields.io/badge/Monaco_Editor-0.4x-007acc?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Monaco Editor" />
</p>

---

## 🌟 Key Features

### 1. 🤖 Dynamic AI Interviewer
- **Live Avatar & Audio Visualization**: Dynamic wave animations reacting to interviewer speech.
- **Realistic Question Progression**: Curated & AI-generated questions covering System Design, DSA, and STAR Behavioral.
- **Contextual Hints & Follow-ups**: On-demand rubric guidance and multi-level hints.

### 2. 💻 Multi-Modal Interview Workspace
- **Monaco Code Editor**: Multi-language code editor (TypeScript, JavaScript, Python, Java, C++, Go) with syntax highlighting and dark theme.
- **STAR Behavioral Response Framework**: Structured speech-to-text recording and note drafting for behavioral rounds.
- **Live Candidate Audio/Video Feed**: Integrated webcam and mic controls with simulated transcription streaming.

### 3. 📊 Deep Rubric Evaluation & Real-time Insights
- **Multi-Dimensional Radar Chart**: Live scoring across Technical Depth, Communication, Problem Solving, and Code Quality via Recharts.
- **Actionable AI Feedback**: Categorized breakdown of Strengths, Growth Areas, and Model Answer recommendations.
- **Pulsing Session Timer**: Dynamic time tracking with threshold warnings (<5m warning, <2m critical pulse).

### 4. 🎯 Track & Seniority Selection
- **Specialized Domains**:
  - 🌐 *Distributed System Design* (Rate limiters, caching, sharding, consensus)
  - ⚡ *Data Structures & Algorithms* (Two pointers, DP, graphs, trees)
  - 🗣️ *STAR Behavioral & Leadership* (Conflict resolution, engineering leadership)
  - 🔄 *Full Technical Loop* (Comprehensive 45-minute multi-part interview)
- **Seniority Levels**: Junior (0-2 Yrs), Mid-Level (2-5 Yrs), Senior (5-8 Yrs), Staff/Principal (8+ Yrs).

---

## 🏗️ Project Architecture

```
LockedIN/
├── Frontend/                      # React 19 + TypeScript + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── interview/
│   │   │   │   ├── Timer.tsx              # Interactive warning timer & controls
│   │   │   │   └── FeedbackPanel.tsx      # AI evaluation radar chart & rubric
│   │   │   └── ui/                        # Reusable design system primitives
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx              # Track & seniority configuration launchpad
│   │   │   └── InterviewRoom.tsx          # Full interactive split interview screen
│   │   ├── store/
│   │   │   └── useInterviewStore.ts       # Zustand interview lifecycle state store
│   │   ├── types/
│   │   │   └── index.ts                   # Complete TypeScript domain typings
│   │   ├── lib/
│   │   │   └── utils.ts                   # Tailwind merge & clsx utility (cn)
│   │   ├── App.tsx                        # Router configuration
│   │   ├── index.css                      # Dark slate theme tokens & glassmorphism
│   │   └── main.tsx                       # React root mount
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.ts
├── Backend/                       # Express + PostgreSQL + Prisma API (in progress)
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vinutha1010/LockedIn.git
   cd LockedIn
   ```

2. **Install frontend dependencies**:
   ```bash
   cd Frontend
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:5173](http://localhost:5173) to start an interview session.

### Building for Production
```bash
npm run build
```

---

## 🛣️ Roadmap

- [x] **Phase 1**: Frontend Core, Dark Slate Design System, Monaco Editor, Zustand Store, AI Feedback Drawer, and Interview Room.
- [x] **Phase 2**: Post-Interview Comprehensive Report page (`/report/:id`) with PDF export & hiring recommendation badges.
- [x] **Phase 3**: Question Bank & Practice Library (`/questions`) with multi-track search, problem drawer & custom playlists.
- [x] **Phase 4**: Web Speech API integration (real voice-to-text, AI voice narration, webcam stream & Web Audio visualizer, Locky AI Mascot).
- [x] **Phase 5**: Backend API & AI Intelligence Engine (Node.js, Express, Prisma ORM, SQLite/PostgreSQL, Google Gemini 2.0/1.5 Flash rubric grading, multi-language sandbox).

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
