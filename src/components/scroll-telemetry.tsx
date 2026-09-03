import { useRef } from 'react'
import { useLenis } from 'lenis/react'
import type Lenis from 'lenis'
import { Pulse } from '@phosphor-icons/react'

const ROWS = [
  { key: 'scroll', label: 'scroll' },
  { key: 'targetScroll', label: 'targetScroll' },
  { key: 'velocity', label: 'velocity' },
  { key: 'progress', label: 'progress' },
  { key: 'direction', label: 'direction' },
  { key: 'limit', label: 'limit' },
] as const

type RowKey = (typeof ROWS)[number]['key']

function readRow(lenis: Lenis, key: RowKey): string {
  switch (key) {
    case 'scroll':
      return `${Math.round(lenis.scroll)}`
    case 'targetScroll':
      return `${Math.round(lenis.targetScroll)}`
    case 'velocity':
      return lenis.velocity.toFixed(2)
    case 'progress':
      return lenis.progress.toFixed(3)
    case 'direction':
      return lenis.direction === 0 ? '静止' : lenis.direction === 1 ? '向上' : '向下'
    case 'limit':
      return `${Math.round(lenis.limit)}`
  }
}

/**
 * 直接读 Lenis 实例并通过 ref 写 DOM。
 * 每帧都在变的连续值绝不放进 React state，否则整棵树会跟着重渲染。
 */
export function ScrollTelemetry() {
  const valueRefs = useRef<Partial<Record<RowKey, HTMLSpanElement | null>>>({})
  const barRef = useRef<HTMLSpanElement>(null)
  const stateRef = useRef<HTMLSpanElement>(null)
  const reducedRef = useRef<HTMLSpanElement>(null)
  const lastState = useRef('')

  useLenis((lenis) => {
    for (const row of ROWS) {
      const node = valueRefs.current[row.key]
      if (!node) continue
      const next = readRow(lenis, row.key)
      if (node.textContent !== next) node.textContent = next
    }

    const bar = barRef.current
    if (bar) {
      const ratio = Math.min(Math.abs(lenis.velocity) / 55, 1)
      const width = `${(ratio * 50).toFixed(2)}%`
      bar.style.width = width
      bar.style.left = lenis.velocity >= 0 ? '50%' : `${(50 - ratio * 50).toFixed(2)}%`
    }

    const state = stateRef.current
    if (state) {
      const raw = lenis.isScrolling === false ? '待命' : String(lenis.isScrolling)
      if (lastState.current !== raw) {
        lastState.current = raw
        state.textContent = raw
        state.dataset.active = lenis.isScrolling === false ? 'false' : 'true'
      }
    }

    const reduced = reducedRef.current
    if (reduced) {
      const text = String(lenis.prefersReducedMotion)
      if (reduced.textContent !== text) reduced.textContent = text
    }
  })

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface-raised">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <span className="inline-flex items-center gap-2 text-[13px] font-medium">
          <Pulse size={15} weight="regular" className="text-brand" />
          实时实例状态
        </span>
        <span
          ref={stateRef}
          data-active="false"
          className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground data-[active=true]:border-brand-line data-[active=true]:bg-brand-soft data-[active=true]:text-brand"
        >
          待命
        </span>
      </div>

      <dl className="divide-y divide-border/60">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
            <dt className="font-mono text-[12px] text-muted-foreground">{row.label}</dt>
            <dd
              ref={(node) => {
                valueRefs.current[row.key] = node
              }}
              className="font-mono text-[13px] tabular-nums text-foreground"
            >
              0
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-border px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            velocity
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">-55 / +55</span>
        </div>
        <div className="relative h-1.5 overflow-hidden rounded-full bg-surface-sunken">
          <span className="absolute inset-y-0 left-1/2 w-px bg-border" />
          <span
            ref={barRef}
            className="absolute inset-y-0 rounded-full bg-brand"
            style={{ left: '50%', width: '0%' }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-surface-sunken px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">prefersReducedMotion</span>
        <span ref={reducedRef} className="font-mono text-[11px] text-foreground">
          false
        </span>
      </div>
    </div>
  )
}
