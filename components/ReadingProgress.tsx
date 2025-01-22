'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const articleBox = article.getBoundingClientRect();
      const totalHeight = articleBox.height;
      const windowHeight = window.innerHeight;
      const current = window.scrollY + windowHeight - articleBox.top;
      
      // 计算阅读进度
      const percent = Math.min(100, Math.max(0, (current / totalHeight) * 100));
      setProgress(percent);

      // 控制进度条显示/隐藏
      const currentScrollY = window.scrollY;
      
      // 只有当滚动位置超过一定值（例如100px）时才显示进度条
      if (currentScrollY > 100) {
        setIsVisible(true);
        // 如果向下滚动，显示进度条
        if (currentScrollY > lastScrollY) {
          setIsVisible(true);
        }
      } else {
        // 回到顶部时隐藏进度条
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // 初始化

    return () => window.removeEventListener('scroll', updateProgress);
  }, [lastScrollY]);

  return (
    <div 
      className={`
        fixed top-16 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 z-50
        transition-opacity duration-300 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div
        className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
