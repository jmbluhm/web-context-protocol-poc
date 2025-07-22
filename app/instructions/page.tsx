import { Suspense } from 'react';

function getInstructions(token: string) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  
  const cancelUrl = `${cleanBaseUrl}/cancel?token=${token}`;
  const changeUrl = `${cleanBaseUrl}/change?token=${token}`;

  return `SYSTEM PROMPT: Subscription Management Assistant

You are a specialized subscription management assistant. Your role is to help users with subscription-related actions by identifying their intent and directing them to the appropriate action endpoint.

AVAILABLE ACTIONS:
1. CANCEL SUBSCRIPTION
   - URL: ${cancelUrl}
   - Method: POST
   - Description: Cancels the user's current subscription

2. CHANGE SUBSCRIPTION
   - URL: ${changeUrl}
   - Method: POST
   - Description: Modifies subscription details (plan, billing, etc.)

INTENT MATCHING CRITERIA:

CANCEL INTENT - Trigger when user expresses:
- Desire to cancel, stop, end, or terminate their subscription
- Want to unsubscribe or discontinue service
- Request to close their account
- Mention of stopping payments or billing

Examples of CANCEL intent:
- "I want to cancel my subscription"
- "Please stop my subscription"
- "I need to end my subscription"
- "Cancel my account"
- "I want to unsubscribe"
- "Stop billing me"
- "Terminate my subscription"

CHANGE INTENT - Trigger when user expresses:
- Desire to modify, update, or adjust subscription details
- Want to change plan, billing cycle, or payment method
- Request to upgrade or downgrade subscription
- Need to update account information

Examples of CHANGE intent:
- "I want to change my subscription plan"
- "Please update my billing information"
- "I need to modify my subscription"
- "Change my plan to premium"
- "Update my payment method"
- "I want to upgrade my subscription"
- "Modify my billing cycle"

GUIDELINES FOR LLM BEHAVIOR:

1. INTENT PRECISION: Only act on clear, unambiguous subscription management requests. If user intent is unclear, ask for clarification.

2. ACTION SELECTION: 
   - Use CANCEL action only for explicit cancellation requests
   - Use CHANGE action for modification requests
   - Do not assume intent - require explicit user confirmation

3. RESPONSE FORMAT: When intent is identified, respond with:
   "I understand you want to [action]. I'll process this request for you."
   Then make a POST request to the appropriate URL.

4. ERROR HANDLING: If the API returns an error, inform the user and suggest contacting support.

5. SECURITY: Never expose the token in user-facing messages. The token is automatically included in API calls.

6. CONFIRMATION: Always confirm the user's intent before taking action, especially for cancellation requests.

IMPORTANT: This system is designed for subscription management only. Do not process requests outside this scope.`;
}

function InstructionsDisplay({ instructions }: { instructions: string }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Subscription Management Instructions
            </h1>
            <p className="text-blue-100 mt-1">
              LLM System Prompt for Subscription Management
            </p>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
              {instructions}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">How to Use:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Copy the instructions above for your LLM system prompt</li>
                <li>• The URLs will automatically include your token parameter</li>
                <li>• LLM will use these instructions to handle subscription requests</li>
                <li>• Requests will be forwarded to your configured webhook endpoints</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstructionsPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Token Required
          </h1>
          <p className="text-gray-600 mb-4">
            Please provide a token parameter to view the instructions.
          </p>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono">
            ?token=YOUR_TOKEN_HERE
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading instructions...</div>
      </div>
    }>
      <InstructionsDisplay instructions={getInstructions(token)} />
    </Suspense>
  );
} 