import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  categories: string[]
  tags: string[]
  coverImage?: string
  toc?: TableOfContents[]
}

export type TableOfContents = {
  id: string
  title: string
  level: number
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      content,
      categories: data.categories || [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      coverImage: data.coverImage,
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
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

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  posts.forEach(post => post.categories.forEach(category => categories.add(category)))
  return Array.from(categories)
}

export function getAllTags(): { [key: string]: Post[] } {
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

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.categories.includes(category))
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => Array.isArray(post.tags) && post.tags.includes(tag))
}

export function searchPosts(query: string): Post[] {
  const posts = getAllPosts()
  const searchTerm = query.toLowerCase()
  return posts.filter(post => 
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
    tags: Array.isArray(data.tags) ? data.tags : []
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