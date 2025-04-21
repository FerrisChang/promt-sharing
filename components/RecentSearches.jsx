"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * RecentSearches component manages and displays the user's recent search history.
 * Features:
 * - Stores searches in localStorage
 * - Displays up to 5 most recent searches
 * - Allows clearing all searches
 * - Provides clickable search history
 */
const RecentSearches = () => {
  const router = useRouter()
  const [recentSearches, setRecentSearches] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  /**
   * Loads recent searches from localStorage when component mounts
   */
  useEffect(() => {
    const localSearches = localStorage.getItem('recentSearches')
    if (localSearches) {
      setRecentSearches(JSON.parse(localSearches))
    }
  }, [])

  /**
   * Adds a new search to the recent searches list
   * @param {string} searchTerm - The search term to add
   */
  const addSearch = (searchTerm) => {
    const newSearches = [
      { term: searchTerm, timestamp: new Date().toISOString() },
      ...recentSearches.filter(search => search.term !== searchTerm)
    ].slice(0, 5) // Keep only the 5 most recent searches

    setRecentSearches(newSearches)
    localStorage.setItem('recentSearches', JSON.stringify(newSearches))
  }

  /**
   * Handles clicking on a recent search
   * @param {string} searchTerm - The search term to navigate to
   */
  const handleSearchClick = (searchTerm) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    setShowDropdown(false)
  }

  /**
   * Clears all recent searches from localStorage and state
   */
  const clearSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 text-sm font-inter text-gray-700 hover:text-gray-500"
      >
        Recent Searches
        <svg
          className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            {recentSearches.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-gray-700">Recent Searches</h3>
                  <button
                    onClick={clearSearches}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleSearchClick(search.term)}
                  >
                    <span className="text-sm text-gray-700">{search.term}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(search.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-gray-500 p-2">No recent searches</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecentSearches 