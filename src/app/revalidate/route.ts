import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Revalidate all pages that might have changed
    revalidatePath('/', 'layout')
    
    return NextResponse.json({ 
      revalidated: true,
      message: 'All pages revalidated' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}