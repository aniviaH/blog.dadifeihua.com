'use client'

export interface SearchablePost {
  slug: string
  title: string
  excerpt: string
  date: string
  categories: string[]
  tags: string[]
  coverImage?: string
}

declare global {
  interface Window {
    __POSTS__: SearchablePost[]
  }
}

export function searchPosts(query: string): SearchablePost[] {
  if (typeof window === 'undefined') {
    return []
  }

  const posts = window.__POSTS__ || []
  const searchTerm = query.toLowerCase()

  return posts.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.categories.some(category => category.toLowerCase().includes(searchTerm))
  )
}
