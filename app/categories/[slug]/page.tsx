import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByCategory, getCategoryBySlug } from '@/lib/posts'
import { createMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    return {}
  }

  return createMetadata({
    title: `${category.name} - 文章分类`,
    description: category.description || `${category.name}分类下的所有文章`,
    path: `/categories/${params.slug}`,
  })
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const posts = getPostsByCategory(params.slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">
          ← 返回分类列表
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-foreground">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-muted-foreground">{category.description}</p>
        )}
      </div>

      <div className="space-y-8">
        {posts.map(post => (
          <article key={post.slug} className="group">
            <Link href={`/posts/${post.slug}`}>
              <div className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary">
                  {post.title}
                </h2>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <time>{format(new Date(post.date), 'PPP', { locale: zhCN })}</time>
                  {post.readingTime && (
                    <>
                      <span>·</span>
                      <span>{post.readingTime} 分钟阅读</span>
                    </>
                  )}
                </div>
                {post.excerpt && <p className="mt-3 text-muted-foreground">{post.excerpt}</p>}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
