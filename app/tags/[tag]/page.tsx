import { getPostsByTag, getAllTagNames } from '@/lib/posts'
import { createMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

export async function generateStaticParams() {
  const tags = getAllTagNames()
  console.log('Generating static params for tags:', tags)
  return tags.map(tag => {
    // 使用原始标签名作为路由参数
    console.log('Tag:', tag)
    return { tag }
  })
}

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(tag)

  if (!posts.length) {
    return {}
  }

  return createMetadata({
    title: `#${decodedTag} 的文章`,
    description: `查看标签 #${decodedTag} 下的所有文章`,
    path: `/tags/${tag}`,
  })
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  console.log('Tag page - received tag:', tag, 'decoded:', decodedTag)
  const posts = getPostsByTag(tag)

  if (!posts.length) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link
            href="/tags"
            className="group inline-flex items-center text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            返回标签云
          </Link>
          <h1 className="mt-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            #{decodedTag}
          </h1>
          <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-gray-100">{posts.length}</span>
            <span className="ml-1">篇文章</span>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map(post => (
            <article key={post.slug} className="group">
              <Link href={`/posts/${post.slug}`}>
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg active:scale-[0.98]">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <time>{format(new Date(post.date), 'PPP', { locale: zhCN })}</time>
                    {post.readingTime && (
                      <>
                        <span>·</span>
                        <span>{post.readingTime} 分钟阅读</span>
                      </>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="mt-4 text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
