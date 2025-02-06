import { getAllTags } from '@/lib/posts'
import { createMetadata } from '@/lib/metadata'
import TagCloud from '@/components/TagCloud'
import Link from 'next/link'

export const metadata = createMetadata({
  title: '标签云',
  description: '浏览所有文章标签',
  path: '/tags',
})

export default function TagsPage() {
  const tagsWithPosts = getAllTags()
  const tagCounts = Object.entries(tagsWithPosts)
    .map(([name, posts]) => ({
      name,
      count: posts.length,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

  const totalPosts = Object.values(tagsWithPosts).reduce((acc, posts) => acc + posts.length, 0)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            标签云
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            共 {tagCounts.length} 个标签，{totalPosts} 篇文章
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 mb-16">
          <TagCloud tags={tagCounts} />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tagCounts.map(({ name, count }, index) => (
            <div
              key={name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                #{name}
                <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                  #{index + 1}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{count} 篇文章</p>
              <Link
                href={`/tags/${encodeURIComponent(name)}`}
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                浏览文章 →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
