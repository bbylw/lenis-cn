import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { ArrowUp } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const onScroll = () => {
      setVisible(lenis.scroll > 420)
    }
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenis])

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="平滑滚动回到顶部"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        'group fixed right-5 bottom-5 z-40 flex items-center gap-1.5 rounded-lg border border-border bg-card/85 px-3 py-2 text-xs font-medium text-muted-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:border-brand-line hover:bg-brand-soft hover:text-brand active:translate-y-px sm:right-7 sm:bottom-7',
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-3 opacity-0 pointer-events-none',
      )}
    >
      <ArrowUp size={14} weight="bold" className="transition-transform group-hover:-translate-y-0.5" />
      <span>回到顶部</span>
    </button>
  )
}
