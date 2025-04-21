import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test different types of errors
    console.error('Test Error 1: Simple error message')
    console.error(new Error('Test Error 2: Error object'))
    console.error('Test Error 3: Object error', { 
      message: 'Custom error object',
      code: 'TEST_ERROR',
      details: {
        timestamp: new Date().toISOString(),
        path: '/api/test'
      }
    })
    
    // Test warning
    console.warn('Test Warning: This is a warning message')
    
    // Test info
    console.info('Test Info: This is an info message')
    
    // Test debug
    console.debug('Test Debug: This is a debug message')
    
    // Test trace
    console.trace('Test Trace: This is a trace message')
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Test errors have been logged to console'
    })
  } catch (error) {
    console.error('Test Error 4: Caught error', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 