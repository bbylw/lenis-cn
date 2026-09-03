import { siFramer, siGithub, siNpm, siReact, siVuedotjs, type SimpleIcon } from 'simple-icons'

const ICONS = {
  react: siReact,
  vue: siVuedotjs,
  framer: siFramer,
  github: siGithub,
  npm: siNpm,
} satisfies Record<string, SimpleIcon>

export type BrandName = keyof typeof ICONS

/** 品牌图标统一走 simple-icons 官方数据，颜色继承 currentColor，亮暗模式自动适配 */
export function BrandIcon({ name, className }: { name: BrandName; className?: string }) {
  const icon = ICONS[name]

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  )
}
