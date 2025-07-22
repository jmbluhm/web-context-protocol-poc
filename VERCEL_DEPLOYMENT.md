# Vercel Deployment Guide

## Quick Deploy to Vercel

Your code is now available at: https://github.com/jmbluhm/web-context-protocol-poc.git

### Option 1: Deploy via Vercel Dashboard

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import Git Repository**: Select `web-context-protocol-poc`
4. **Configure Project**:
   - Framework Preset: Next.js (should auto-detect)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
5. **Click "Deploy"**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy from your local directory
vercel --prod
```

## Environment Variables Setup

After deployment, set up your environment variables in Vercel:

1. **Go to your project settings in Vercel Dashboard**
2. **Navigate to "Environment Variables"**
3. **Add the following variables**:

| Variable | Value | Description |
|----------|-------|-------------|
| `BASE_URL` | `https://your-app-name.vercel.app` | Your Vercel app URL |
| `FORWARDING_URL` | `https://eoodwrpeul173g0.m.pipedream.net` | Your Pipedream webhook URL |

## Testing Your Deployed API

Once deployed, test your endpoints:

```bash
# Test instructions endpoint
curl "https://your-app-name.vercel.app/api/instructions?token=test_token_123"

# Test cancel endpoint (will forward to Pipedream)
curl -X POST "https://your-app-name.vercel.app/api/cancel?token=test_token_123"

# Test change endpoint (will forward to Pipedream)
curl -X POST "https://your-app-name.vercel.app/api/change?token=test_token_123"
```

## Pipedream Webhook Setup

Your cancel and change requests will be forwarded to:
- **Cancel**: `https://eoodwrpeul173g0.m.pipedream.net/cancel?token={TOKEN}`
- **Change**: `https://eoodwrpeul173g0.m.pipedream.net/change?token={TOKEN}`

Make sure your Pipedream workflows are set up to handle these endpoints.

## Next Steps

1. **Customize the forwarding URL** in Vercel environment variables
2. **Set up proper authentication** for production use
3. **Configure your Pipedream workflows** to handle the forwarded requests
4. **Test the complete flow** from LLM instructions to webhook processing

Your API is now ready for production use! 🚀 