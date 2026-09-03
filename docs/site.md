# Lenis 中文站

基于 [Lenis](https://github.com/darkroomengineering/lenis) 官方 README 整理的中文落地页与参考手册。非官方站点，内容以原仓库为准。

原始中文文档在仓库根目录的 [`README.md`](../README.md)，站点所有文案均从该文件整理而来。

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 运行时 / 包管理 | Bun 1.4 |
| 框架 | React 19 + TypeScript 7 |
| 构建 | Vite 8 |
| 样式 | Tailwind CSS 4（CSS-first，令牌集中在 `src/index.css`） |
| 组件库 | shadcn/ui（`base-nova` 风格，底层 @base-ui/react） |
| 平滑滚动 | lenis 1.3 + `lenis/react` |
| 入场动画 | motion |
| 图标 | @phosphor-icons/react（UI 图标）、simple-icons（品牌图标） |
| 代码高亮 | shiki 4（细粒度懒加载，亮暗双主题一次产出） |

## 常用命令

```bash
bun install          # 安装依赖
bun run dev          # 开发服务器
bun run build        # 类型检查 + 生产构建，输出到 dist/
bun run preview      # 本地预览构建产物
bun run images       # 重新生成 public/images/optimized 下的 webp / jpg
```

## 项目结构

```
src/
  components/
    smooth-provider.tsx    # 整页 Lenis 实例 + 调参状态，唯一数据源
    site-nav.tsx           # 顶部导航：进度条 + 当前区块高亮
    scroll-telemetry.tsx   # 首屏实时实例状态面板
    playground.tsx         # 手感调参台，改动直接作用于整页
    code-block.tsx         # 代码块：进视口才加载 shiki
    ...
  lib/
    content.ts             # 全站文案与数据（配置项 / API / 局限性等）
    highlighter.ts         # shiki 细粒度懒加载高亮器
  index.css                # 设计令牌（冷灰中性色 + 单一朱红强调色）
scripts/
  optimize-images.mjs      # sharp 图片压缩
```

## 约定

- **平滑滚动归 Lenis 管**：`html` 上的 `scroll-behavior` 已关闭，避免双重插值。
- **连续值不进 React state**：进度、velocity 等每帧变化的量通过 ref 直接写 DOM。
- **配置项即时生效**：`ReactLenis` 会在 options 的 JSON 签名变化时重建实例，调参台因此能立刻反映到整页。
- **圆角只有一套**：容器 12px、控件 8px、头像与徽标全圆。
- **主题**：`dark` 类挂在 `html` 上，首帧前由 `index.html` 内联脚本锁定，避免闪烁；用户选择持久化在 `localStorage`。
- **SEO 与兜底件放 `public/`**：`robots.txt`、`sitemap.xml`（单页站只列根 URL，锚点不进 `<loc>`）、`404.html`（自包含内联设计令牌的品牌页，Tailwind 不扫描 `public/`，故不依赖构建产物）会随构建原样复制进 `dist/`，GitHub Pages 用 `404.html` 兜底所有错误路径并返回正确的 404 状态码。
