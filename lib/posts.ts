import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface TableOfContents {
  id: string
  title: string
  level: number
}

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  categories: string[]
  tags: string[]
  coverImage?: string
  toc?: TableOfContents[]
  readingTime?: string
}

export interface Category {
  name: string
  slug: string
  description?: string
  count: number
}

// 获取所有文章
export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // 生成目录
      const lines = content.split('\n')
      const toc: TableOfContents[] = []

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        const match = line.match(/^(#{1,6})\s+(.+)$/)

        if (match) {
          const level = match[1].length
          const title = match[2].trim()
          const id = title
            .toLowerCase()
            .replace(/[\s?]/g, '-')
            .replace(/[^a-z0-9-\u4e00-\u9fa5]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')

          toc.push({ id, title, level })
        }
      }

      return {
        slug,
        title: data.title,
        date: data.date,
        content,
        excerpt: data.excerpt || '',
        categories: data.categories || [],
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage,
        toc,
        readingTime: data.readingTime,
      }
    })

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

// 获取所有分类
export function getAllCategories(): Category[] {
  const posts = getAllPosts()
  const categoryPostsMap = new Map<string, Set<string>>()

  posts.forEach(post => {
    if (Array.isArray(post.categories)) {
      post.categories.forEach(categoryName => {
        // 使用原始分类名作为 slug
        console.log('Processing category for post:', post.slug, categoryName)

        if (!categoryPostsMap.has(categoryName)) {
          categoryPostsMap.set(categoryName, new Set())
        }
        categoryPostsMap.get(categoryName)!.add(post.slug)
        console.log(
          `Category '${categoryName}' now has ${categoryPostsMap.get(categoryName)!.size} posts`
        )
      })
    }
  })

  const categories = Array.from(categoryPostsMap.entries()).map(([name, posts]) => {
    console.log(
      `Creating category object for '${name}' with ${posts.size} posts:`,
      Array.from(posts)
    )
    return {
      name,
      slug: name,
      count: posts.size,
    }
  })

  console.log('All categories with counts:', categories)
  return categories.sort((a, b) => b.count - a.count)
}

// 根据 slug 获取分类信息
export function getCategoryBySlug(slug: string): Category | null {
  console.log('Looking for category with slug:', slug)
  const categories = getAllCategories()
  // 使用原始分类名进行比较
  const decodedSlug = decodeURIComponent(slug)
  const category = categories.find(category => category.slug === decodedSlug)
  console.log('Found category:', category)
  return category || null
}

// 获取指定分类下的所有文章
export function getPostsByCategory(categorySlug: string): Post[] {
  const posts = getAllPosts()
  // 使用 decodeURIComponent 解码 URL 编码的 slug
  const decodedSlug = decodeURIComponent(categorySlug)
  console.log('getPostsByCategory - Decoded slug:', decodedSlug)
  return posts.filter(
    post =>
      Array.isArray(post.categories) &&
      post.categories.some(category => {
        console.log('Comparing category:', category, 'with decodedSlug:', decodedSlug)
        return category === decodedSlug
      })
  )
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // 生成目录
    const lines = content.split('\n')
    const toc: TableOfContents[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      const match = line.match(/^(#{1,6})\s+(.+)$/)

      if (match) {
        const level = match[1].length
        const title = match[2].trim()
        const id = title
          .toLowerCase()
          .replace(/[\s?]/g, '-')
          .replace(/[^a-z0-9-\u4e00-\u9fa5]/g, '')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')

        toc.push({ id, title, level })
      }
    }

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      content,
      categories: data.categories || [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      coverImage: data.coverImage,
      toc,
    }
  } catch (error) {
    console.error('Error in getPostBySlug:', error)
    return null
  }
}

export function getAllTagNames(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()

  posts.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tagSet.add(tag)
      })
    }
  })

  return Array.from(tagSet)
}

export function getAllTags(): { [key: string]: Post[] } {
  const posts = getAllPosts()
  const tags: { [key: string]: Post[] } = {}

  posts.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        console.log('Processing tag:', tag)
        if (!tags[tag]) {
          tags[tag] = []
        }
        tags[tag].push(post)
      })
    }
  })

  return tags
}

export function getPostsByTag(tag: string): Post[] {
  console.log('Getting posts for tag:', tag)
  const posts = getAllPosts()
  const decodedTag = decodeURIComponent(tag)
  console.log('Decoded tag:', decodedTag)
  return posts.filter(post => Array.isArray(post.tags) && post.tags.includes(decodedTag))
}

export function searchPosts(query: string): Post[] {
  const posts = getAllPosts()
  const searchTerm = query.toLowerCase()
  return posts.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.categories.some(category => category.toLowerCase().includes(searchTerm))
  )
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlugNew(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const post: Post = {
    slug: realSlug,
    title: data.title,
    date: data.date,
    content,
    excerpt: data.excerpt || '',
    coverImage: data.coverImage,
    tags: Array.isArray(data.tags) ? data.tags : [],
    categories: data.categories || [],
  }

  return post
}

export function getAllTagsNew(): { [key: string]: Post[] } {
  const posts = getAllPosts()
  const tags: { [key: string]: Post[] } = {}

  posts.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (!tags[tag]) {
          tags[tag] = []
        }
        tags[tag].push(post)
      })
    }
  })

  return tags
}

export function getPostsByTagNew(tag: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => Array.isArray(post.tags) && post.tags.includes(tag))
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): Post[] {
  const posts = getAllPosts()
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug && post.tags?.some(tag => tags.includes(tag)))
    .sort((a, b) => {
      const aCommonTags = a.tags?.filter(tag => tags.includes(tag)).length || 0
      const bCommonTags = b.tags?.filter(tag => tags.includes(tag)).length || 0
      return bCommonTags - aCommonTags
    })
    .slice(0, limit)
  return relatedPosts
}
