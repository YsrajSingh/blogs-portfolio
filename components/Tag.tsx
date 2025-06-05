'use client'

import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const sluggedText = slug(text)

  return (
    <Link
      href={`/tags/${sluggedText}`}
      className="bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-100 dark:hover:bg-primary-800 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200"
    >
      {text}
    </Link>
  )
}

export default Tag
