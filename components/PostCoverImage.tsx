'use client'

import { useState } from 'react'
import OptimizedImage from './OptimizedImage'

interface PostCoverImageProps {
  src?: string
  alt: string
  priority?: boolean
  className?: string
  fill?: boolean
}

export default function PostCoverImage({ src, alt, fill, ...props }: PostCoverImageProps) {
  const [error, setError] = useState(false)
  const defaultImage = '/images/default-cover.jpg'

  const handleError = () => {
    console.log('Image load error:', { src, defaultImage })
    setError(true)
  }

  const imageSrc = error ? defaultImage : src || defaultImage
  console.log('Using image src:', imageSrc)

  return (
    <OptimizedImage
      src={imageSrc}
      alt={alt}
      onError={handleError}
      fill={fill}
      {...(!fill && {
        width: 1200,
        height: 675,
      })}
      {...props}
    />
  )
}
