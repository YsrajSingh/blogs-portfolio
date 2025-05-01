'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef, useCallback } from 'react'

const POSTS_PER_PAGE = 9

interface Post {
  slug: string
  date: string
  title: string
  summary: string
  tags: string[]
  images: string[]
  path: string
}

export default function Home({ posts }: { posts: Post[] }) {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)
  const loadingRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    // Initial loading state
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const newPosts = posts.slice(0, page * POSTS_PER_PAGE)
    setDisplayedPosts(newPosts)
    setHasMore(newPosts.length < posts.length)
  }, [page, posts])

  // Trims the summary to 20 words and adds "..." if more words exist.
  const trimSummary = (summary: string, wordCount = 20) => {
    if (!summary) return ''
    const words = summary.split(' ')
    return words.length > wordCount ? words.slice(0, wordCount).join(' ') + '...' : summary
  }

  return (
    <div className="mx-auto mt-32 w-full max-w-6xl px-4 py-6 md:mt-24 md:px-6 md:py-10">
      <h1 className="mb-6 text-4xl font-bold text-gray-800 md:mb-10 md:text-6xl">Blogs</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex animate-pulse cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className="h-36 bg-gray-200 md:h-48"></div>
                  <div className="flex flex-grow flex-col p-4 md:p-6">
                    <div className="mb-4 h-8 w-3/4 rounded bg-gray-200"></div>
                    <div className="mb-4 h-6 rounded bg-gray-200"></div>
                    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                  </div>
                  <div className="mt-auto border-t border-gray-300 p-4">
                    <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                  </div>
                </div>
              ))
          : displayedPosts.map((post) => {
              const { slug, date, title, summary, tags, images, path } = post
              return (
                <Link
                  key={slug}
                  className="flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                  role="button"
                  tabIndex={0}
                  href={path}
                >
                  {/* Image or Placeholder */}
                  {images && images.length > 0 ? (
                    <Image
                      src={images[0]}
                      alt="Thumbnail"
                      width={700}
                      height={300}
                      className="h-36 w-full object-cover md:h-48"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,..."
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={70}
                    />
                  ) : (
                    <div className="h-36 w-full bg-gray-200 md:h-48"></div>
                  )}

                  {/* Content */}
                  <div className="flex flex-grow flex-col p-4 md:p-6">
                    <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors hover:text-black md:text-2xl">
                      {title}
                    </h2>
                    <p className="md:text-md mb-4 flex-grow text-sm text-gray-600">
                      {trimSummary(summary)}
                    </p>
                    <div className="flex flex-wrap">
                      {tags &&
                        tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="mr-2 mb-2 rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-black md:text-sm"
                          >
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto border-t border-gray-300 p-4">
                    <p className="text-xs text-gray-500 md:text-sm">
                      {new Date(date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </Link>
              )
            })}
      </div>

      {/* Loading indicator */}
      {hasMore && !loading && (
        <div ref={loadingRef} className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800"></div>
        </div>
      )}
    </div>
  )
}
