import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Copy, Warning } from '@phosphor-icons/react'
import { highlight, type CodeLang } from '@/lib/highlighter'
import { cn } from '@/lib/utils'

type CopyState = 'idle' | 'done' | 'error'

type CodeBlockProps = {
  code: string
  lang: CodeLang
  label?: string
  className?: string
  /** 超过该行数后内部纵向滚动，避免长代码把页面撑开 */
  maxLines?: number
}

export function CodeBlock({ code, lang, label, className, maxLines = 22 }: CodeBlockProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [html, setHtml] = useState<string | null>(null)
  const [copyState, setCopyState] = useState<CopyState>('idle')

  useEffect(() => {
    const node = hostRef.current
    if (!node) return

    let cancelled = false

    const run = async () => {
      try {
        const result = await highlight(code, lang)
        if (!cancelled) setHtml(result)
      } catch {
        // 高亮失败时保留纯文本，不让代码块变成空白
      }
    }

    // 只有进入视口才去拉 shiki，首屏不必为高亮器付费
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          void run()
        }
      },
      { rootMargin: '240px' },
    )
    observer.observe(node)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [code, lang])

  useEffect(() => {
    if (copyState === 'idle') return
    const timer = window.setTimeout(() => setCopyState('idle'), 1800)
    return () => window.clearTimeout(timer)
  }, [copyState])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopyState('done')
    } catch {
      setCopyState('error')
    }
  }, [code])

  const lineCount = code.split('\n').length
  const clamped = lineCount > maxLines

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border bg-code-bg',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {label ?? lang}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copyState === 'error' ? '复制失败，请重试' : '复制代码'}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:translate-y-px"
        >
          {copyState === 'done' ? (
            <>
              <Check size={13} weight="bold" />
              已复制
            </>
          ) : copyState === 'error' ? (
            <>
              <Warning size={13} weight="bold" />
              复制失败
            </>
          ) : (
            <>
              <Copy size={13} />
              复制
            </>
          )}
        </button>
      </div>

      <div
        ref={hostRef}
        className={cn(
          'code-scroll overflow-x-auto px-4 py-3.5',
          clamped && 'overflow-y-auto',
        )}
        style={clamped ? { maxHeight: `${maxLines * 1.55}rem` } : undefined}
      >
        {html ? (
          <div
            className="font-mono text-[13px] leading-[1.55] [&_pre]:bg-transparent"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="font-mono text-[13px] leading-[1.55] text-foreground/85">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
