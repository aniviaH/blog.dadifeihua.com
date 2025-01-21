import { getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: {
    slug: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-lg dark:prose-invert mx-auto">
      <header className="mb-8 text-center">
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
      </header>
      
      <div className="prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-500">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}
