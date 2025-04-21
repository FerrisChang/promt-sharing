"use client";

import React, { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
 * PromptCard component displays a single prompt with its details.
 * Features:
 * - Displays creator information
 * - Shows prompt content
 * - Allows copying prompt text
 * - Shows associated tags
 * 
 * @param {Object} post - The prompt data to display
 * @param {Function} handleTagClick - Callback for when a tag is clicked
 */
const PromptCard = ({ post, handleTagClick }) => {
  const router = useRouter();
  const [copied, setCopied] = useState('');

  /**
   * Handles copying the prompt text to clipboard
   * Shows a visual feedback by setting the copied state
   */
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3'>
          <Image
            src={post.creator?.image || '/assets/images/default-avatar.png'}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator?.username || 'Anonymous'}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator?.email || 'No email provided'}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
    </div>
  )
}

export default PromptCard
