'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  toc: TocItem[];
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 1.0,
      }
    );

    const headings = document.querySelectorAll('h1, h2, h3, h4');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // 考虑固定导航栏的高度
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="space-y-2">
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={`
            block text-sm transition-all duration-200
            ${item.level === 1 ? 'font-semibold' : 'font-normal'}
            ${
              activeId === item.id
                ? 'text-blue-600 dark:text-blue-400'
                : item.level === 2
                ? 'text-gray-800 dark:text-gray-200'
                : 'text-gray-600 dark:text-gray-400'
            }
            hover:text-blue-600 dark:hover:text-blue-400
          `}
          style={{
            paddingLeft: `${(item.level - 1) * 1}rem`,
            transform: `translateX(${activeId === item.id ? '4px' : '0'})`,
          }}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
