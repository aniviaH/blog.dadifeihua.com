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
      tags: data.tags || [],
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
    const headingLines = content.split('\n').filter(line => line.startsWith('#'))
    const toc = headingLines.map(line => {
      const level = line.match(/^#+/)[0].length
      const title = line.replace(/^#+\s+/, '')
      const id = title.toLowerCase().replace(/\s+/g, '-')
      return { id, title, level }
    })

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      content,
      categories: data.categories || [],
      tags: data.tags || [],
      toc,
    }
  } catch {
    return null
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  posts.forEach(post => post.categories.forEach(category => categories.add(category)))
  return Array.from(categories)
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags)
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.categories.includes(category))
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.tags.includes(tag))
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