'use client'

import Link from 'next/link'
import { useCallback, useMemo } from 'react'

interface TagCloudProps {
  tags: Array<{
    name: string
    count: number
  }>
}

export default function TagCloud({ tags }: TagCloudProps) {
  const maxCount = useMemo(() => Math.max(...tags.map(tag => tag.count)), [tags])
  const minCount = useMemo(() => Math.min(...tags.map(tag => tag.count)), [tags])

  const getFontSize = useCallback(
    (count: number) => {
      if (maxCount === minCount) return 1
      const size = 0.8 + ((count - minCount) / (maxCount - minCount)) * 1.2
      return size
    },
    [maxCount, minCount]
  )

  // const getColor = useCallback((count: number) => {
  //   if (maxCount === minCount) return 60;
  //   const hue = 200 + ((count - minCount) / (maxCount - minCount)) * 60;
  //   return hue;
  // }, [maxCount, minCount]);

  return (
    <div className="flex flex-wrap gap-6 justify-center items-center min-h-[120px]">
      {tags.map(({ name, count }) => (
        <Link
          key={name}
          href={`/tags/${name}`}
          className="text-gray-600 dark:text-gray-400 transition-all duration-200 hover:-translate-y-1 hover:text-primary dark:hover:text-primary"
          style={{
            fontSize: `${getFontSize(count)}rem`,
            opacity: getFontSize(count) * 0.7 + 0.3, // 根据大小调整透明度
          }}
        >
          <span className="relative group font-medium">
            #{name}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              {count} 篇文章
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}
