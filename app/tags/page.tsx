import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
            Tags
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Browse all topics and categories
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
          {tagKeys.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">No tags found.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {sortedTags.map((t) => (
                <Link
                  key={t}
                  href={`/tags/${slug(t)}`}
                  className="group"
                  aria-label={`View posts tagged ${t}`}
                >
                  <div className="flex items-center gap-2">
                    <Tag text={t} />
                    <span className="group-hover:text-primary-500 dark:group-hover:text-primary-400 text-sm font-medium text-gray-600 transition-colors dark:text-gray-400">
                      ({tagCounts[t]})
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
