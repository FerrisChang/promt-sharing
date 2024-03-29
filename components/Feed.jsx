"use client"
import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  console.log(data)
  return (
    <div className='mt-16 prompt_layout'>
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
 
  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      
      setAllPosts(data);
    } 
    fetchPosts();
  }, []);
  

  const searchPrompts = (search) => {
    const regex = new RegExp(search, 'i');
    return allPosts.filter((item) => {
      regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
    });
  };


  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = searchPrompts(e.target.value);
        setSearchResult(searchResult);
      }, 500)
    );
  }




  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = searchPrompts(tag);
    setSearchResult(searchResult);
  }
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer' 
        />
      </form>

{searchText ? (
  <PromptCardList 
  data={searchResult}
  handleTagClick={handleTagClick}
/>
) : (
  <PromptCardList
  data={allPosts} 
  handleTagClick={handleTagClick} /> 
)}
    </section>
  )
}

export default Feed
