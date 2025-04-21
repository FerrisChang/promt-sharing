"use client"

import { useState, useEffect } from 'react'
import PopularPrompts from '../components/PopularPrompts'
import PromptCardList from '../components/PromptCardList'
import SearchBar from '../components/SearchBar'

/**
 * Home page component that serves as the main entry point of the application.
 * Features:
 * - Search functionality
 * - Recent searches management
 * - Popular prompts display
 * - All prompts listing
 */
const Home = () => {
  const [searchedResults, setSearchedResults] = useState([])
  const [allPrompts, setAllPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [recentSearches, setRecentSearches] = useState([])
  const [error, setError] = useState(null)

  /**
   * Loads recent searches from localStorage when component mounts
   */
  useEffect(() => {
    try {
      const savedSearches = localStorage.getItem('recentSearches')
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches))
      }
    } catch (err) {
      console.error('Error loading recent searches:', err)
    }
  }, [])

  /**
   * Fetches prompts from the API when component mounts
   */
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/prompt')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setAllPrompts(data)
        setSearchedResults(data)
      } catch (error) {
        console.error('Error fetching prompts:', error)
        setError('Failed to load prompts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrompts()
  }, [])

  /**
   * Handles search functionality
   * @param {string} searchText - The text to search for
   */
  const handleSearch = (searchText) => {
    if (!searchText) {
      setSearchedResults(allPrompts)
      return
    }

    try {
      // Save search to recent searches
      const newSearch = {
        text: searchText,
        timestamp: new Date().toISOString()
      }
      const updatedSearches = [newSearch, ...recentSearches].slice(0, 5)
      setRecentSearches(updatedSearches)
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))

      // Filter prompts based on search text
      const searchResult = filterPrompts(searchText)
      setSearchedResults(searchResult)
    } catch (err) {
      console.error('Error handling search:', err)
    }
  }

  /**
   * Filters prompts based on search text
   * @param {string} searchtext - The text to filter by
   * @returns {Array} Filtered prompts
   */
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i')
    return allPrompts.filter(
      (item) =>
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  /**
   * Handles tag click events
   * @param {string} tagName - The tag that was clicked
   */
  const handleTagClick = (tagName) => {
    handleSearch(tagName)
  }

  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>

      <SearchBar onSearchChange={handleSearch} />

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">Recent Searches:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSearch(search.text)}
                className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
              >
                {search.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Popular Prompts Section */}
      <PopularPrompts />

      {/* All Prompts */}
      {isLoading ? (
        <div className="mt-16 text-center">
          <p className="text-gray-500">Loading prompts...</p>
        </div>
      ) : (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Home
