'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) return null

  return (
    <div>
      {!loadComments ? (
        <button
          onClick={() => setLoadComments(true)}
          className="rounded border border-black px-3 py-1 text-sm text-black transition hover:border-gray-500 hover:text-gray-600"
        >
          Load Comments
        </button>
      ) : (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      )}
    </div>
  )
}
