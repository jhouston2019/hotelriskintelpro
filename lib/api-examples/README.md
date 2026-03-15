# API Route Examples

This folder contains example API implementations for when the project is converted from static export to server-side rendering.

## Current Configuration

The project is currently configured for static export (`output: "export"` in `next.config.js`), which does not support API routes. These examples are provided as reference implementations.

## Converting to Server-Side

To enable these API routes:

1. Remove `output: "export"` from `next.config.js`
2. Move desired example files from `lib/api-examples/` to `pages/api/`
3. Set up your database connection
4. Configure environment variables
5. Rebuild the application

## Available Examples

- `draft-save.js` - Save wizard draft progress
- `draft-load.js` - Load saved draft
- `analysis-run.js` - Trigger risk analysis
- `analysis-get.js` - Fetch analysis result
- `upload-document.js` - Handle document uploads
- `parse-policy.js` - Parse insurance policy
- `auth-signup.js` - User registration
- `auth-signin.js` - User authentication
- `billing-checkout.js` - Create Stripe checkout
- `billing-webhook.js` - Handle Stripe webhooks
- `pdf-export.js` - Generate PDF report
- `dashboard-data.js` - Fetch dashboard data
- `quick-update.js` - Handle quick updates
- `carrier-metrics-update.js` - Update carrier intelligence metrics (scheduled job)

## Database Setup

Before using these APIs, you need to:

1. Set up PostgreSQL database
2. Run the schema from `lib/db/schema.sql`
3. Run the carrier intelligence schema from `lib/db/carrier-intelligence-schema.sql`
4. Configure database connection in `.env`
5. Install database client (pg, Prisma, Drizzle, etc.)

## Environment Variables

Required variables:

```env
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CRON_SECRET=... # For scheduled jobs (carrier metrics update)
```

## Testing

Each API example includes basic validation and error handling. Test thoroughly before production deployment.
