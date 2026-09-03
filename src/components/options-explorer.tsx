import { useMemo, useState } from 'react'
import { Check, Copy, LinkSimple, MagnifyingGlass, Warning, X } from '@phosphor-icons/react'
import { Panel } from '@/components/panel'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OPTION_CATEGORIES, OPTIONS, type OptionCategory } from '@/lib/content'
import { cn } from '@/lib/utils'

type Filter = OptionCategory | 'all'

function HighlightText({ text, query }: { text: string; query: string }) {
  const keyword = query.trim()
  if (!keyword) return <>{text}</>
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <mark key={i} className="rounded bg-brand-soft px-0.5 font-medium text-brand">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function OptionsExplorer() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return OPTIONS.filter((option) => {
      if (filter !== 'all' && option.category !== filter) return false
      if (!keyword) return true
      return (
        option.name.toLowerCase().includes(keyword) ||
        option.type.toLowerCase().includes(keyword) ||
        option.description.toLowerCase().includes(keyword)
      )
    })
  }, [query, filter])

  const dirty = query !== '' || filter !== 'all'

  const copyOption = async (name: string, defaultValue: string) => {
    const snippet = `${name}: ${defaultValue},`
    try {
      await navigator.clipboard.writeText(snippet)
      setCopiedKey(name)
      setTimeout(() => setCopiedKey(null), 1800)
    } catch {
      // 剪贴板不可用时降级
    }
  }

  const copyAnchor = async (name: string) => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.hash = `option-${name}`
    try {
      await navigator.clipboard.writeText(url.toString())
      window.history.replaceState({}, '', url.toString())
      setCopiedKey(`anchor-${name}`)
      setTimeout(() => setCopiedKey(null), 1800)
    } catch {
      // 剪贴板不可用时降级
    }
  }

  return (
    <section id="options" className="scroll-mt-24 border-y border-border bg-surface-sunken/60 py-20 lg:py-28">
      <div className="mx-auto max-w-300 px-5">
        <Reveal className="max-w-[62ch]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">配置项</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            26 个选项，按需挑。
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            初始化时传进去即可。带标记的选项有性能或兼容性代价，用之前先读一眼说明。
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <MagnifyingGlass
                size={15}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />
              <label htmlFor="option-search" className="sr-only">
                搜索配置项
              </label>
              <Input
                id="option-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索名称、类型或说明"
                className="h-10 rounded-lg pl-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {OPTION_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(category.id)}
                  aria-pressed={filter === category.id}
                  className={cn(
                    'rounded-lg border px-3 py-1.5 text-[13px] transition-colors active:translate-y-px',
                    filter === category.id
                      ? 'border-brand-line bg-brand-soft text-brand'
                      : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 font-mono text-[12px] text-muted-foreground">
            {results.length} / {OPTIONS.length} 个选项
            {dirty ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setFilter('all')
                }}
                className="ml-3 inline-flex items-center gap-1 text-brand hover:underline"
              >
                <X size={11} />
                清除筛选
              </button>
            ) : null}
          </p>
        </Reveal>

        {results.length === 0 ? (
          <Panel className="mt-6 flex flex-col items-center gap-3 px-6 py-14 text-center">
            <span className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface-raised text-muted-foreground">
              <MagnifyingGlass size={19} />
            </span>
            <p className="text-[15px] font-medium">没有匹配的配置项</p>
            <p className="max-w-[42ch] text-[13px] text-muted-foreground">
              换个关键词，或者把分类切回全部。Lenis 的选项名基本都是直给的，试试 lerp、touch 或 wrapper。
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1"
              onClick={() => {
                setQuery('')
                setFilter('all')
              }}
            >
              清除筛选
            </Button>
          </Panel>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((option) => {
              const isCopiedSnippet = copiedKey === option.name
              const isCopiedAnchor = copiedKey === `anchor-${option.name}`

              return (
                <Reveal key={option.name} className="h-full" amount={0.1}>
                  <Panel id={`option-${option.name}`} className="group relative h-full scroll-mt-24 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <code className="font-mono text-[13.5px] font-medium text-brand">
                          <HighlightText text={option.name} query={query} />
                        </code>
                        <button
                          type="button"
                          onClick={() => copyAnchor(option.name)}
                          title="复制并跳转此选项锚点"
                          aria-label={`复制 ${option.name} 选项锚点`}
                          className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-brand"
                        >
                          {isCopiedAnchor ? (
                            <Check size={12} weight="bold" className="text-brand" />
                          ) : (
                            <LinkSimple size={12} className="text-muted-foreground" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {option.warn ? (
                          <span
                            title="该选项有性能或兼容性代价"
                            className="inline-flex shrink-0 items-center gap-1 rounded-md border border-brand-line bg-brand-soft px-1.5 py-0.5 font-mono text-[10px] text-brand"
                          >
                            <Warning size={10} weight="bold" />
                            注意
                          </span>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => copyOption(option.name, option.default)}
                          title="复制配置片段"
                          aria-label={`复制 ${option.name} 配置代码`}
                          className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-surface-raised px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-brand-line hover:text-foreground active:translate-y-px"
                        >
                          {isCopiedSnippet ? (
                            <>
                              <Check size={11} weight="bold" className="text-brand" />
                              <span className="text-[10px] text-brand">已复制</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span className="text-[10px]">复制</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <dl className="mt-3 grid gap-1.5">
                      <div className="flex gap-2 text-[12px]">
                        <dt className="w-14 shrink-0 font-mono text-muted-foreground">类型</dt>
                        <dd className="min-w-0 font-mono wrap-break-word text-foreground/85">
                          <HighlightText text={option.type} query={query} />
                        </dd>
                      </div>
                      <div className="flex gap-2 text-[12px]">
                        <dt className="w-14 shrink-0 font-mono text-muted-foreground">默认</dt>
                        <dd className="min-w-0 font-mono wrap-break-word text-foreground/85">
                          {option.default}
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                      <HighlightText text={option.description} query={query} />
                    </p>
                  </Panel>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
