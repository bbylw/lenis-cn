import { useCallback, useEffect, useState } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'

const STORAGE_KEY = 'lenis-cn-theme'
export type ThemeName = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>('dark')

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')

    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      // 用户没有手动选过时，跟随系统
      if (localStorage.getItem(STORAGE_KEY)) return
      const next: ThemeName = event.matches ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', next === 'dark')
      setTheme(next)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    const next: ThemeName = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // 隐私模式下写不进去，不影响本次会话
    }
  }, [theme])

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
      className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:translate-y-px"
    >
      {theme === 'dark' ? <Moon size={17} weight="regular" /> : <Sun size={17} weight="regular" />}
    </button>
  )
}
