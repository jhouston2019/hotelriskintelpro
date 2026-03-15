# Hotel Risk Pro - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HOTEL RISK PRO                              │
│                  Insurance Survivability Platform                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND LAYER                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Landing Page (/)          Intake Wizard (/intake)                 │
│  ┌──────────────┐         ┌────────────────────────┐              │
│  │ Value Prop   │────────▶│ 7-Step Guided Flow     │              │
│  │ Dashboard    │         │ • Hotel Profile        │              │
│  │ Demo         │         │ • Financial Exposure   │              │
│  │ CTA Buttons  │         │ • Insurance Policy     │              │
│  └──────────────┘         │ • Loss History         │              │
│                           │ • Operational Risk     │              │
│                           │ • Location Hazards     │              │
│                           │ • Review & Analyze     │              │
│                           └────────────────────────┘              │
│                                     │                              │
│                                     ▼                              │
│                           ┌────────────────────────┐              │
│                           │  Analysis Trigger      │              │
│                           │  • Normalize Data      │              │
│                           │  • Run Risk Engine     │              │
│                           │  • Save Results        │              │
│                           └────────────────────────┘              │
│                                     │                              │
│                    ┌────────────────┴────────────────┐            │
│                    ▼                                  ▼            │
│         Report Page (/report)          Dashboard (/dashboard)     │
│         ┌──────────────────────┐      ┌──────────────────────┐   │
│         │ 10-Section Report    │      │ Monitoring View      │   │
│         │ • Summary Metrics    │      │ • Current Score      │   │
│         │ • Findings           │      │ • Renewal Countdown  │   │
│         │ • Comparisons        │      │ • Open Issues        │   │
│         │ • Scenarios          │      │ • Update Prompts     │   │
│         │ • Priority Actions   │      │ • Quick Actions      │   │
│         │ • If Nothing Changes │      └──────────────────────┘   │
│         └──────────────────────┘                                  │
│                    │                                               │
│                    ▼                                               │
│         ┌──────────────────────┐                                  │
│         │  User Actions        │                                  │
│         │  • Save Hotel        │──────┐                           │
│         │  • Export PDF        │──────┤                           │
│         │  • Enable Monitoring │──────┤                           │
│         └──────────────────────┘      │                           │
│                                        ▼                           │
│                           ┌────────────────────────┐              │
│                           │  Auth Modal            │              │
│                           │  • Sign Up             │              │
│                           │  • Sign In             │              │
│                           │  • Attach Anonymous    │              │
│                           └────────────────────────┘              │
│                                        │                           │
│                                        ▼                           │
│                           ┌────────────────────────┐              │
│                           │  Subscription Prompt   │              │
│                           │  • $199/month          │              │
│                           │  • $1,999/year         │              │
│                           │  • Feature List        │              │
│                           └────────────────────────┘              │
│                                        │                           │
│                                        ▼                           │
│                           ┌────────────────────────┐              │
│                           │  Stripe Checkout       │              │
│                           └────────────────────────┘              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      ANALYSIS ENGINE LAYER                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Risk Engine (lib/risk-engine/)                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  analyzeHotelRisk(input) → HotelRiskAnalysis                 │ │
│  │                                                               │ │
│  │  Modules:                                                     │ │
│  │  • completeness.js    → Data quality assessment              │ │
│  │  • property.js        → Underinsurance detection             │ │
│  │  • businessInterruption.js → BI shortfall analysis           │ │
│  │  • liability.js       → Liability adequacy                   │ │
│  │  • deductible.js      → Cash stress analysis                 │ │
│  │  • lossHistory.js     → Renewal pressure                     │ │
│  │  • operations.js      → Operational risk flags               │ │
│  │  • hazards.js         → Location risk assessment             │ │
│  │  • scenarios.js       → 4 scenario simulations               │ │
│  │  • priorities.js      → Action prioritization                │ │
│  │  • score.js           → Survivability score (0-100)          │ │
│  │  • narrative.js       → Plain-English generation             │ │
│  │                                                               │ │
│  │  Output: Complete analysis with findings, scores, actions    │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER (Ready to Implement)               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Database (PostgreSQL)                                             │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  Tables:                                                      │ │
│  │  • users                  • insurance_policies                │ │
│  │  • anonymous_sessions     • loss_runs                         │ │
│  │  • hotels                 • operational_risk_profiles         │ │
│  │  • financial_profiles     • hazard_profiles                   │ │
│  │  • uploaded_documents     • analyses                          │ │
│  │  • subscriptions          • monitoring_alerts                 │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  API Routes (lib/api-examples/ → pages/api/)                       │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  POST /api/draft/save           - Save wizard progress       │ │
│  │  POST /api/analysis/run         - Run analysis               │ │
│  │  POST /api/upload/document      - Upload files               │ │
│  │  POST /api/auth/signup          - User registration          │ │
│  │  POST /api/auth/signin          - User login                 │ │
│  │  POST /api/billing/create-checkout - Start subscription      │ │
│  │  POST /api/billing/webhook      - Process Stripe events      │ │
│  │  GET  /api/pdf/export           - Generate PDF               │ │
│  │  GET  /api/dashboard/data       - Fetch monitoring data      │ │
│  │  POST /api/hotel/quick-update   - Quick updates              │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  Services                                                          │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  Session Management (lib/session/)                           │ │
│  │  • Anonymous session creation                                │ │
│  │  • Draft persistence                                         │ │
│  │  • Session-to-user conversion                                │ │
│  │                                                               │ │
│  │  Auth Provider (lib/auth/)                                   │ │
│  │  • User registration                                         │ │
│  │  • Authentication                                            │ │
│  │  • Session management                                        │ │
│  │                                                               │ │
│  │  Document Handling (lib/uploads/, lib/parser/)               │ │
│  │  • File storage (S3/Cloudinary)                              │ │
│  │  • Document parsing (Textract/Vision)                        │ │
│  │  • Manual + parsed merge                                     │ │
│  │                                                               │ │
│  │  Analysis Orchestrator (lib/analysis/)                       │ │
│  │  • Data fetching and normalization                           │ │
│  │  • Engine execution                                          │ │
│  │  • Result persistence                                        │ │
│  │                                                               │ │
│  │  Billing (lib/billing/)                                      │ │
│  │  • Stripe checkout                                           │ │
│  │  • Webhook processing                                        │ │
│  │  • Subscription management                                   │ │
│  │                                                               │ │
│  │  Entitlements (lib/entitlements/)                            │ │
│  │  • Feature access control                                    │ │
│  │  • Free vs paid gating                                       │ │
│  │                                                               │ │
│  │  PDF Export (lib/pdf/)                                       │ │
│  │  • Report generation                                         │ │
│  │  • Professional formatting                                   │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     EXTERNAL SERVICES (Future)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Stripe                    AWS/Cloud Services                      │
│  ┌──────────────┐         ┌──────────────────────┐                │
│  │ Subscriptions│         │ S3 Storage           │                │
│  │ Checkout     │         │ Textract Parsing     │                │
│  │ Webhooks     │         │ (or alternatives)    │                │
│  └──────────────┘         └──────────────────────┘                │
│                                                                     │
│  Email Service             Monitoring                              │
│  ┌──────────────┐         ┌──────────────────────┐                │
│  │ SendGrid     │         │ Sentry               │                │
│  │ Postmark     │         │ PostHog              │                │
│  │ (optional)   │         │ (optional)           │                │
│  └──────────────┘         └──────────────────────┘                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────────┐
│   User       │
│   Visits     │
│   Landing    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Clicks "Analyze My Hotel Insurance"        │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Anonymous Session Created                   │
│  • sessionId generated                       │
│  • 7-day expiration                          │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Intake Wizard (7 Steps)                     │
│                                              │
│  Step 1: Hotel Profile                       │
│  Step 2: Financial Exposure                  │
│  Step 3: Insurance Policy + Upload           │
│  Step 4: Loss History + Upload               │
│  Step 5: Operational Risk                    │
│  Step 6: Location Hazards                    │
│  Step 7: Review & Analyze                    │
│                                              │
│  After each step:                            │
│  • Auto-save to localStorage                 │
│  • [Future] Save to backend draft            │
└──────┬───────────────────────────────────────┘
       │
       ▼ (if documents uploaded)
┌──────────────────────────────────────────────┐
│  Document Processing                         │
│  • Upload to storage                         │
│  • Trigger parsing job                       │
│  • Extract policy data                       │
│  • Populate form fields                      │
│  • Show "Parsed from document" badges        │
│  • Allow manual override                     │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  User Clicks "Run My Survivability Analysis" │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Analysis Orchestrator                       │
│  1. Fetch complete hotel data                │
│  2. Fetch parsed document data               │
│  3. Merge manual + parsed values             │
│  4. Normalize for risk engine                │
│  5. Execute analyzeHotelRisk(input)          │
│  6. Save analysis result                     │
│  7. Generate monitoring alerts               │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Risk Engine Processing                      │
│                                              │
│  Input:                                      │
│  • HotelProfile                              │
│  • FinancialProfile                          │
│  • PolicyProfile                             │
│  • LossRuns[]                                │
│  • OperationalRiskProfile                    │
│  • HazardProfile                             │
│                                              │
│  Analysis:                                   │
│  • Completeness check                        │
│  • Property coverage analysis                │
│  • Business interruption analysis            │
│  • Liability analysis                        │
│  • Deductible stress                         │
│  • Loss history patterns                     │
│  • Operational risk flags                    │
│  • Hazard assessment                         │
│  • Scenario generation (4 scenarios)         │
│  • Priority action ranking                   │
│  • Survivability score (0-100)               │
│  • Plain-English narratives                  │
│                                              │
│  Output:                                     │
│  • HotelRiskAnalysis (complete)              │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Survivability Report Display                │
│  • 4 key metrics in hero cards               │
│  • 10 detailed sections                      │
│  • Plain-English findings                    │
│  • Priority actions with urgency             │
│  • "If Nothing Changes" warning              │
│  • 3 action buttons                          │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  User Clicks Action Button                   │
│  • Download PDF                              │
│  • Save Hotel                                │
│  • Enable Monitoring                         │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Entitlement Check                           │
│  • Is user authenticated?                    │
│  • Does user have subscription?              │
└──────┬───────────────────────────────────────┘
       │
       ├─ Not authenticated ──▶ Show Auth Modal
       │                              │
       │                              ▼
       │                    ┌──────────────────┐
       │                    │  User Signs Up   │
       │                    │  • Create account│
       │                    │  • Attach anon   │
       │                    │    session data  │
       │                    └────────┬─────────┘
       │                             │
       ├─────────────────────────────┘
       │
       ├─ No subscription ──▶ Show Subscription Prompt
       │                              │
       │                              ▼
       │                    ┌──────────────────┐
       │                    │  Stripe Checkout │
       │                    │  • Select plan   │
       │                    │  • Enter payment │
       │                    └────────┬─────────┘
       │                             │
       │                             ▼
       │                    ┌──────────────────┐
       │                    │  Webhook Handler │
       │                    │  • Create sub    │
       │                    │  • Unlock features│
       │                    └────────┬─────────┘
       │                             │
       ├─────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Feature Unlocked                            │
│  • PDF exported                              │
│  • Hotel saved                               │
│  • Monitoring enabled                        │
└──────┬───────────────────────────────────────┘
       │
       ▼ (if monitoring enabled)
┌──────────────────────────────────────────────┐
│  Monitoring Dashboard                        │
│  • Current survivability score               │
│  • Renewal countdown                         │
│  • Open priority issues                      │
│  • Risk monitoring cards                     │
│  • Update prompts                            │
│  • Quick update modals                       │
└──────┬───────────────────────────────────────┘
       │
       ▼ (user makes quick update)
┌──────────────────────────────────────────────┐
│  Quick Update Flow                           │
│  • Add new claim                             │
│  • Update revenue                            │
│  • Update property                           │
│  • Save to backend                           │
│  • Re-run analysis                           │
│  • Refresh dashboard                         │
└──────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App (_app.js)
│
├─ Landing Page (index.js)
│  └─ Hero, Features, Pricing, CTAs
│
├─ Analyze Entry (analyze.js)
│  └─ Redirects to /intake
│
├─ Intake Flow (intake.js)
│  └─ IntakeWizard
│     ├─ Progress Header
│     ├─ Save Button
│     └─ Step Components
│        ├─ BasicHotelProfile
│        ├─ FinancialExposure
│        ├─ InsurancePolicyInput
│        │  └─ Document Upload + Parsing UI
│        ├─ LossHistory
│        ├─ OperationalRisk
│        ├─ LocationHazard
│        └─ ReviewAnalyze
│
├─ Report Page (report.js)
│  ├─ SurvivabilityReportV2
│  │  ├─ Report Header
│  │  ├─ Summary Metrics (4 cards)
│  │  ├─ Findings Section
│  │  ├─ Comparisons Section
│  │  ├─ BI Reality Section
│  │  ├─ Loss History Section
│  │  ├─ Operations Section
│  │  ├─ Hazards Section
│  │  ├─ Priority Actions (ranked)
│  │  ├─ If Nothing Changes
│  │  └─ Action Buttons
│  ├─ AuthModal (conditional)
│  └─ SubscriptionPrompt (conditional)
│
├─ Dashboard (dashboard.js)
│  └─ MonitoringDashboard
│     ├─ Header with hotel name
│     ├─ Key Metrics (4 cards)
│     ├─ Risk Monitoring Cards (6 cards)
│     ├─ Update Prompts (3 questions)
│     ├─ Quick Actions
│     └─ QuickUpdateModal (conditional)
│
├─ Login Page (login.js)
│
└─ Pricing Page (pricing.js)
```

---

## Module Dependencies

```
Frontend Components
    ↓ imports
Risk Engine (lib/risk-engine/)
    ↓ called by
Analysis Orchestrator (lib/analysis/)
    ↓ uses
Parser (lib/parser/)
    ↓ uses
Upload Storage (lib/uploads/)
    ↓ uses
Database Models (lib/db/)

Auth Components
    ↓ uses
Auth Provider (lib/auth/)
    ↓ uses
Session Manager (lib/session/)
    ↓ uses
Database Models (lib/db/)

Billing Components
    ↓ uses
Stripe Module (lib/billing/)
    ↓ uses
Entitlements (lib/entitlements/)
    ↓ uses
Database Models (lib/db/)

Report Component
    ↓ uses
PDF Generator (lib/pdf/)
    ↓ uses
Entitlements (lib/entitlements/)
```

---

## State Flow

```
┌─────────────────────────────────────────┐
│  User State                             │
│  • Anonymous Session (initial)          │
│  • Authenticated User (after signup)    │
│  • Subscribed User (after payment)      │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Draft State                            │
│  • Wizard form data                     │
│  • Current step                         │
│  • Uploaded documents                   │
│  • Parsed values                        │
│  • Manual edits                         │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Analysis State                         │
│  • Input data (normalized)              │
│  • Analysis result                      │
│  • Timestamp                            │
│  • Completeness                         │
│  • Confidence                           │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Subscription State                     │
│  • Plan type                            │
│  • Status (active/canceled)             │
│  • Period end                           │
│  • Stripe IDs                           │
└─────────────────────────────────────────┘
```

---

## Deployment Architecture

### Current (Static Export)

```
GitHub Repository
    ↓ push
Netlify
    ↓ build
Static HTML/CSS/JS
    ↓ deploy
CDN (Global)
    ↓ serve
Users
```

**Characteristics**:
- No server required
- Fast global delivery
- Client-side analysis
- localStorage persistence
- No backend costs

---

### Future (Full-Stack)

```
GitHub Repository
    ↓ push
Vercel / Railway
    ↓ build
Next.js Server + Static Assets
    ↓ deploy
    │
    ├─ Static Assets → CDN
    │
    ├─ API Routes → Serverless Functions
    │     ↓
    │     ├─ PostgreSQL Database
    │     ├─ S3 Storage
    │     ├─ Stripe API
    │     └─ Parsing Service
    │
    └─ Webhooks ← Stripe
    
    ↓ serve
Users
```

**Characteristics**:
- Server-side rendering
- Database persistence
- Real authentication
- Document parsing
- PDF generation
- Subscription billing
- Cross-device sync

---

## Security Architecture

```
┌─────────────────────────────────────────┐
│  Frontend Security                      │
│  • HTTPS only                           │
│  • XSS prevention (React)               │
│  • Input sanitization                   │
│  • No sensitive data in localStorage    │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  API Security                           │
│  • Authentication required              │
│  • CSRF protection                      │
│  • Rate limiting                        │
│  • Input validation                     │
│  • SQL injection prevention             │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Data Security                          │
│  • Password hashing (bcrypt)            │
│  • Session encryption                   │
│  • Signed URLs for files                │
│  • Stripe webhook verification          │
│  • Database encryption at rest          │
└─────────────────────────────────────────┘
```

---

This architecture provides a clear, scalable foundation for Hotel Risk Pro, supporting both the current static implementation and future full-stack expansion.
