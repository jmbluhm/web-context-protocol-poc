# Subscription Management API

A Next.js API for serving LLM execution instructions for subscription management actions. This API is optimized for Vercel deployment and provides clear, structured instructions for LLMs to handle subscription-related user requests.

## Features

- **LLM-Optimized Instructions**: Plain text responses designed for LLM consumption
- **Token-Based Authentication**: Secure token validation for all requests
- **Intent Matching**: Clear criteria for identifying user subscription management intents
- **Action Routing**: Automatic routing to appropriate subscription management endpoints
- **Vercel Optimized**: Built for seamless deployment on Vercel

## API Endpoints

### GET `/api/instructions`
Serves LLM execution instructions for subscription management.

**Query Parameters:**
- `token` (required): Authentication token for the user

**Response:** Plain text instructions optimized for LLM consumption

**Example:**
```bash
curl "https://your-domain.vercel.app/api/instructions?token=YOUR_TOKEN_HERE"
```

### POST `/api/cancel`
Handles subscription cancellation requests.

**Query Parameters:**
- `token` (required): Authentication token for the user

**Response:** Confirmation of cancellation processing

### POST `/api/change`
Handles subscription modification requests.

**Query Parameters:**
- `token` (required): Authentication token for the user

**Response:** Confirmation of change processing

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file with:
```env
BASE_URL=https://your-domain.vercel.app
```

### 3. Development
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Deploy to Vercel
```bash
vercel --prod
```

## Environment Variables

- `BASE_URL`: The base URL for your API (used in instruction generation)
  - Default: `http://localhost:3000` (development)
  - Set to your production domain for Vercel deployment
- `FORWARDING_URL`: URL to forward cancel and change requests to (optional)
  - When set, requests will be forwarded to this URL with /cancel or /change paths
  - Useful for webhook testing or external processing
  - Example: `https://eoodwrpeul173g0.m.pipedream.net`
  - Cancel requests go to: `{FORWARDING_URL}/cancel?token={TOKEN}`
  - Change requests go to: `{FORWARDING_URL}/change?token={TOKEN}`

## LLM Integration

The `/api/instructions` endpoint returns a system prompt that:

1. **Defines the LLM's role** as a subscription management assistant
2. **Lists available actions** with exact URLs and methods
3. **Provides intent matching criteria** for CANCEL and CHANGE actions
4. **Includes examples** of user inputs that trigger each action
5. **Sets guidelines** for LLM behavior and response format

### Intent Matching

**CANCEL Intent:**
- User wants to cancel, stop, end, or terminate subscription
- Keywords: cancel, stop, end, terminate, unsubscribe, discontinue

**CHANGE Intent:**
- User wants to modify, update, or adjust subscription details
- Keywords: change, modify, update, adjust, upgrade, downgrade

## Security Considerations

- All endpoints require a valid token parameter
- Tokens are automatically included in action URLs
- Never expose tokens in user-facing messages
- Implement proper token validation in production

## Production Implementation

The current implementation includes placeholder logic for the cancel and change endpoints. For production use, you should:

1. **Implement token validation** against your authentication system
2. **Add database integration** for subscription management
3. **Integrate with billing systems** (Stripe, PayPal, etc.)
4. **Add email notifications** for subscription changes
5. **Implement proper error handling** and logging
6. **Add rate limiting** and security measures

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Missing or invalid token
- **405 Method Not Allowed**: Incorrect HTTP method
- **500 Internal Server Error**: Server-side errors

All errors return plain text responses for LLM consumption.

## License

MIT License - see LICENSE file for details. 