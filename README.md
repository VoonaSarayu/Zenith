<div align="center">

```
                  ███████╗███████╗███╗   ██╗██╗████████╗██╗  ██╗
                  ╚══███╔╝██╔════╝████╗  ██║██║╚══██╔══╝██║  ██║
                    ███╔╝ █████╗  ██╔██╗ ██║██║   ██║   ███████║
                   ███╔╝  ██╔══╝  ██║╚██╗██║██║   ██║   ██╔══██║
                  ███████╗███████╗██║ ╚████║██║   ██║   ██║  ██║
                  ╚══════╝╚══════╝╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝  ╚═╝
```
**Premium AI-Powered Wellness & Physiological Telemetry Dashboard**

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Groq](https://img.shields.io/badge/Groq-LPU_Engine-F55036?style=flat-square)](https://groq.com)
[![Llama](https://img.shields.io/badge/Llama_3.3-70B-0452C8?style=flat-square)](https://ai.meta.com/llama/)

</div>

---
<img width="1881" height="984" alt="image" src="https://github.com/user-attachments/assets/0dd7bee4-2e14-45cb-b33e-4d27714e0371" />

## What is Zenith?

Zenith is a **predictive physiological dashboard and AI wellness coach** built to mirror the premium ecosystem of Samsung Health. It transforms raw biometrics—like sleep architecture, heart rate variability, and step cadence—into actionable behavioral protocols.

Instead of generic advice, Zenith features **Zenith Intelligence**, a built-in GenAI wellness coach that analyzes your specific weekly data array using ultra-fast LLM inference to provide hyper-personalized insights.

---

## Core Technology: Zenith Intelligence

At the heart of the dashboard is a robust Retrieval-Augmented Generation (RAG) pipeline powered by **Meta's Llama 3.3 70B** running on **Groq LPUs** for zero-latency responses. 

### Key Breakthroughs
*   **Data-Grounded RAG:** The AI operates exclusively on a contextual injection of the user's weekly biometric JSON file. It does not hallucinate physical data.
*   **Zero-Latency Inference:** Hosted on Groq's specialized Language Processing Units, Zenith provides instant real-time conversational responses.
*   **Absolute Safety Guardrails:** Implements a strict, deterministic backend kill-switch to enforce ethical and medical boundaries.

---

## How It Works (GenAI Architecture)

```
User asks a health question in the Chat UI
         │
         ▼
  Frontend (Next.js) grabs the real-world
  dashboard_data_weekly.json file
         │
         ▼
  API Route injects the JSON data into a 
  strict 6-Element System Prompt (RAG)
         │
         ▼
  Groq Engine (Llama 3.3 70B)
  processes the prompt and formulates a reply
         │
         ▼
  Is the user asking for medical advice or being toxic?
  ├── YES → AI outputs [TERMINATE_SESSION] token
  │         Backend intercepts it, sets isTerminated=true
  │         Frontend permanently LOCKS the UI (Red Alert)
  │
  └── NO  → AI outputs clean, personalized wellness advice.
         │
         ▼
  Frontend renders the message instantly.
```

---

## Architecture

Zenith is split into three core layers:

### The Frontend Dashboard (`frontend/`)
A buttery-smooth, premium user interface utilizing GSAP and Lenis for fluid animations and scrolling. 
- **Stack:** Next.js, React, Tailwind CSS, Recharts (for dynamic graphs), GSAP, Lenis.

### The GenAI Layer (`frontend/src/app/api/`)
A secure Next.js serverless route that acts as the broker between the frontend UI and the Groq LLM inference endpoints. It handles the strict prompt engineering and intercepts all responses to enforce safety guardrails.
- **Stack:** Next.js Route Handlers, Groq API.

### The Data Science Node (`backend/`)
A purely Python-based environment meant for exploratory data analysis (EDA), generating mock physiological arrays, and rendering static Matplotlib charts.
- **Stack:** Python, Jupyter, Pandas, Matplotlib.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Groq API Key

### 1. Clone & Setup Frontend

```bash
git clone https://github.com/projectakshith/Zenith.git
cd Zenith/frontend
npm install
```

### 2. Environment Variables

Create a `.env.local` file inside the `frontend/` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 2. Frontend Setup (Next.js)

Navigate to the frontend folder, install the required dependencies, and start the development server:

```bash
npm run dev
```

To access the application, open the following URL in your browser:

```text
http://localhost:3000
```


---

## Security & Ethics (The Kill Switch)

Zenith strictly adheres to the principle that AI should **augment, not replace, medical professionals**. 

The system prompt contains ironclad constraints. If a user attempts to solicit medical diagnoses, medication advice, or exhibits a medical emergency, the LLM is instructed to deploy a `[TERMINATE_SESSION]` token. The Next.js backend intercepts this token, refuses to pass the message to the user, and triggers a hard frontend lockdown state—permanently disabling the chat input for that session to prevent any liability or harm.
