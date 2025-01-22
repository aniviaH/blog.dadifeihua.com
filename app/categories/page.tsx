import Link from 'next/link'
import { getAllCategories } from '@/lib/posts'
import { createMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: '文章分类',
  description: '浏览所有文章分类',
  path: '/categories',
})

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">文章分类</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <Link
            key={category.name}
            href={`/categories/${category.slug}`}
            className="group block p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground group-hover:text-primary">
                {category.name}
              </h2>
              <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-primary/10 text-primary">
                {category.count}
              </span>
            </div>
            {category.description && (
              <p className="mt-2 text-muted-foreground">{category.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
