# Hotel Risk Pro Application Flow

Complete documentation of the integrated application flow, from landing page to monitoring dashboard.

## Overview

Hotel Risk Pro is a plug-and-play insurance survivability check for hotel owners. The application flow is designed to be simple and guided, while capturing comprehensive risk data underneath.

## User Journey

### 1. Landing Page (`/`)

**Purpose**: Communicate value proposition and drive conversions

**Key Elements**:
- Hero with clear positioning: "Will Your Hotel Insurance Actually Save Your Business?"
- Dashboard demo showing potential dollar savings
- Service list and value proposition
- Multiple CTAs: "Analyze My Hotel Insurance"

**User Actions**:
- Click "Analyze My Hotel Insurance" → redirects to `/intake`
- Click "See How It Works" → scrolls to explainer section

---

### 2. Start Analysis (`/analyze`)

**Purpose**: Entry point that redirects to intake wizard

**Behavior**:
- Creates anonymous session (no signup required)
- Redirects to `/intake` (first step of wizard)

---

### 3. Guided Intake Wizard (`/intake`)

**Purpose**: Collect comprehensive hotel risk data through 7 guided steps

**Architecture**:
- Component: `IntakeWizard.js`
- Progress indicator showing current step
- Auto-save on each step completion
- Manual "Save Progress" button

#### Step 1: Basic Hotel Profile
- Component: `BasicHotelProfile.js`
- Fields: name, address, rooms, square footage, year built, construction details, amenities
- Validation: Required fields marked with asterisk

#### Step 2: Financial Exposure
- Component: `FinancialExposure.js`
- Fields: annual revenue, revenue breakdown, occupancy, costs, payroll, debt service, cash reserves
- Helper text: "This helps determine how long your business could survive if operations are interrupted"

#### Step 3: Insurance Policy Input
- Component: `InsurancePolicyInput.js`
- **Document Upload**: Policy PDF upload with parsing
- **Parsing Flow**:
  1. User uploads policy PDF
  2. Shows "Extracting policy details..." loading state
  3. Parser extracts coverage limits, deductibles, dates
  4. Populates form fields with "Parsed from document" badges
  5. User can review and edit all values
  6. Manual edits override parsed values
- Fields: carrier, policy period, coverage limits, deductible, BI details, additional coverages
- Validation: Core coverage fields required

#### Step 4: Loss History
- Component: `LossHistory.js`
- **Features**:
  - Upload loss runs (optional)
  - Add claims manually
  - Multiple claim support
- Fields per claim: year, date, type, cause, amount paid, status, area affected

#### Step 5: Operational Risk
- Component: `OperationalRisk.js`
- Fields: maintenance issues, roof leaks, HVAC/plumbing/electrical issues, mold history, deferred maintenance
- Format: Yes/No toggles with detail expansion

#### Step 6: Location & Hazard Exposure
- Component: `LocationHazard.js`
- Fields: flood zone, coastal wind, wildfire, storm exposure, crime level, contractor scarcity, litigation sensitivity

#### Step 7: Review & Analyze
- Component: `ReviewAnalyze.js`
- Shows summary of all collected data
- Displays completeness percentage
- Primary CTA: "Run My Survivability Analysis"
- Secondary CTA: "Save and Finish Later"

**Data Persistence**:
- Auto-saved to `localStorage` after each step
- TODO: Backend API integration for server-side persistence
- Draft survives page refreshes and navigation

**On Completion**:
- Shows "Analyzing Your Insurance Coverage" loading screen
- Runs `analyzeHotelRisk()` client-side
- Saves result to `localStorage`
- Redirects to `/report`

---

### 4. Survivability Report (`/report`)

**Purpose**: Display comprehensive analysis results

**Component**: `SurvivabilityReportV2.js`

**Report Sections**:

1. **Report Header**
   - Title: "Hotel Insurance Survivability Report"
   - Hotel name, analysis date, policy period
   - Completeness and confidence indicators

2. **Survivability Summary** (4 key metrics)
   - Survivability Score (0-100)
   - Property Coverage Gap
   - BI Coverage Window
   - Estimated Uncovered Exposure

3. **What This Means**
   - 3-5 plain-English findings
   - Dynamically generated from analysis

4. **Coverage vs Reality**
   - Property coverage comparison
   - Business interruption comparison
   - Liability comparison
   - Deductible stress analysis

5. **Business Interruption Reality**
   - Monthly revenue calculation
   - BI months covered vs recovery estimate
   - Uncovered revenue exposure

6. **Loss History & Renewal Pressure**
   - Total claims count
   - Recurring categories
   - Loss pressure band
   - Renewal implications

7. **Operational Risk Environment**
   - Flagged maintenance issues
   - Insurance relevance explanations

8. **Location & Hazard Risk**
   - Environmental exposures
   - Recovery difficulty factors

9. **Top Priority Actions**
   - Ranked list of 3-7 actions
   - Each with: title, urgency, category, why it matters, estimated impact
   - Urgency labels: Fix Now, Before Renewal, Monitor Closely

10. **If Nothing Changes**
    - Blunt but plain-English narrative
    - Based on strongest risk signals

11. **Report Footer / Next Steps**
    - "Strengthen Your Hotel's Protection"
    - Three action buttons (see below)

**User Actions**:

1. **Download PDF Report**
   - Checks authentication → shows `AuthModal` if not signed in
   - Checks subscription → shows `SubscriptionPrompt` if not subscribed
   - Generates PDF if entitled

2. **Save This Hotel**
   - Checks authentication → shows `AuthModal` if not signed in
   - Saves hotel profile and analysis to user account
   - Enables future access via dashboard

3. **Enable Monitoring**
   - Checks authentication → shows `AuthModal` if not signed in
   - Checks subscription → shows `SubscriptionPrompt` if not subscribed
   - Redirects to `/dashboard` if entitled

---

### 5. Authentication Flow

**Component**: `AuthModal.js`

**Trigger Points**:
- When user clicks "Download PDF" without auth
- When user clicks "Save This Hotel" without auth
- When user clicks "Enable Monitoring" without auth

**Features**:
- Toggle between Sign Up and Sign In
- Fields: name (signup only), email, password
- No forced signup before analysis
- Preserves anonymous session data after auth

**On Success**:
- Attaches anonymous draft to user account
- If feature requires subscription, shows `SubscriptionPrompt`
- Otherwise, completes requested action

---

### 6. Subscription Flow

**Component**: `SubscriptionPrompt.js`

**Trigger Points**:
- When authenticated user tries to export PDF without subscription
- When authenticated user tries to enable monitoring without subscription

**Content**:
- Feature-specific messaging
- Complete feature list
- Pricing: $199/month or $1,999/year
- Value proposition: "The Cost of the Tool vs The Risk"

**User Actions**:
- Click "Subscribe Now" → creates Stripe checkout session
- Click "Not Now" → closes modal

**Stripe Checkout**:
- Redirects to Stripe hosted checkout
- Success URL: `/dashboard?session_id={CHECKOUT_SESSION_ID}`
- Cancel URL: `/report`

**Post-Checkout**:
- Webhook handler processes `checkout.session.completed`
- Creates subscription record in database
- Unlocks paid features
- User returns to dashboard

---

### 7. Monitoring Dashboard (`/dashboard`)

**Purpose**: Ongoing risk monitoring for subscribed users

**Component**: `MonitoringDashboard.js`

**Requirements**:
- Active subscription required
- Loads latest analysis for hotel
- Shows current risk status

**Dashboard Sections**:

1. **Key Metrics** (4 cards)
   - Survivability Score
   - Renewal Countdown
   - Open Priority Issues
   - Last Analysis Date

2. **Risk Monitoring Cards** (6 cards)
   - Underinsurance Risk
   - BI Shortfall Risk
   - Renewal Pressure
   - Operational Deterioration
   - Hazard Exposure
   - Data Updates Needed

3. **Update Prompts** (3 quick questions)
   - "Any new claims since your last review?"
   - "Has revenue changed materially?"
   - "Any major renovations or added amenities?"
   - Each with Yes/No buttons

4. **Quick Actions**
   - View Full Report
   - Update Risk Profile (full wizard)
   - Download PDF

**Quick Update Flow**:
- User clicks "Yes" on update prompt
- Opens `QuickUpdateModal` with focused form
- User enters specific update (new claim, revenue change, etc.)
- Saves update to backend
- Re-runs analysis automatically
- Refreshes dashboard with new data

---

### 8. Billing Management (`/billing`)

**Purpose**: Manage subscription and billing

**Features**:
- View current subscription status
- View billing history
- Update payment method
- Cancel subscription
- Uses Stripe Customer Portal

**Integration**:
- `createPortalSession()` generates Stripe portal URL
- Redirects to Stripe for billing management
- Returns to `/dashboard` after completion

---

## Data Flow Architecture

### Intake → Analysis → Report

```
User Input (Wizard)
  ↓
Auto-save to localStorage + Backend Draft
  ↓
Document Upload (Optional)
  ↓
Parser Extraction
  ↓
Merge Manual + Parsed Data
  ↓
Normalize for Risk Engine
  ↓
analyzeHotelRisk(input)
  ↓
HotelRiskAnalysis Output
  ↓
Save to Database
  ↓
Render Report
  ↓
User Actions (Save/Export/Monitor)
```

### Anonymous → Authenticated Flow

```
Anonymous Session Created
  ↓
User Completes Intake
  ↓
User Sees Report
  ↓
User Clicks "Save" or "Export"
  ↓
AuthModal Shown
  ↓
User Signs Up
  ↓
Anonymous Data Attached to User Account
  ↓
Feature Unlocked or Subscription Prompt Shown
```

### Subscription Flow

```
User Clicks "Subscribe"
  ↓
createCheckoutSession(userId, hotelId, planType)
  ↓
Redirect to Stripe Checkout
  ↓
User Completes Payment
  ↓
Stripe Webhook: checkout.session.completed
  ↓
Create Subscription Record
  ↓
User Redirected to Dashboard
  ↓
Paid Features Unlocked
```

---

## State Management

### Client-Side State
- **localStorage**: Draft data, temporary analysis results
- **React State**: Current wizard step, form data, UI state
- **Session Cookies**: Anonymous session token, user session token

### Server-Side State (when backend is implemented)
- **Database**: Hotels, policies, analyses, subscriptions, documents
- **Session Store**: Active sessions, draft data
- **File Storage**: Uploaded documents (S3, Cloudinary, etc.)

---

## Entitlement Logic

### Free Features
- Start analysis
- Complete intake wizard
- View initial report summary
- See key metrics and findings

### Paid Features (Subscription Required)
- Save hotel permanently
- Export PDF report
- Access monitoring dashboard
- Re-run analysis
- View analysis history
- Quick updates
- Monitoring alerts

### Entitlement Checks
- Implemented in `lib/entitlements/index.js`
- `canAccess(feature, hotelId, userId)` returns permission status
- Used throughout UI to gate features

---

## Technical Implementation

### Current State (Static Export)
- Client-side analysis using `analyzeHotelRisk()`
- localStorage for persistence
- No API routes (static export mode)
- Ready for Netlify deployment

### Backend Integration (Future)
- Remove `output: "export"` from `next.config.js`
- Move API examples from `lib/api-examples/` to `pages/api/`
- Set up PostgreSQL database
- Run schema from `lib/db/schema.sql`
- Configure environment variables
- Implement database client (Prisma, Drizzle, or raw SQL)
- Connect Stripe webhooks
- Set up file storage (S3, Cloudinary, Vercel Blob)
- Integrate document parsing service

### Database Schema
- **users**: User accounts
- **anonymous_sessions**: Pre-auth sessions
- **hotels**: Hotel profiles
- **financial_profiles**: Revenue and cost data
- **insurance_policies**: Policy details
- **loss_runs**: Claims history
- **operational_risk_profiles**: Maintenance and operations data
- **hazard_profiles**: Location risk data
- **uploaded_documents**: Document metadata and parsed data
- **analyses**: Analysis snapshots over time
- **subscriptions**: Stripe subscription records
- **monitoring_alerts**: Risk alerts and notifications

### Key Modules

**Risk Engine** (`lib/risk-engine/`)
- `index.js`: Main orchestrator
- `property.js`, `businessInterruption.js`, `liability.js`, etc.: Analysis modules
- `scenarios.js`: Scenario generation
- `score.js`: Survivability score calculation
- `priorities.js`: Action prioritization
- `narrative.js`: Plain-English text generation

**Session Management** (`lib/session/`)
- `manager.js`: Session and draft handling

**Authentication** (`lib/auth/`)
- `provider.js`: Auth flow (reference implementation)

**Document Handling** (`lib/uploads/`, `lib/parser/`)
- `storage.js`: File upload and storage
- `index.js`: Document parsing and merging

**Analysis** (`lib/analysis/`)
- `orchestrator.js`: Coordinates data collection and analysis

**Billing** (`lib/billing/`)
- `stripe.js`: Subscription and checkout handling

**Entitlements** (`lib/entitlements/`)
- `index.js`: Feature access control

**PDF Export** (`lib/pdf/`)
- `generator.js`: PDF report generation

---

## Component Architecture

### Pages
- `pages/index.js` - Landing page
- `pages/analyze.js` - Analysis entry (redirects to intake)
- `pages/intake.js` - Intake wizard container
- `pages/report.js` - Report display with auth/subscription handling
- `pages/dashboard.js` - Monitoring dashboard
- `pages/login.js` - Standalone login page
- `pages/pricing.js` - Pricing information

### Wizard Components (`components/intake/`)
- `BasicHotelProfile.js` - Step 1
- `FinancialExposure.js` - Step 2
- `InsurancePolicyInput.js` - Step 3 (with upload)
- `LossHistory.js` - Step 4 (with upload)
- `OperationalRisk.js` - Step 5
- `LocationHazard.js` - Step 6
- `ReviewAnalyze.js` - Step 7

### Report Components
- `SurvivabilityReportV2.js` - Main report display
- Renders all 10 report sections
- Integrates with risk engine
- Handles action callbacks

### Dashboard Components
- `MonitoringDashboard.js` - Main dashboard
- `dashboard/QuickUpdateModal.js` - Quick update forms

### Auth Components (`components/auth/`)
- `AuthModal.js` - Sign up / sign in modal

### Billing Components (`components/billing/`)
- `SubscriptionPrompt.js` - Subscription upsell modal

---

## API Routes (Reference Examples)

Located in `lib/api-examples/` for reference. Move to `pages/api/` when converting to server-side.

### Draft Management
- `POST /api/draft/save` - Save wizard progress
- `GET /api/draft/load` - Load saved draft

### Analysis
- `POST /api/analysis/run` - Trigger analysis
- `GET /api/analysis/:id` - Get analysis result
- `GET /api/analysis/history/:hotelId` - Get analysis history

### Documents
- `POST /api/upload/document` - Upload document
- `POST /api/parse/policy` - Parse policy document
- `POST /api/parse/loss-runs` - Parse loss runs

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Get current session

### Billing
- `POST /api/billing/create-checkout` - Create Stripe checkout
- `POST /api/billing/webhook` - Handle Stripe webhooks
- `POST /api/billing/portal` - Create customer portal session

### Dashboard
- `GET /api/dashboard/data` - Get dashboard data
- `POST /api/hotel/quick-update` - Handle quick updates

### Export
- `GET /api/pdf/export?analysisId=xxx` - Generate PDF report

---

## Subscription Plans

### Monthly Plan
- **Price**: $199/month per hotel
- **Stripe Price ID**: `process.env.STRIPE_PRICE_MONTHLY`

### Yearly Plan
- **Price**: $1,999/year per hotel
- **Savings**: $388 vs monthly
- **Stripe Price ID**: `process.env.STRIPE_PRICE_YEARLY`

### Included Features
- Permanent hotel profile storage
- Full PDF report export
- Ongoing risk monitoring
- Renewal countdown and alerts
- Quick update and re-analysis
- Analysis history tracking
- Priority action tracking

---

## Error Handling

### Parser Failures
- Show "Could not parse document" message
- Allow manual entry for all fields
- Never block user progress

### Incomplete Data
- Analysis runs with partial data
- Shows confidence level (low, moderate, high)
- Lists missing critical fields
- Records assumptions used

### Authentication Errors
- Clear error messages in AuthModal
- Preserve user progress through errors

### Payment Failures
- Webhook handles payment failures
- User notified via email
- Subscription status updated

---

## Performance Considerations

### Client-Side Analysis
- Risk engine runs in browser
- Fast execution (~100-500ms)
- No server latency
- Works with static export

### Loading States
- Wizard: Auto-save feedback
- Analysis: "Analyzing..." screen with progress message
- Report: Loading spinner while fetching data
- PDF: "Generating..." indicator

### Optimization
- Lazy load wizard steps
- Memoize analysis results
- Cache parsed document data
- Progressive enhancement for uploads

---

## Testing

### Unit Tests
- Risk engine modules (already implemented in `lib/risk-engine/test.js`)
- Parser merge logic
- Entitlement checks

### Integration Tests
- Complete user flows (see `tests/integration/flow.test.js`)
- Anonymous to authenticated handoff
- Document upload and parsing
- Analysis trigger and result
- Subscription checkout

### E2E Tests (TODO)
- Full wizard completion
- Document upload flow
- Auth and subscription flow
- Dashboard interactions

---

## Deployment

### Current (Static Export)
- Deployed to Netlify
- No backend required
- Client-side only
- localStorage persistence

### Future (Full-Stack)
- Next.js server-side rendering
- PostgreSQL database
- File storage (S3, Cloudinary)
- Stripe webhooks
- Document parsing service integration

---

## Environment Variables

### Current (Static)
```env
NEXT_PUBLIC_BASE_URL=https://hotelriskpro.com
```

### Future (Full-Stack)
```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/hotelriskpro

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Auth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...

# App
NEXT_PUBLIC_BASE_URL=https://hotelriskpro.com
```

---

## Next Steps for Full Backend Integration

1. **Database Setup**
   - Provision PostgreSQL database
   - Run schema from `lib/db/schema.sql`
   - Choose ORM (Prisma recommended)
   - Implement model queries

2. **API Implementation**
   - Move examples from `lib/api-examples/` to `pages/api/`
   - Connect to database
   - Add authentication middleware
   - Test all endpoints

3. **File Storage**
   - Set up S3 or Cloudinary
   - Implement upload handlers
   - Configure signed URLs

4. **Document Parsing**
   - Integrate OCR service (AWS Textract, Google Vision, etc.)
   - Implement extraction logic
   - Add confidence scoring

5. **Authentication**
   - Implement NextAuth.js or similar
   - Configure providers
   - Add session management

6. **Stripe Integration**
   - Create products and prices in Stripe dashboard
   - Configure webhook endpoint
   - Test checkout flow
   - Test webhook handlers

7. **PDF Generation**
   - Set up Puppeteer or similar
   - Create print-optimized templates
   - Test generation performance

8. **Testing**
   - Write E2E tests
   - Test all user flows
   - Load testing for analysis engine

9. **Monitoring**
   - Set up error tracking (Sentry)
   - Add analytics (PostHog, Mixpanel)
   - Monitor webhook delivery

10. **Security**
    - Add rate limiting
    - Implement CSRF protection
    - Secure file uploads
    - Validate all inputs
    - Add audit logging

---

## Known Limitations (Current Static Export)

1. No server-side persistence (localStorage only)
2. No document parsing (placeholder UI only)
3. No actual PDF generation (requires server)
4. No real authentication (modal UI only)
5. No Stripe integration (requires webhooks)
6. No email notifications
7. No multi-hotel management
8. No analysis history

These limitations will be resolved when backend is implemented.

---

## User Experience Principles

Throughout the application:

1. **Plain English**: No jargon, clear explanations
2. **Progressive Disclosure**: Show complexity only when needed
3. **Clear Value**: Every screen answers "Why does this matter?"
4. **No Friction**: Start without signup, save when valuable
5. **Financial Focus**: Emphasize dollar amounts and consequences
6. **Trust Building**: Professional design, clear data handling
7. **Mobile Responsive**: Works on all devices
8. **Fast**: Quick loading, instant feedback

---

## Maintenance and Updates

### Adding New Risk Factors
1. Update input types in `lib/risk-engine/types.js`
2. Add analysis logic in relevant module
3. Update wizard component to collect data
4. Add to report display
5. Update test fixtures

### Modifying Formulas
1. Update constants in `lib/risk-engine/constants.js`
2. Modify calculation in relevant module
3. Update tests to verify
4. Document changes in module README

### Adding New Features
1. Update entitlements in `lib/entitlements/index.js`
2. Add UI components
3. Create API endpoints (if needed)
4. Update subscription prompt
5. Add tests

---

This document provides a complete reference for the Hotel Risk Pro application flow and architecture.
