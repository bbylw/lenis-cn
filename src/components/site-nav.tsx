import { useCallback, useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import { BrandIcon } from '@/components/brand-icon'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#features', label: '特性' },
  { href: '#playground', label: '手感' },
  { href: '#install', label: '安装' },
  { href: '#options', label: '配置项' },
  { href: '#api', label: 'API' },
  { href: '#notes', label: '注意' },
  { href: '#resources', label: '资源' },
]

const NAV_HEIGHT = 64

type SectionOffset = { id: string; top: number }

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const offsetsRef = useRef<SectionOffset[]>([])
  const activeIdRef = useRef('')

  // 监听 Escape 键与点击外部收起移动端菜单
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  // 导航投影：用 Motion 的 scroll 进度驱动，不挂 scroll 监听
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 12)
  })

  // 各区块的文档坐标缓存：只在内容尺寸变化时重新量取，滚动时零布局读取
  const measure = useCallback(() => {
    const scrollYNow = window.scrollY
    offsetsRef.current = LINKS.flatMap((link) => {
      const el = document.querySelector<HTMLElement>(link.href)
      if (!el) return []
      return [{ id: link.href.slice(1), top: el.getBoundingClientRect().top + scrollYNow }]
    })
  }, [])

  useEffect(() => {
    measure()
    const observer = new ResizeObserver(() => measure())
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [measure])

  // 页面进度与当前区块：直接读 Lenis 实例写入 DOM / 局部状态，不触发整树重渲染
  useLenis((lenis) => {
    const node = progressRef.current
    if (node) node.style.transform = `scaleX(${lenis.progress || 0})`

    const probe = lenis.scroll + NAV_HEIGHT + 8
    let next = ''
    for (const section of offsetsRef.current) {
      if (probe >= section.top) next = section.id
    }
    if (next !== activeIdRef.current) {
      activeIdRef.current = next
      setActive(next)
    }
  })

  return (
    <>
      <a
        href="#features"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-medium focus:text-brand-foreground focus:shadow-lg focus:outline-hidden"
      >
        跳至主要内容
      </a>
      <header
        ref={navRef}
        data-active={active}
        className={cn(
          'sticky top-0 z-40 h-16 transition-colors duration-300',
          scrolled
            ? 'border-b border-border bg-background/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
      <div className="mx-auto flex h-16 max-w-300 items-center gap-6 px-5">
        <a href="#top" className="flex shrink-0 items-center gap-2">
          <span className="text-[17px] font-semibold tracking-tight">Lenis</span>
          <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            中文
          </span>
        </a>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const id = link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-2.5 py-1.5 text-[13px] transition-colors',
                  active === id
                    ? 'text-brand'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <ThemeToggle />
          <a
            href="https://github.com/darkroomengineering/lenis"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="在 GitHub 上查看 Lenis"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:translate-y-px"
          >
            <BrandIcon name="github" className="size-4.25" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            {menuOpen ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {/* 移动端菜单：直接内联展开，不引入额外的浮层依赖 */}
      {menuOpen ? (
        <div id="mobile-nav-menu" className="border-b border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto grid max-w-300 gap-1 px-5 py-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}

      <span
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand"
        style={{ transform: 'scaleX(0)' }}
      />
    </header>
    </>
  )
}
