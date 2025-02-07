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
  const totalPosts = categories.reduce((acc, category) => acc + category.count, 0)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
          文章分类
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          共 {categories.length} 个分类，{totalPosts} 篇文章
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(category => (
            <Link
              key={category.name}
              href={`/categories/${category.name}`}
              className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg active:scale-[0.98]"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                    {category.name}
                  </h2>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
                    {category.count}
                  </span>
                </div>
                {category.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{category.description}</p>
                )}
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 -z-20 bg-gradient-to-br from-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
