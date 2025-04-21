"use client"

import PromptCard from './PromptCard'

/**
 * PromptCardList component displays a grid of prompt cards.
 * Features:
 * - Responsive grid layout
 * - Handles empty state
 * - Passes tag click events to parent
 * 
 * @param {Array} data - Array of prompt objects to display
 * @param {Function} handleTagClick - Callback for when a tag is clicked
 */
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.length > 0 ? (
        data.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No prompts found</p>
      )}
    </div>
  )
}

export default PromptCardList 