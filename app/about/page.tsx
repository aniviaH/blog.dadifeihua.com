import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { createMetadata } from '@/lib/metadata'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism'

export const metadata = createMetadata({
  title: '关于我',
  description: '了解更多关于我的信息',
  path: '/about',
})

export default function AboutPage() {
  const aboutFile = path.join(process.cwd(), 'content/about.mdx')
  const fileContent = fs.readFileSync(aboutFile, 'utf8')
  const { content, data } = matter(fileContent)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <article className="prose prose-base dark:prose-invert prose-blue mx-auto">
          <header className="text-center mb-12 not-prose">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              关于我
            </h1>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              最后更新：
              {new Date(data.lastUpdate).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="prose-headings:text-xl prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-base prose-li:text-base">
              <MDXRemote
                source={content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypePrism],
                  },
                }}
              />
            </div>
          </div>

          <div className="mt-12 text-center not-prose">
            <a
              href="https://github.com/aniviah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              在 GitHub 上关注我
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}
