import React from 'react'
import Feed from '@components/Feed'

const Home = () => {
  return (
    <div>
      <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
          Explore, Create, & Exchange
          <br className='max-md:hidden' />
          <span className='blue_gradient text-center'>Your Amazing Prompts</span>
        </h1>
        <p className='desc text-center'>
          PromptMe is a open-source AI tool designed to explore, create, and exchange innovative prompts.
        </p>

      <Feed />
      </section>
    </div>
  )
}

export default Home
