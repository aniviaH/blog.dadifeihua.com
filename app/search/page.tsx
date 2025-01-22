import { searchPosts } from '@/lib/posts'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const posts = query ? searchPosts(query) : []

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          搜索文章
        </h1>
        <div className="mt-4 flex justify-center">
          <SearchBar />
        </div>
      </div>

      {query && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {posts.length > 0
              ? `找到 ${posts.length} 篇相关文章`
              : '没有找到相关文章'}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="relative isolate flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800"
              >
                <div className="flex flex-col gap-2">
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category}`}
                      className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    >
                      {category}
                    </Link>
                  ))}
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
