# 个人博客

基于 Next.js 14 和 Tailwind CSS 构建的个人博客网站。

## 功能特点

- **文章管理**

  - MDX 支持，可以在文章中使用 React 组件
  - 文章分类和标签系统
  - 按时间排序的文章列表

- **界面设计**

  - 响应式布局，支持移动端和桌面端
  - 明暗主题切换
  - 优雅的过渡动画

- **内容组织**
  - 首页展示最新文章和分类
  - 文章分类浏览
  - 标签云导航

## 页面结构

- `/` - 首页，展示个人简介和最新文章
- `/posts` - 文章列表页
- `/posts/[slug]` - 文章详情页
- `/categories` - 分类页面
- `/categories/[category]` - 分类详情页，展示该分类下的所有文章
- `/tags` - 标签页面
- `/tags/[tag]` - 标签详情页，展示包含该标签的所有文章

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- MDX
- date-fns

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署

项目使用 Next.js，可以轻松部署到 Vercel 等平台。
