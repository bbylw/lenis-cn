import { useEffect, useState } from 'react'
import { CodeBlock } from '@/components/code-block'
import { Panel, PanelBody } from '@/components/panel'
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal'
import { Switch } from '@/components/ui/switch'
import {
  ANCHOR_ENABLE_SNIPPET,
  ANCHOR_OPTIONS_SNIPPET,
  NESTED_ALLOW_SNIPPET,
  NESTED_PREVENT_SNIPPET,
  PREVENT_ATTRIBUTES,
  REDUCED_MOTION_SNIPPET,
} from '@/lib/content'
import { cn } from '@/lib/utils'

const NESTED_ROWS = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  title: ['弹窗内容', '侧边栏', '代码区', '长列表', '评论区', '内层面板'][index % 6],
}))

function NestedScrollDemo() {
  const [prevent, setPrevent] = useState(true)

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[12px] text-foreground">data-lenis-prevent</span>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'font-mono text-[11px]',
              prevent ? 'text-brand' : 'text-muted-foreground',
            )}
          >
            {prevent ? 'on' : 'off'}
          </span>
          <Switch
            checked={prevent}
            onCheckedChange={setPrevent}
            aria-label="切换 data-lenis-prevent"
            className="data-checked:bg-brand"
          />
        </div>
      </div>

      <div
        {...(prevent ? { 'data-lenis-prevent': '' } : {})}
        className="code-scroll mt-3 h-52 overflow-y-auto rounded-lg border border-border bg-surface-sunken p-3"
      >
        <ul className="grid gap-1.5">
          {NESTED_ROWS.map((row) => (
            <li
              key={row.id}
              className="flex items-center gap-3 rounded-md border border-border/70 bg-card px-3 py-2"
            >
              <span className="font-mono text-[11px] text-brand">
                {String(row.id).padStart(2, '0')}
              </span>
              <span className="text-[13px] text-muted-foreground">{row.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
        把鼠标放在这个框上滚动。开关打开时它自己滚，页面纹丝不动；关掉后滚轮会被外层实例接管，页面跟着一起动。
      </p>
    </div>
  )
}

function ReducedMotionStatus() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-sunken px-3 py-2.5">
      <span className="text-[13px] text-muted-foreground">当前系统偏好</span>
      <span
        className={cn(
          'rounded-md border px-2 py-0.5 font-mono text-[11px]',
          reduced
            ? 'border-brand-line bg-brand-soft text-brand'
            : 'border-border text-muted-foreground',
        )}
      >
        {reduced ? 'reduce' : 'no-preference'}
      </span>
    </div>
  )
}

export function Notes() {
  return (
    <section id="notes" className="scroll-mt-24 border-y border-border bg-surface-sunken/60 py-20 lg:py-28">
      <div className="mx-auto max-w-300 px-5">
        <Reveal className="max-w-[62ch]">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            几个绕不开的坑，先说清楚。
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            嵌套滚动、锚点跳转、减弱动效，这三件事几乎每个接入的人都会撞上。
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <Panel className="p-5 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <div>
                <h3 className="text-[15px] font-semibold">嵌套滚动</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  处理嵌套可滚动元素最简单的方式是 allowNestedScroll，想更省性能就用 HTML 属性。
                </p>
                <div className="mt-4">
                  <NestedScrollDemo />
                </div>
              </div>

              <div className="grid content-start gap-4">
                <ul className="grid gap-2">
                  {PREVENT_ATTRIBUTES.map((row) => (
                    <li key={row.attr} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <code className="font-mono text-[12.5px] text-brand">{row.attr}</code>
                      <span className="text-[12.5px] text-muted-foreground">{row.description}</span>
                    </li>
                  ))}
                </ul>
                <CodeBlock code={NESTED_PREVENT_SNIPPET} lang="html" label="嵌套元素" />
                <CodeBlock code={NESTED_ALLOW_SNIPPET} lang="javascript" label="全局开启" />
              </div>
            </div>
          </Panel>
        </Reveal>

        <RevealGroup step={0.07} className="mt-5 grid gap-5 lg:grid-cols-2">
          <RevealItem>
            <PanelBody
              title="锚点链接"
              description="默认情况下 Lenis 会在滚动过程中阻止锚点链接生效，必须显式开启 anchors。"
              className="h-full"
            >
              <div className="grid gap-3">
                <CodeBlock code={ANCHOR_ENABLE_SNIPPET} lang="javascript" label="启用" />
                <CodeBlock code={ANCHOR_OPTIONS_SNIPPET} lang="javascript" label="带选项" />
              </div>
            </PanelBody>
          </RevealItem>

          <RevealItem>
            <PanelBody
              title="减弱动效"
              description="当系统偏好为 reduce 时，平滑效果被禁用、程序化滚动即时到位，但实例仍在运行，WebGL 与 DOM 的同步不受影响。偏好会实时感知，无需刷新页面。"
              className="h-full"
            >
              <CodeBlock code={REDUCED_MOTION_SNIPPET} lang="javascript" label="偏好设置" />
              <ReducedMotionStatus />
            </PanelBody>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
