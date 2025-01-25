import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">页面未找到</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">抱歉，您要访问的页面不存在。</p>
        <div className="mt-8">
          <Link
            href="/"
            className="group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
