import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/brevo'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, projectType, location, budget, timeline, message } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    await sendEmail(
      { name, email, phone, service, projectType, location, budget, timeline, message },
      'quote'
    )

    return NextResponse.json(
      { message: 'Quote request sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Quote form error:', error)
    return NextResponse.json(
      { error: 'Failed to send quote request. Please try again later.' },
      { status: 500 }
    )
  }
}