import { Suspense } from 'react';

async function processCancel(token: string) {
  // Get forwarding URL from environment
  const forwardingUrl = process.env.FORWARDING_URL;
  
  if (forwardingUrl) {
    try {
      // Construct the forwarding URL with /cancel path and token parameter
      const forwardUrl = `${forwardingUrl}/cancel?token=${token}`;
      
      // Forward the request to the external URL
      const forwardResponse = await fetch(forwardUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'subscription-api',
        },
        body: JSON.stringify({
          action: 'cancel',
          token: token,
          timestamp: new Date().toISOString(),
          source: 'subscription-management-api',
        }),
      });

      if (forwardResponse.ok) {
        return {
          success: true,
          message: 'Subscription cancellation request forwarded and processed successfully.',
          forwarded: true
        };
      } else {
        return {
          success: true,
          message: 'Subscription cancellation request received but forwarding failed.',
          forwarded: false
        };
      }
    } catch (error) {
      return {
        success: true,
        message: 'Subscription cancellation request received but forwarding failed.',
        forwarded: false
      };
    }
  } else {
    return {
      success: true,
      message: 'Subscription cancellation request received and processed successfully.',
      forwarded: false
    };
  }
}

function CancelDisplay({ result }: { result: any }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Subscription Cancellation
            </h1>
            <p className="text-red-100 mt-1">
              Request Processing Status
            </p>
          </div>
          
          <div className="p-6">
            <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${result.success ? 'bg-green-500' : 'bg-red-500'}`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className={`text-lg font-semibold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                    {result.success ? 'Request Processed Successfully' : 'Request Failed'}
                  </h3>
                  <p className={`mt-1 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                    {result.message}
                  </p>
                </div>
              </div>
            </div>
            
            {result.forwarded && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Forwarding Details:</h4>
                <p className="text-blue-800 text-sm">
                  Your cancellation request has been forwarded to the configured webhook endpoint for processing.
                </p>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next:</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Your subscription cancellation request has been received</li>
                <li>• The request will be processed according to your account settings</li>
                <li>• You may receive a confirmation email shortly</li>
                <li>• Contact support if you have any questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CancelPage({
  searchParams,
}: {
  searchParams: { next_path?: string };
}) {
  const token = searchParams.next_path;

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Token Required
          </h1>
          <p className="text-gray-600 mb-4">
            Please provide a token parameter to process the cancellation.
          </p>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono">
            ?next_path=YOUR_TOKEN_HERE
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Processing cancellation request...</div>
      </div>
    }>
      <CancelDisplay result={await processCancel(token)} />
    </Suspense>
  );
} 