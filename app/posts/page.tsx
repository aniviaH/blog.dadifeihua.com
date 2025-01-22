import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'
import PostCoverImage from '@/components/PostCoverImage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '文章列表',
  description: '所有博客文章的列表',
}

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-12">
        所有文章
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <article
            key={post.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            <Link href={`/posts/${post.slug}`} className="group">
              <div className="relative aspect-[16/9] bg-gray-100 dark:bg-gray-800">
                <PostCoverImage
                  src={post.coverImage}
                  alt={post.title}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <time
                  dateTime={post.date}
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  {format(new Date(post.date), 'PPP', { locale: zhCN })}
                </time>
                <p className="mt-4 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.categories?.map(category => (
                    <span
                      key={category}
                      className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
