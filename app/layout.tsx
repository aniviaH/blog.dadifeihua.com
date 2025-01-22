import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SearchBar from '@/components/SearchBar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '个人博客 | 灵感与想法',
  description: '记录个人的思考、灵感和想法的空间',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 dark:bg-gray-900`}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <nav className="flex items-center space-x-8">
                <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                  博客主页
                </a>
                <a href="/posts" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  文章
                </a>
                <a href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  关于
                </a>
              </nav>
              <div className="hidden sm:block">
                <SearchBar />
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
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
