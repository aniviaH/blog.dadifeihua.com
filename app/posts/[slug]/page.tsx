import { getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PostPageProps {
  params: {
    slug: string
  }
}

function TableOfContents({ toc }) {
  return (
    <nav className="space-y-2">
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`
            block text-sm transition-colors duration-200 
            ${item.level === 1 ? 'font-semibold' : 'font-normal'}
            ${item.level === 2 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}
            hover:text-blue-600 dark:hover:text-blue-400
          `}
          style={{ 
            paddingLeft: `${(item.level - 1) * 1}rem`,
            opacity: `${Math.max(0.9 - (item.level - 1) * 0.1, 0.6)}`,
          }}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <div className="lg:flex lg:gap-8">
        {/* 侧边栏 */}
        <aside className="lg:w-64 space-y-8">
          {post.toc && post.toc.length > 0 && (
            <div className="sticky top-24 space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                目录
              </h2>
              <TableOfContents toc={post.toc} />
            </div>
          )}
        </aside>

        {/* 主要内容 */}
        <article className="prose dark:prose-invert mx-auto max-w-4xl">
          <header className="mb-8 not-prose">
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {post.title}
            </h1>
            
            {/* 分类和标签 */}
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
          </header>
          
          <div className="prose-headings:scroll-mt-20 prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-500">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </div>
    </div>
  )
}
