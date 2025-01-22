import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCoverImage from '@/components/PostCoverImage'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrism from 'rehype-prism'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

type PostMeta = {
  title: string
  description?: string
  date: string
  coverImage?: string
  content: string
  categories?: string[]
  tags?: string[]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  const { title, description, date, coverImage } = post as PostMeta

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      images: coverImage ? [coverImage] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-x-4 text-xs text-gray-500 dark:text-gray-400">
          <time dateTime={post.date}>{format(new Date(post.date), 'PPP', { locale: zhCN })}</time>
          <div className="flex items-center gap-x-4">
            {post.categories?.map(category => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {post.coverImage && (
        <div className="relative aspect-[16/9] mb-8 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
          <PostCoverImage
            src={post.coverImage}
            alt={post.title}
            priority
            className="object-cover"
            fill
          />
        </div>
      )}

      <div className="prose prose-lg prose-blue mx-auto dark:prose-invert">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypePrism],
            },
          }}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags?.map(tag => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </article>
  )
}
