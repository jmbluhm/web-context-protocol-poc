# Deployment Guide

## Environment Setup

### Local Development

1. Create a `.env.local` file in the root directory:
```env
BASE_URL=http://localhost:3000
```

### Vercel Deployment

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Deploy to Vercel**:
```bash
vercel --prod
```

3. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add: `BASE_URL` = `https://your-domain.vercel.app`

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `BASE_URL` | Base URL for API endpoints | `https://your-domain.vercel.app` |
| `FORWARDING_URL` | URL to forward cancel and change requests to (optional) | `https://eoodwrpeul173g0.m.pipedream.net` |

## Testing the API

### 1. Test Instructions Endpoint
```bash
curl "https://your-domain.vercel.app/api/instructions?token=test_token_123"
```

### 2. Test Cancel Endpoint
```bash
curl -X POST "https://your-domain.vercel.app/api/cancel?token=test_token_123"
```

### 3. Test Change Endpoint
```bash
curl -X POST "https://your-domain.vercel.app/api/change?token=test_token_123"
```

## Production Considerations

1. **Token Validation**: Implement proper token validation in production
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **Logging**: Implement comprehensive logging
4. **Monitoring**: Set up monitoring and alerting
5. **Security**: Add CORS, authentication, and other security measures

## Troubleshooting

### Common Issues

1. **404 Errors**: Ensure API routes are in the correct directory structure
2. **TypeScript Errors**: Run `npm install` to install dependencies
3. **Environment Variables**: Verify they're set correctly in Vercel
4. **CORS Issues**: Add proper CORS headers if needed

### Debug Mode

To enable debug logging, add to your environment:
```env
DEBUG=true
``` 