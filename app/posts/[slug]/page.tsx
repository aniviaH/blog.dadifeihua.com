import { getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import OptimizedImage from '@/components/OptimizedImage'
import TableOfContents from '@/components/TableOfContents'
import ReadingProgress from '@/components/ReadingProgress'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(
  { params }: PostPageProps
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {}
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/posts/${slug}`,
    type: 'article',
    publishedTime: post.date,
    image: post.coverImage,
  })
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  console.log('Post data:', { 
    title: post.title,
    coverImage: post.coverImage,
    date: post.date 
  });

  // 自定义 MDX 组件
  const components = {
    img: (props: any) => (
      <OptimizedImage
        {...props}
        className="rounded-lg my-8"
      />
    ),
  }

  return (
    <>
      <ReadingProgress />
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:gap-8">
          {/* 侧边栏 */}
          <aside className="hidden lg:block lg:w-64 relative">
            {post.toc && post.toc.length > 0 && (
              <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)] rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 shadow-sm">
                <h2 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 mb-4">
                  目录
                </h2>
                <TableOfContents toc={post.toc} />
              </div>
            )}
          </aside>

          {/* 主要内容 */}
          <article className="prose dark:prose-invert mx-auto max-w-4xl">
            <header className="mb-8 not-prose">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <time>
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.readingTime && (
                  <>
                    <span>·</span>
                    <span>{post.readingTime} 分钟阅读</span>
                  </>
                )}
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {post.title}
              </h1>
              {post.coverImage && (
                <div className="mt-8">
                  <OptimizedImage
                    src={post.coverImage}
                    alt={post.title}
                    width={1200}
                    height={630}
                    priority
                    className="rounded-xl"
                  />
                </div>
              )}
              {(post.categories?.length > 0 || post.tags?.length > 0) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.categories?.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category}`}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {category}
                    </Link>
                  ))}
                  {post.tags?.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            <MDXRemote source={post.content} components={components} />
            
            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center">
                <Link
                  href="/posts"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ← 返回文章列表
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </>
  )
}
