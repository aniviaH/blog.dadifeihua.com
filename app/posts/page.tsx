import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        所有文章
      </h1>
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
            <Link
              href={`/posts/${post.slug}`}
              className="mt-auto text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              阅读全文 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}