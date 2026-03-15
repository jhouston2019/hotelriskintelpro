# Backend Integration Guide

This guide walks through converting Hotel Risk Pro from a static export to a full-stack application with database, authentication, and payment processing.

## Current State

The application is currently configured for **static export** and deployed to Netlify. All analysis runs client-side using localStorage for persistence.

**Pros**:
- Fast deployment
- No server costs
- Simple hosting
- Client-side analysis works perfectly

**Cons**:
- No persistent storage
- No document parsing
- No real authentication
- No Stripe integration
- No PDF generation
- No multi-device sync

## Backend Integration Steps

### Step 1: Database Setup

#### 1.1 Provision Database

Choose a PostgreSQL provider:
- **Supabase** (recommended for quick start)
- **Neon** (serverless Postgres)
- **Railway**
- **AWS RDS**
- Self-hosted

#### 1.2 Run Schema

```bash
psql $DATABASE_URL < lib/db/schema.sql
```

Or use a migration tool:

```bash
# Using Prisma
npm install prisma @prisma/client
npx prisma init
# Copy schema to prisma/schema.prisma
npx prisma migrate dev --name init
```

#### 1.3 Configure Connection

Add to `.env`:

```env
DATABASE_URL=postgresql://user:password@host:5432/hotelriskpro
```

#### 1.4 Implement Database Client

**Option A: Prisma (Recommended)**

```bash
npm install @prisma/client
```

Create `lib/db/client.js`:

```javascript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

**Option B: Raw SQL with pg**

```bash
npm install pg
```

**Option C: Drizzle ORM**

```bash
npm install drizzle-orm postgres
```

#### 1.5 Implement Model Queries

Update `lib/db/models.js` with actual database queries using your chosen client.

---

### Step 2: Configure Next.js for Server-Side

#### 2.1 Update next.config.js

Remove static export configuration:

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove this line:
  // output: "export",
};

module.exports = nextConfig;
```

#### 2.2 Move API Examples

```bash
# Move all API examples to pages/api/
mv lib/api-examples/draft-save.js pages/api/draft/save.js
mv lib/api-examples/analysis-run.js pages/api/analysis/run.js
mv lib/api-examples/billing-checkout.js pages/api/billing/create-checkout.js
mv lib/api-examples/billing-webhook.js pages/api/billing/webhook.js
mv lib/api-examples/pdf-export.js pages/api/pdf/export.js
mv lib/api-examples/dashboard-data.js pages/api/dashboard/data.js
mv lib/api-examples/quick-update.js pages/api/hotel/quick-update.js
mv lib/api-examples/upload-document.js pages/api/upload/document.js
```

---

### Step 3: Authentication

#### 3.1 Install NextAuth.js

```bash
npm install next-auth
```

#### 3.2 Configure NextAuth

Create `pages/api/auth/[...nextauth].js`:

```javascript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from '../../../lib/auth/provider';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { user } = await signIn(credentials.email, credentials.password);
        return user;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});
```

#### 3.3 Wrap App with SessionProvider

Update `pages/_app.js`:

```javascript
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```

#### 3.4 Update Auth Components

Replace mock auth in `AuthModal.js` with NextAuth:

```javascript
import { signIn } from 'next-auth/react';

// In handleSubmit:
const result = await signIn('credentials', {
  redirect: false,
  email,
  password,
});
```

---

### Step 4: File Storage

#### 4.1 Choose Storage Provider

**Option A: AWS S3**

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

**Option B: Cloudinary**

```bash
npm install cloudinary
```

**Option C: Vercel Blob**

```bash
npm install @vercel/blob
```

#### 4.2 Configure Storage

Add to `.env`:

```env
# For S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=hotel-risk-pro-documents
AWS_REGION=us-east-1

# For Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

#### 4.3 Implement Upload Handler

Update `lib/uploads/storage.js` with actual storage implementation.

---

### Step 5: Document Parsing

#### 5.1 Choose Parsing Service

**Option A: AWS Textract**

```bash
npm install @aws-sdk/client-textract
```

**Option B: Google Cloud Vision**

```bash
npm install @google-cloud/vision
```

**Option C: Azure Form Recognizer**

```bash
npm install @azure/ai-form-recognizer
```

**Option D: LLM-based (OpenAI, Claude)**

```bash
npm install openai
# or
npm install @anthropic-ai/sdk
```

#### 5.2 Implement Parser

Update `lib/parser/index.js` with actual parsing logic:

```javascript
import { TextractClient, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';

export async function parsePolicyDocument(documentBuffer) {
  const client = new TextractClient({ region: 'us-east-1' });
  
  const command = new AnalyzeDocumentCommand({
    Document: { Bytes: documentBuffer },
    FeatureTypes: ['FORMS', 'TABLES'],
  });
  
  const response = await client.send(command);
  
  // Extract key-value pairs
  const extracted = extractKeyValuePairs(response.Blocks);
  
  // Map to policy structure
  return {
    carrier: extracted['carrier'] || extracted['insurance company'],
    propertyLimit: parseNumber(extracted['property limit']),
    biLimit: parseNumber(extracted['business interruption']),
    // ... more fields
  };
}
```

---

### Step 6: Stripe Integration

#### 6.1 Install Stripe

```bash
npm install stripe
```

#### 6.2 Create Products in Stripe Dashboard

1. Go to Stripe Dashboard → Products
2. Create "Hotel Risk Pro - Monthly"
   - Price: $199/month
   - Recurring
   - Copy Price ID
3. Create "Hotel Risk Pro - Yearly"
   - Price: $1,999/year
   - Recurring
   - Copy Price ID

#### 6.3 Configure Environment Variables

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 6.4 Set Up Webhook Endpoint

1. In Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/billing/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy webhook secret

#### 6.5 Update Billing Module

The `lib/billing/stripe.js` file is ready. Just uncomment the Stripe SDK calls.

---

### Step 7: PDF Generation

#### 7.1 Install Puppeteer

```bash
npm install puppeteer
```

Or use a lighter alternative:

```bash
npm install chrome-aws-lambda puppeteer-core
```

#### 7.2 Update PDF Generator

Update `lib/pdf/generator.js` to uncomment Puppeteer code.

#### 7.3 Configure for Serverless (if using Vercel)

```javascript
// For Vercel deployment
import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  args: chrome.args,
  executablePath: await chrome.executablePath,
  headless: chrome.headless,
});
```

---

### Step 8: Update Frontend to Use APIs

#### 8.1 Replace localStorage with API Calls

**In IntakeWizard.js**:

```javascript
const handleNext = async (stepData) => {
  const stepKey = Object.keys(formData)[currentStep - 1];
  const updatedData = {
    ...formData,
    [stepKey]: { ...formData[stepKey], ...stepData },
  };
  
  setFormData(updatedData);
  
  // Save to backend
  await fetch('/api/draft/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: getSessionId(),
      section: stepKey,
      data: stepData,
    }),
  });
  
  // ... rest of logic
};
```

**In pages/intake.js**:

```javascript
const handleComplete = async (formData) => {
  setIsAnalyzing(true);
  
  const response = await fetch('/api/analysis/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelId, formData }),
  });
  
  const { analysisId } = await response.json();
  router.push(`/report/${analysisId}`);
};
```

#### 8.2 Update Report Page

```javascript
// In pages/report.js
useEffect(() => {
  const fetchAnalysis = async () => {
    const response = await fetch(`/api/analysis/${analysisId}`);
    const data = await response.json();
    setReportData(data.analysis);
  };
  
  fetchAnalysis();
}, [analysisId]);
```

#### 8.3 Update Dashboard

```javascript
// In pages/dashboard.js
useEffect(() => {
  const fetchDashboard = async () => {
    const response = await fetch(`/api/dashboard/data?hotelId=${hotelId}`);
    const data = await response.json();
    setHotelData(data.hotel);
    setAnalysis(data.latestAnalysis);
  };
  
  fetchDashboard();
}, [hotelId]);
```

---

### Step 9: Environment Configuration

Create `.env.local`:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/hotelriskpro

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# AWS (for S3 and Textract)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=hotel-risk-pro-documents
AWS_REGION=us-east-1

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

### Step 10: Testing

#### 10.1 Test Database Connection

```bash
node -e "const { prisma } = require('./lib/db/client'); prisma.user.findMany().then(console.log)"
```

#### 10.2 Test API Endpoints

```bash
# Test draft save
curl -X POST http://localhost:3000/api/draft/save \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test","section":"hotelProfile","data":{"hotelName":"Test"}}'

# Test analysis
curl -X POST http://localhost:3000/api/analysis/run \
  -H "Content-Type: application/json" \
  -d '{"hotelId":"test-hotel-id"}'
```

#### 10.3 Test Stripe Webhook

Use Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/billing/webhook
stripe trigger checkout.session.completed
```

#### 10.4 Run Integration Tests

```bash
npm test
```

---

### Step 11: Deployment

#### 11.1 Choose Hosting

**Option A: Vercel (Recommended)**
- Native Next.js support
- Serverless functions
- Easy environment variables
- Automatic deployments

**Option B: Railway**
- Full-stack support
- Database included
- Docker support

**Option C: AWS (Amplify or ECS)**
- Full control
- Scalable
- More complex setup

#### 11.2 Configure Environment Variables

Add all environment variables to hosting platform.

#### 11.3 Configure Stripe Webhook

Update webhook endpoint to production URL:
```
https://hotelriskpro.com/api/billing/webhook
```

#### 11.4 Deploy

```bash
# Vercel
vercel --prod

# Railway
railway up

# Or use Git integration for automatic deployments
```

---

## Migration Checklist

### Pre-Migration
- [ ] Provision PostgreSQL database
- [ ] Run database schema
- [ ] Set up file storage (S3/Cloudinary)
- [ ] Create Stripe products and prices
- [ ] Configure environment variables

### Code Changes
- [ ] Remove `output: "export"` from next.config.js
- [ ] Move API examples to pages/api/
- [ ] Implement database client
- [ ] Update model queries with real DB calls
- [ ] Implement auth provider with NextAuth
- [ ] Update storage module with real upload logic
- [ ] Implement document parser
- [ ] Update PDF generator with Puppeteer
- [ ] Update frontend to call APIs instead of localStorage

### Testing
- [ ] Test database connection
- [ ] Test all API endpoints
- [ ] Test authentication flow
- [ ] Test file upload
- [ ] Test document parsing
- [ ] Test Stripe checkout
- [ ] Test Stripe webhooks
- [ ] Test PDF generation
- [ ] Run integration tests
- [ ] Test complete user flows

### Deployment
- [ ] Deploy to hosting platform
- [ ] Configure production environment variables
- [ ] Set up Stripe production webhook
- [ ] Test production deployment
- [ ] Monitor error logs
- [ ] Set up monitoring (Sentry, etc.)

---

## Phased Rollout Strategy

You don't have to implement everything at once. Consider this phased approach:

### Phase 1: Database + Auth
- Set up database
- Implement authentication
- Save drafts and analyses server-side
- Keep analysis client-side
- No parsing, no PDF yet

### Phase 2: Stripe Integration
- Add subscription checkout
- Implement entitlement checks
- Enable monitoring dashboard for paid users

### Phase 3: Document Features
- Add file storage
- Implement document parsing
- Enable PDF export

### Phase 4: Advanced Features
- Multi-hotel management
- Analysis history and comparisons
- Email notifications
- Advanced monitoring alerts

---

## Cost Estimates

### Monthly Operating Costs (estimated)

**Database** (Supabase/Neon):
- Free tier: $0
- Pro tier: $25/month
- Production: $50-100/month

**File Storage** (S3):
- ~$5-20/month depending on volume

**Document Parsing** (AWS Textract):
- ~$1.50 per 1000 pages
- Estimate: $50-200/month

**PDF Generation**:
- Included in hosting (serverless functions)

**Hosting** (Vercel):
- Free tier: $0
- Pro: $20/month
- Production: $50-100/month

**Stripe Fees**:
- 2.9% + $0.30 per transaction
- On $199 subscription: ~$6.07 per transaction

**Total Estimated**: $150-500/month depending on scale

---

## Performance Optimization

### Database
- Add indexes (already in schema)
- Use connection pooling
- Cache frequent queries

### API Routes
- Add rate limiting
- Implement caching headers
- Use CDN for static assets

### Analysis Engine
- Keep client-side for speed
- Cache results
- Consider worker threads for heavy computation

### PDF Generation
- Cache generated PDFs
- Use queue for async generation
- Consider external service for scale

---

## Security Considerations

### Input Validation
- Validate all API inputs
- Sanitize user data
- Use parameterized queries

### Authentication
- Use secure session management
- Implement CSRF protection
- Add rate limiting on auth endpoints

### File Uploads
- Validate file types and sizes
- Scan for malware
- Use signed URLs for access

### Stripe
- Verify webhook signatures
- Never trust client-side subscription status
- Always check server-side

### Data Privacy
- Encrypt sensitive data at rest
- Use HTTPS everywhere
- Implement data retention policies
- Add GDPR compliance if needed

---

## Monitoring and Observability

### Error Tracking

```bash
npm install @sentry/nextjs
```

Configure Sentry:

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### Analytics

```bash
npm install posthog-js
```

Track key events:
- Analysis started
- Analysis completed
- Subscription created
- PDF exported
- Quick update performed

### Logging

Use structured logging:

```javascript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

logger.info({ hotelId, analysisId }, 'Analysis completed');
```

---

## Support and Maintenance

### Database Backups
- Configure automated backups
- Test restore procedures
- Keep 30-day retention

### Monitoring
- Set up uptime monitoring
- Monitor API response times
- Track error rates
- Monitor Stripe webhook delivery

### Updates
- Keep dependencies updated
- Monitor security advisories
- Test updates in staging first

---

## FAQ

**Q: Can I keep using static export?**
A: Yes, for basic functionality. But you'll miss persistence, parsing, PDF export, and subscriptions.

**Q: Do I need all features at once?**
A: No. Start with database + auth, then add features incrementally.

**Q: What's the minimum viable backend?**
A: Database + NextAuth + basic API routes for saving drafts and analyses.

**Q: Can I use a different database?**
A: Yes. The schema is PostgreSQL but can be adapted to MySQL, MongoDB, etc.

**Q: Can I use a different payment processor?**
A: Yes, but Stripe is recommended for subscriptions. Would need to rewrite `lib/billing/`.

**Q: How do I handle existing localStorage users?**
A: Implement a migration that reads localStorage on first auth and saves to backend.

---

## Getting Help

If you encounter issues during integration:

1. Check error logs in hosting platform
2. Verify environment variables are set
3. Test API endpoints individually
4. Check database connection
5. Verify Stripe webhook delivery
6. Review this guide's troubleshooting section

---

This guide provides everything needed to convert Hotel Risk Pro from static export to a full-stack application with database, authentication, file storage, document parsing, and payment processing.
