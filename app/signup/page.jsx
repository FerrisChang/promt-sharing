"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const SignUp = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation rules
  const validationRules = {
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    },
  }

  // Validate a single field
  const validateField = (name, value) => {
    const rules = validationRules[name]
    if (!rules) return ''

    if (rules.required && !value) {
      return 'This field is required'
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be less than ${rules.maxLength} characters`
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      switch (name) {
        case 'username':
          return 'Username can only contain letters, numbers, and underscores'
        case 'email':
          return 'Please enter a valid email address'
        case 'password':
          return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        default:
          return 'Invalid format'
      }
    }

    return ''
  }

  // Validate all fields
  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field])
      newErrors[field] = error
      if (error) isValid = false
    })

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Handle blur events to validate fields
  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors((prev) => ({ ...prev, general: '' }))

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Store user profile locally
      const userProfile = {
        username: formData.username,
        email: formData.email,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem('userProfile', JSON.stringify(userProfile))

      // Sign in the user
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setErrors((prev) => ({ ...prev, general: result.error }))
      } else {
        router.push('/profile')
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: error.message }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className='w-full flex-center flex-col'>
      <div className='w-full max-w-5xl flex-center flex-col px-4'>
        <h1 className='head_text text-center'>
          <span className='blue_gradient'>Create Account</span>
        </h1>
        <p className='desc text-center max-w-md'>
          Join Promptopia to share your AI prompts with the community and discover new ideas.
        </p>

        <div className='flex items-start gap-10 w-full mt-10'>
          <form onSubmit={handleSubmit} className='w-full max-w-md flex flex-col gap-7 glassmorphism p-8'>
            {errors.general && (
              <div className='text-red-500 text-sm bg-red-50 p-3 rounded-md'>
                {errors.general}
              </div>
            )}
            
            <div>
              <label htmlFor='username' className='font-satoshi font-semibold text-base text-gray-700'>
                Username
              </label>
              <input
                id='username'
                name='username'
                type='text'
                required
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Enter your username'
                className={`form_input ${errors.username ? 'border-red-500' : ''}`}
              />
              {errors.username && (
                <p className='text-red-500 text-sm mt-1'>{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor='email' className='font-satoshi font-semibold text-base text-gray-700'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Enter your email'
                className={`form_input ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor='password' className='font-satoshi font-semibold text-base text-gray-700'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Enter your password'
                className={`form_input ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor='confirmPassword' className='font-satoshi font-semibold text-base text-gray-700'>
                Confirm Password
              </label>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Confirm your password'
                className={`form_input ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>
              )}
            </div>

            <div className='flex-center gap-4 mt-4'>
              <button
                type='button'
                onClick={() => router.push('/')}
                className='text-sm text-gray-500 hover:text-gray-700'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className='w-64 glassmorphism p-6 mt-8'>
            <h3 className='font-satoshi font-semibold text-base text-gray-700 mb-4'>
              Password Requirements:
            </h3>
            <ul className='text-sm text-gray-600 space-y-2'>
              <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-500' : ''}`}>
                <span className='mr-2'>✓</span>
                At least 8 characters
              </li>
              <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}`}>
                <span className='mr-2'>✓</span>
                One uppercase letter
              </li>
              <li className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-500' : ''}`}>
                <span className='mr-2'>✓</span>
                One lowercase letter
              </li>
              <li className={`flex items-center ${/\d/.test(formData.password) ? 'text-green-500' : ''}`}>
                <span className='mr-2'>✓</span>
                One number
              </li>
              <li className={`flex items-center ${/[@$!%*?&]/.test(formData.password) ? 'text-green-500' : ''}`}>
                <span className='mr-2'>✓</span>
                One special character
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp 