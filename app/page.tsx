export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Subscription Management API
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Next.js API for LLM subscription management instructions
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            API Endpoints
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-gray-900">GET /instructions/{'{token}'}</h3>
              <p className="text-sm text-gray-600 mt-1">
                HTML page with LLM execution instructions for subscription management
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                /instructions/YOUR_TOKEN_HERE
              </code>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-medium text-gray-900">GET /cancel/{'{token}'}</h3>
              <p className="text-sm text-gray-600 mt-1">
                HTML page for subscription cancellation requests (executes cancellation)
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                /cancel/YOUR_TOKEN_HERE
              </code>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium text-gray-900">GET /change/{'{token}'}</h3>
              <p className="text-sm text-gray-600 mt-1">
                HTML page for subscription modification requests (executes change)
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                /change/YOUR_TOKEN_HERE
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Test the API
          </h2>
          <p className="text-gray-600 mb-4">
            Try accessing the instructions endpoint with a test token:
          </p>
          <div className="bg-gray-100 p-4 rounded">
            <code className="text-sm">
              curl "https://web-context-protocol-poc-wmvc.vercel.app/instructions/test_token_123"
            </code>
          </div>
        </div>
      </div>
    </div>
  );
} 