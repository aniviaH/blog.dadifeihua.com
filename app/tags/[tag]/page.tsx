import { getPostsByTag, getAllTagNames } from '@/lib/posts'
import { createMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const tags = getAllTagNames()
  return tags.map(tag => ({
    tag: tag,
  }))
}

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  const posts = getPostsByTag(decodeURIComponent(tag))

  if (!posts.length) {
    return {}
  }

  return createMetadata({
    title: `#${tag} 的文章`,
    description: `查看标签 #${tag} 下的所有文章`,
    path: `/tags/${tag}`,
  })
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (!posts.length) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            #{decodedTag}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">共 {posts.length} 篇文章</p>
        </header>

        <div className="space-y-8">
          {posts.map(post => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/tags"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ← 返回标签云
          </Link>
        </div>
      </div>
    </div>
  )
}
