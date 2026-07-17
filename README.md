# Zenith — Smart Weekly Wellness Dashboard

Zenith is a premium weekly wellness dashboard designed for the Samsung Health ecosystem. It features a Python data science backend (for data generation, cleaning, and EDA) and a Next.js + TypeScript frontend (for interactive biometrics and visual insights).

---

## Repository Structure

```text
Zenith/
├── backend/                       # Data Science, Analytics & Python Backend
│   ├── data/                      # Raw and processed datasets (with README)
│   ├── notebooks/                 # Jupyter Notebooks for EDA & Prototyping
│   ├── scripts/                   # Python automation / data generation scripts
│   │   ├── generate_data.py       # (Empty template) Mock data generator
│   │   └── process_metrics.py     # (Empty template) Aggregates metrics & exports charts
│   ├── charts/                    # Local storage for exported matplotlib charts
│   └── requirements.txt           # Python packages list
│
├── frontend/                      # Web App Interface (Next.js + TypeScript)
│   ├── public/                    # Static assets served by Next.js
│   ├── src/
│   │   ├── app/                   # Next.js pages and globals
│   │   ├── components/            # Reusable React components
│   │   │   ├── ui/                # Base atoms (buttons, cards, etc.)
│   │   │   └── dashboard/         # Metrics, coaching feed, and charts components
│   │   ├── data/                  # Client-side static copies of processed data
│   │   │   └── emilyData.ts       # Emily's 7-day health metrics template
│   │   ├── hooks/                 # Custom React hooks (e.g. useMetrics.ts)
│   │   ├── types/                 # Centralized TypeScript definitions (index.ts)
│   │   └── utils/                 # Frontend helpers (calculations.ts, coaching.ts)
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore                     # Multi-stack gitignore (Python + Node.js)
└── README.md                      # This playbook
```

---

## Setup & Run Instructions

### 1. Backend Setup (Python)
Navigate to the backend folder and set up a virtual environment:
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate      # On Windows (or source .venv/bin/activate on Mac/Linux)
pip insFrontend Setup (Next.js)

Navigate to the frontend folder, install packages, and start the development server:

cd frontend
npm install
npm run dev

Open http://localhost:3000 to view the live dashboard.

The development server supports hot reloading, so changes are reflected instantly in the browser.tall -r requirements.txt
```
To run the data scripts (when implemented):
```bash
python scripts/process_metrics.py
```

### 2. 

---

## Collaborative Guidelines

*   **TypeScript Types:** Keep all shared types and interfaces inside `frontend/src/types/index.ts`. Do not write inline interface declarations in your components.
*   **Path Aliases:** Avoid relative imports like `../../utils/coaching`. Use `@/` path aliases defined in `tsconfig.json` (e.g., `import { CoachingMessage } from '@/types'`).
*   **Git hygiene:** Keep all local cache, dependencies (`node_modules`, `.venv`), and build files (`.next`) untracked. They are already listed in the root `.gitignore`.
