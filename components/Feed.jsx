"use client"
import React, { useState, useEffect, useRef } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-8 sm:mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => { 
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
 
  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setAllPosts(data);
    } 
    fetchPosts();

    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchPrompts = (search) => {
    const regex = new RegExp(search, 'i');
    return allPosts.filter((item) => 
      regex.test(item.creator.username) || 
      regex.test(item.tag) || 
      regex.test(item.prompt)
    );
  };

  const getSuggestions = (search) => {
    if (!search) return [];
    
    const regex = new RegExp(search, 'i');
    const uniqueSuggestions = new Set();
    
    allPosts.forEach((post) => {
      if (regex.test(post.creator.username)) {
        uniqueSuggestions.add(`@${post.creator.username}`);
      }
      if (regex.test(post.tag)) {
        uniqueSuggestions.add(`#${post.tag}`);
      }
      if (regex.test(post.prompt)) {
        const words = post.prompt.split(' ');
        words.forEach(word => {
          if (regex.test(word) && word.length > 3) {
            uniqueSuggestions.add(word);
          }
        });
      }
    });
    
    return Array.from(uniqueSuggestions).slice(0, 5);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const value = e.target.value;
    setSearchText(value);
    
    if (value) {
      setShowSuggestions(true);
      const newSuggestions = getSuggestions(value);
      setSuggestions(newSuggestions);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = searchPrompts(value);
        setSearchResult(searchResult);
      }, 500)
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setShowSuggestions(false);
    const searchResult = searchPrompts(suggestion);
    setSearchResult(searchResult);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setShowSuggestions(false);
    const searchResult = searchPrompts(tag);
    setSearchResult(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full max-w-2xl mx-auto flex-center' ref={searchRef}>
        <input
          type='text'
          placeholder='Search for a tag, username, or prompt'
          value={searchText}
          onChange={handleSearchChange}
          onFocus={() => searchText && setShowSuggestions(true)}
          required
          className='search_input peer' 
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className='autocomplete-dropdown'>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className='autocomplete-item'
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>

      {searchText ? (
        <PromptCardList 
          data={searchResult}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={allPosts} 
          handleTagClick={handleTagClick} 
        />
      )}
    </section>
  )
}

export default Feed
