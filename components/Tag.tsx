'use client' // Mark this file as a Client Component

import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 cursor-pointer text-sm font-medium uppercase">
      {text.split(' ').join('-')}
    </div>
  )
}

export default Tag
