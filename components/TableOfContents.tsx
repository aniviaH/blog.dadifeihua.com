'use client'

import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (!toc || toc.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')
          if (entry.isIntersecting && id) {
            setActiveId(id)
          }
        })
      },
      {
        rootMargin: '-64px 0% -80% 0%',
        threshold: [0, 1],
      }
    )

    // 观察所有标题元素
    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // 初始化活动标题
    const initActiveHeading = () => {
      for (const { id } of toc) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.4) {
            setActiveId(id)
            break
          }
        }
      }
    }
    initActiveHeading()

    return () => observer.disconnect()
  }, [toc])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // 头部导航栏的高度
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (!toc || toc.length === 0) {
    return null
  }

  return (
    <nav className="text-sm">
      <ul className="space-y-3">
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
                group flex items-center w-full text-left
                ${
                  activeId === item.id
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              <span className={`
                relative block h-1.5 w-1.5 shrink-0 rounded-full
                ${
                  activeId === item.id
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }
                mr-2 group-hover:bg-blue-600 dark:group-hover:bg-blue-400
                transition-colors duration-200
              `} />
              <span className="hover:translate-x-1 transition-transform duration-200">
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
