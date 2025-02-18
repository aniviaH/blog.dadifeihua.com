import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SearchBar from '@/components/SearchBar'
import ThemeToggle from '@/components/ThemeToggle'
import ThemeProvider from '@/components/ThemeProvider'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { Suspense } from 'react'
import Script from 'next/script'
import { getAllPosts } from '@/lib/posts'
import type { SearchablePost } from '@/lib/search'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '个人博客 | 灵感与想法',
  description: '记录个人的思考、灵感和想法的空间',
}

function getSearchablePosts(): SearchablePost[] {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    categories: post.categories,
    tags: post.tags,
    coverImage: post.coverImage,
  }))
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const posts = getSearchablePosts()
  const postsScript = `window.__POSTS__ = ${JSON.stringify(posts)};`

  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 dark:bg-gray-900`}
      >
        <Script id="search-data" dangerouslySetInnerHTML={{ __html: postsScript }} />
        <ThemeProvider>
          <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <nav className="flex items-center space-x-8">
                  <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                    博客主页
                  </Link>
                  <Link
                    href="/posts"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    文章
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    关于
                  </Link>
                </nav>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-1 justify-center px-2">
                      <Suspense fallback={<div className="w-full max-w-lg h-10" />}>
                        <SearchBar />
                      </Suspense>
                    </div>
                    <ThemeToggle />
                    <a
                      href="https://github.com/aniviah"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      <FaGithub className="h-6 w-6" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        </ThemeProvider>
        <footer className="border-t bg-white dark:bg-gray-900 dark:border-gray-800">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {new Date().getFullYear()} 个人博客. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
