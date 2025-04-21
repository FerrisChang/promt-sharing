"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * Navigation component that provides the main navigation bar for the application.
 * Contains links to the home page and create prompt page.
 * Responsive design with different layouts for mobile and desktop views.
 */
const Nav = () => {
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      {/* Logo and Brand */}
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation - Visible on medium and larger screens */}
      <div className='sm:flex hidden'>
        <div className='flex gap-3 md:gap-5'>
          <Link href='/create-prompt' className='black_btn'>
            Create Post
          </Link>
        </div>
      </div>

      {/* Mobile Navigation - Visible on small screens */}
      <div className='sm:hidden flex relative'>
        <div className='flex'>
          <Link href='/create-prompt' className='black_btn'>
            Create
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
