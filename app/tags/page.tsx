import { getAllPosts } from '@/lib/posts'
import { createMetadata } from '@/lib/metadata'
import TagCloud from '@/components/TagCloud'
import Link from 'next/link'

export const metadata = createMetadata({
  title: '标签云',
  description: '浏览所有文章标签',
  path: '/tags',
})

export default function TagsPage() {
  console.log('TagsPage: Starting to process tags')
  const posts = getAllPosts()
  console.log('TagsPage: Found posts:', posts.length)

  // 使用 Set 来记录每个标签对应的文章
  const tagPostsMap = new Map<string, Set<string>>()

  // 统计每个标签的文章
  posts.forEach(post => {
    if (Array.isArray(post.tags)) {
      console.log('TagsPage: Processing tags for post:', post.slug, post.tags)
      post.tags.forEach(tag => {
        if (!tagPostsMap.has(tag)) {
          tagPostsMap.set(tag, new Set())
        }
        tagPostsMap.get(tag)!.add(post.slug)
        console.log('TagsPage: Tag post count updated -', tag, tagPostsMap.get(tag)!.size)
      })
    }
  })

  console.log(
    'TagsPage: Raw tag posts:',
    Object.fromEntries(Array.from(tagPostsMap.entries()).map(([tag, posts]) => [tag, posts.size]))
  )

  // 转换为数组并排序
  const sortedTags = Array.from(tagPostsMap.entries())
    .map(([name, posts]) => ({ name, count: posts.size }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

  console.log('TagsPage: Sorted tags:', sortedTags)

  // 计算所有文章的总数（去重）
  const allTaggedPosts = new Set<string>()
  tagPostsMap.forEach(posts => posts.forEach(post => allTaggedPosts.add(post)))
  const totalPosts = allTaggedPosts.size

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
          标签云
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          共 {sortedTags.length} 个标签，{totalPosts} 篇文章
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 mb-16">
          <TagCloud tags={sortedTags} />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTags.map(({ name, count }, index) => (
            <div
              key={name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                #{name}
                <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                  #{index + 1}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{count} 篇文章</p>
              <Link
                href={`/tags/${name}`}
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                浏览文章 →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
