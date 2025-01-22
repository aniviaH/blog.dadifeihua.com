import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

export function createMetadata({
  title = '个人博客',
  description = '记录个人的思考、灵感和想法的空间',
  image = '/og-image.png',
  path = '',
  type = 'website',
  publishedTime,
  author = '刘欢',
}: GenerateMetadataProps): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    title: title + ' | 个人博客',
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: '个人博客',
      locale: 'zh_CN',
      type,
      ...(type === 'article' && {
        article: {
          publishedTime,
          authors: [author],
        },
      }),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
