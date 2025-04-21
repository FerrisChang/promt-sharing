"use client"

import { useState } from 'react'
import Link from 'next/link'

/**
 * Categories for organizing prompts
 * @type {Array<{id: string, name: string}>}
 */
const categories = [
  { id: 'all', name: 'All Prompts' },
  { id: 'writing', name: 'Writing' },
  { id: 'coding', name: 'Coding' },
  { id: 'business', name: 'Business' },
  { id: 'education', name: 'Education' },
  { id: 'creative', name: 'Creative' },
]

/**
 * Sample popular prompts data
 * In a production environment, this would be fetched from an API
 * @type {Object<string, Array>}
 */
const popularPrompts = {
  all: [
    {
      id: 1,
      title: 'Write a professional email',
      description: 'Generate a professional email for business communication',
      category: 'business',
      likes: 1200,
    },
    {
      id: 2,
      title: 'Python code explanation',
      description: 'Explain complex Python code in simple terms',
      category: 'coding',
      likes: 950,
    },
    {
      id: 3,
      title: 'Creative story starter',
      description: 'Generate an engaging opening for a story',
      category: 'creative',
      likes: 800,
    },
  ],
  writing: [
    {
      id: 4,
      title: 'Blog post outline',
      description: 'Create a structured outline for a blog post',
      category: 'writing',
      likes: 750,
    },
    {
      id: 5,
      title: 'Social media post',
      description: 'Generate engaging social media content',
      category: 'writing',
      likes: 600,
    },
  ],
  coding: [
    {
      id: 6,
      title: 'Code review assistant',
      description: 'Help review and improve code quality',
      category: 'coding',
      likes: 850,
    },
    {
      id: 7,
      title: 'Debugging helper',
      description: 'Assist in finding and fixing bugs',
      category: 'coding',
      likes: 700,
    },
  ],
  business: [
    {
      id: 8,
      title: 'Business plan generator',
      description: 'Create a comprehensive business plan',
      category: 'business',
      likes: 900,
    },
    {
      id: 9,
      title: 'Market analysis',
      description: 'Generate market research and analysis',
      category: 'business',
      likes: 650,
    },
  ],
  education: [
    {
      id: 10,
      title: 'Study guide creator',
      description: 'Generate study guides for any subject',
      category: 'education',
      likes: 550,
    },
    {
      id: 11,
      title: 'Lesson plan generator',
      description: 'Create detailed lesson plans',
      category: 'education',
      likes: 500,
    },
  ],
  creative: [
    {
      id: 12,
      title: 'Character development',
      description: 'Generate detailed character profiles',
      category: 'creative',
      likes: 700,
    },
    {
      id: 13,
      title: 'World building',
      description: 'Create rich and detailed fictional worlds',
      category: 'creative',
      likes: 600,
    },
  ],
}

/**
 * PopularPrompts component displays a categorized list of popular prompts.
 * Features:
 * - Category filtering
 * - Responsive grid layout
 * - Like count display
 * - Interactive category selection
 */
const PopularPrompts = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className='w-full max-w-5xl mx-auto mt-8'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold text-gray-900'>Popular Prompts</h2>
        
        {/* Category Selection */}
        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Prompts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {popularPrompts[activeCategory].map((prompt) => (
            <Link
              key={prompt.id}
              href={`/prompt/${prompt.id}`}
              className='glassmorphism p-4 rounded-lg hover:shadow-lg transition-shadow'
            >
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                {prompt.title}
              </h3>
              <p className='text-gray-600 text-sm mb-4'>{prompt.description}</p>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-500'>{prompt.category}</span>
                <div className='flex items-center gap-1'>
                  <svg
                    className='w-4 h-4 text-gray-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                  <span className='text-sm text-gray-600'>{prompt.likes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularPrompts 