import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subscription Management API',
  description: 'Next.js API for LLM subscription management instructions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 