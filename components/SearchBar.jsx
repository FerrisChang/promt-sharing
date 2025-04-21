'use client'

import { useState, useEffect } from 'react'

/**
 * SearchBar component provides a search input with debounced search functionality.
 * Features:
 * - Debounced search to prevent excessive API calls
 * - Clean input handling
 * - Responsive design
 * 
 * @param {Function} onSearchChange - Callback function called when search text changes
 */
const SearchBar = ({ onSearchChange }) => {
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)

  /**
   * Handles search input changes with debouncing
   * @param {Event} e - The input change event
   */
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchText(value)

    // Clear previous timeout to prevent multiple rapid searches
    clearTimeout(searchTimeout)
    
    // Set new timeout for debounced search
    setSearchTimeout(
      setTimeout(() => {
        onSearchChange(value)
      }, 500) // 500ms debounce delay
    )
  }

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [searchTimeout])

  return (
    <form className='relative w-full flex-center max-w-2xl mt-10'>
      <input
        type='text'
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        className='search_input peer'
      />
    </form>
  )
}

export default SearchBar 