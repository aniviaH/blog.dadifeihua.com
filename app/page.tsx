import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'
import { getAllCategories } from '@/lib/posts'

export default function Home() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
            <div className="w-40 h-40 shrink-0">
              <OptimizedImage
                src="/avatar.jpeg"
                alt="博主头像"
                width={160}
                height={160}
                priority
                className="rounded-full ring-4 ring-white dark:ring-gray-800 shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                刘欢的博客
              </h1>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                热爱技术，热爱生活，记录成长的点点滴滴。
              </p>
              <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-4">
                <Link
                  href="/posts"
                  className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-sm bg-blue-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                  阅读博客
                </Link>
                <Link
                  href="/about"
                  className="rounded-full px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-800"
                >
                  关于我
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center sm:text-left">
              <h2 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white mb-4">
                最新文章
              </h2>
              <Link
                href="/posts"
                className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                查看全部文章 →
              </Link>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center sm:text-left">
              <h2 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white mb-4">
                文章分类
              </h2>
              <div className="mb-4 space-y-2">
                {categories.map(category => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {category.count} 篇
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/categories"
                className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                浏览所有分类 →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
