import { NextRequest, NextResponse } from 'next/server';

/**
 * POST handler for subscription cancellation
 * This endpoint is called by the LLM when user wants to cancel subscription
 * Forwards the request to the configured forwarding URL
 */
export async function POST(request: NextRequest) {
  try {
    // Extract token from query parameters
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    // Validate token exists
    if (!token) {
      return new NextResponse(
        'Error: Missing token parameter. Please provide a valid token.',
        {
          status: 400,
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );
    }

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
            'X-Forwarded-For': request.headers.get('x-forwarded-for') || request.ip || 'unknown',
            'User-Agent': request.headers.get('user-agent') || 'subscription-api',
          },
          body: JSON.stringify({
            action: 'cancel',
            token: token,
            timestamp: new Date().toISOString(),
            source: 'subscription-management-api',
          }),
        });

        if (forwardResponse.ok) {
          const forwardData = await forwardResponse.text();
          console.log('Forwarded request successful:', forwardData);
          
          return new NextResponse(
            'Subscription cancellation request forwarded and processed successfully.',
            {
              status: 200,
              headers: {
                'Content-Type': 'text/plain',
              },
            }
          );
        } else {
          console.error('Forwarding request failed:', forwardResponse.status, forwardResponse.statusText);
          return new NextResponse(
            'Subscription cancellation request received but forwarding failed.',
            {
              status: 200,
              headers: {
                'Content-Type': 'text/plain',
              },
            }
          );
        }
      } catch (forwardError) {
        console.error('Error forwarding request:', forwardError);
        return new NextResponse(
          'Subscription cancellation request received but forwarding failed.',
          {
            status: 200,
            headers: {
              'Content-Type': 'text/plain',
            },
          }
        );
      }
    } else {
      // No forwarding URL configured, return local success response
      console.log('No forwarding URL configured, processing locally');
      return new NextResponse(
        'Subscription cancellation request received and processed successfully.',
        {
          status: 200,
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );
    }

  } catch (error) {
    console.error('Error in cancel API:', error);
    return new NextResponse(
      'Internal server error occurred while processing cancellation request.',
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function GET(request: NextRequest) {
  return new NextResponse(
    'Method not allowed. This endpoint only accepts POST requests.',
    {
      status: 405,
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
} 