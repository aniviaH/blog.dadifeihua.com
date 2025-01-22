'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  toc: TocItem[]
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const headingRefs = useRef<Map<string, HTMLElement>>(new Map())

  // 初始化时获取所有标题元素的引用
  useEffect(() => {
    const refs = new Map<string, HTMLElement>()
    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        refs.set(id, element)
      }
    })
    headingRefs.current = refs
  }, [toc])

  // 处理滚动
  const handleScroll = useCallback(() => {
    if (headingRefs.current.size === 0) return

    const headings = Array.from(headingRefs.current.entries())
    const headerOffset = 100

    // 检查是否滚动到底部
    const isAtBottom = 
      window.innerHeight + window.scrollY >= 
      document.documentElement.scrollHeight - 100

    if (isAtBottom) {
      // 如果在底部，激活最后一个标题
      const lastHeading = headings[headings.length - 1]
      setActiveId(lastHeading[0])
      return
    }

    // 找到当前可见的标题
    for (const [id, element] of headings) {
      const { top } = element.getBoundingClientRect()
      if (top >= 0 && top <= headerOffset) {
        setActiveId(id)
        return
      }
    }

    // 如果没有找到可见的标题，使用最后一个已经过去的标题
    for (let i = headings.length - 1; i >= 0; i--) {
      const [id, element] = headings[i]
      const { top } = element.getBoundingClientRect()
      if (top <= headerOffset) {
        setActiveId(id)
        return
      }
    }
  }, [])

  // 处理目录项点击
  const scrollToHeading = useCallback((id: string) => {
    const element = headingRefs.current.get(id)
    if (!element) return

    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }, [])

  // 添加滚动监听
  useEffect(() => {
    if (toc.length === 0) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll() // 初始化时检查一次
    
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [toc, handleScroll])

  if (!toc || toc.length === 0) return null

  return (
    <nav className="text-sm">
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{
              paddingLeft: `${(item.level - 1) * 1}rem`
            }}
          >
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`
                group flex items-center w-full text-left py-1
                ${
                  activeId === item.id
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              <span className={`
                relative block h-1.5 w-1.5 shrink-0 rounded-full mr-2
                transition-colors duration-200
                ${
                  activeId === item.id
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-600 dark:group-hover:bg-blue-400'
                }
              `} />
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
