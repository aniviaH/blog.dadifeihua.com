'use client'

import { useEffect, useState } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/solid'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件，控制按钮显示/隐藏
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过 300px 时显示按钮
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    toggleVisibility() // 初始化时检查一次

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // 点击返回顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 p-2 rounded-full
        bg-blue-600 text-white shadow-lg
        hover:bg-blue-700 
        dark:bg-blue-500 dark:hover:bg-blue-600
        transform transition-all duration-200
        hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400
        z-50
      `}
      aria-label="返回顶部"
    >
      <ArrowUpIcon className="h-6 w-6" />
    </button>
  )
}
