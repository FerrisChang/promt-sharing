'use client'

import { useState } from 'react'

export default function TestPage() {
  const [result, setResult] = useState<string>('')

  const testErrors = async () => {
    try {
      const response = await fetch('/api/test')
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error testing errors:', error)
      setResult('Error occurred while testing')
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Error Testing Page</h1>
      <p className="mb-4">Click the button below to test different types of console errors.</p>
      
      <button
        onClick={testErrors}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Test Console Errors
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">API Response:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
} 