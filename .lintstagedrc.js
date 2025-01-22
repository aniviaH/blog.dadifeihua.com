module.exports = {
  // 对 TypeScript 和 JavaScript 文件运行类型检查和 lint
  '**/*.{ts,tsx,js,jsx}': ['prettier --write', 'eslint --fix'],
  // 对其他文件运行 prettier
  '**/*.{css,json,md,mdx}': ['prettier --write'],
}
