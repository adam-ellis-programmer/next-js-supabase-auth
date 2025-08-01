// app/feed/page.jsx - Client Component Version
'use client'
import { useState, useEffect } from 'react'
import { PostCard } from '@/components/posts/PostCard'
import Link from 'next/link'
import FeedContainer from '@/components/feed/FeedContainer'

export default function Feed() {
  const [initialPosts, setInitialPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch initial posts on component mount
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/posts?offset=0&limit=20')

        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }

        const posts = await response.json()
        setInitialPosts(posts)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching initial posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialPosts()
  }, [])

  // Loading state - shows immediately while data loads
  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4'></div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Loading your feed
          </h2>
          <p className='text-gray-600'>Fetching the latest posts...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Something went wrong
          </h2>
          <p className='text-gray-600 mb-4'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Empty state
  if (!initialPosts.length) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 '>
        <div className='max-w-2xl mx-auto px-4 py-16'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>Your Feed</h1>
            <p className='text-gray-600'>Discover and share amazing content</p>
          </div>

          <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50 text-center shadow-xl'>
            <div className='w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8'>
              <svg
                className='w-12 h-12 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              No posts yet!
            </h2>
            <p className='text-gray-600 mb-8 text-lg'>
              Be the first to share something amazing with the community.
            </p>
            <Link
              href='/posts/create'
              className='inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg'
            >
              Create Your First Post
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Main content - your existing layout
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-5'>
      {/* Sticky Header */}
      <div className='sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50'>
        <div className='px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Feed</h1>
              <p className='text-sm text-gray-600'>
                {initialPosts.length}+ posts
              </p>
            </div>

            {/* Quick Actions */}
            <div className='flex items-center space-x-3'>
              <button className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>

              <button className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z'
                  />
                </svg>
              </button>

              <Link
                href='/posts/create'
                className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className='grid md:grid-cols-[500px_1fr] h-screen'>
        {/* Left Side - Feed */}
        <div className='mt-10 px-6'>
          <div className='h-full'>
            {/* Your existing FeedContainer with infinite scroll */}
            <FeedContainer initialPosts={initialPosts} />
          </div>
        </div>

        {/* Right Side - Stats and Filters */}
        <div className='p-6 mt-10 grid lg:grid-cols-3 gap-4'>
          {/* Quick Stats */}
          <div className='mb-8'>
            <div className='grid grid-cols-1 gap-4'>
              <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center'>
                <h2 className='text-xl font-bold text-gray-900 mb-4'>
                  Community Stats
                </h2>
                <div className='text-3xl font-bold text-blue-600 mb-2'>
                  {initialPosts.length}+
                </div>
                <div className='text-sm text-gray-600'>Total Posts</div>
              </div>

              <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center'>
                <div className='text-3xl font-bold text-purple-600 mb-2'>
                  {initialPosts.reduce(
                    (sum, post) => sum + (post.likes_count || 0),
                    0
                  )}
                </div>
                <div className='text-sm text-gray-600'>Total Likes</div>
              </div>

              <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center'>
                <div className='text-3xl font-bold text-green-600 mb-2'>
                  {initialPosts.reduce(
                    (sum, post) => sum + (post.comments_count || 0),
                    0
                  )}
                </div>
                <div className='text-sm text-gray-600'>Total Comments</div>
              </div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 mb-8'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Filter & Sort
            </h3>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm text-gray-600 mb-2'>
                  Sort by:
                </label>
                <select className='w-full bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  <option>Latest</option>
                  <option>Most Liked</option>
                  <option>Most Commented</option>
                  <option>Oldest</option>
                </select>
              </div>
              <div>
                <label className='block text-sm text-gray-600 mb-2'>
                  Content Type:
                </label>
                <div className='flex flex-col space-y-2'>
                  <button className='px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium text-left'>
                    All Posts
                  </button>
                  <button className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm text-left'>
                    With Images
                  </button>
                  <button className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm text-left'>
                    Text Only
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Quick Actions
            </h3>
            <div className='space-y-3'>
              <Link
                href='/posts/create'
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold text-center block transition-all duration-300 hover:scale-105 hover:shadow-lg'
              >
                Create New Post
              </Link>
              <button
                onClick={() => window.location.reload()}
                className='w-full bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-700 px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/80'
              >
                Refresh Feed
              </button>
              <button className='w-full bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-700 px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/80'>
                Mark All Read
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <Link
        href='/posts/create'
        className='fixed bottom-6 right-6 lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-10'
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
          />
        </svg>
      </Link>
    </div>
  )
}
