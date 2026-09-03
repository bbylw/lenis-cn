import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'
import type { LenisOptions } from 'lenis'

export type FeelMode = 'lerp' | 'duration'

export type SmoothState = {
  /** lerp 与 duration 互斥：定义了 lerp 则 duration 失效 */
  mode: FeelMode
  lerp: number
  duration: number
  wheelMultiplier: number
  touchMultiplier: number
  smoothWheel: boolean
  syncTouch: boolean
  respectReducedMotion: boolean
  stopInertiaOnNavigate: boolean
}

export const DEFAULT_SMOOTH: SmoothState = {
  mode: 'lerp',
  lerp: 0.1,
  duration: 1.2,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  smoothWheel: true,
  syncTouch: false,
  respectReducedMotion: true,
  stopInertiaOnNavigate: true,
}

/** 顶部导航高度 64px，锚点滚动时再留出一点呼吸 */
const ANCHOR_OFFSET = -80

export function toLenisOptions(state: SmoothState): LenisOptions {
  return {
    autoRaf: true,
    anchors: { offset: ANCHOR_OFFSET },
    ...(state.mode === 'lerp' ? { lerp: state.lerp } : { duration: state.duration }),
    wheelMultiplier: state.wheelMultiplier,
    touchMultiplier: state.touchMultiplier,
    smoothWheel: state.smoothWheel,
    syncTouch: state.syncTouch,
    respectReducedMotion: state.respectReducedMotion,
    stopInertiaOnNavigate: state.stopInertiaOnNavigate,
  }
}

export function toCode(state: SmoothState) {
  return [
    "import Lenis from 'lenis'",
    '',
    'const lenis = new Lenis({',
    '  autoRaf: true,',
    `  anchors: { offset: ${ANCHOR_OFFSET} },`,
    state.mode === 'lerp' ? `  lerp: ${state.lerp},` : `  duration: ${state.duration},`,
    `  wheelMultiplier: ${state.wheelMultiplier},`,
    `  touchMultiplier: ${state.touchMultiplier},`,
    `  smoothWheel: ${state.smoothWheel},`,
    `  syncTouch: ${state.syncTouch},`,
    `  respectReducedMotion: ${state.respectReducedMotion},`,
    `  stopInertiaOnNavigate: ${state.stopInertiaOnNavigate},`,
    '})',
  ].join('\n')
}

export type SmoothPreset = { id: string; label: string; note: string; patch: Partial<SmoothState> }

export const PRESETS: SmoothPreset[] = [
  {
    id: 'default',
    label: '默认',
    note: '官方出厂手感',
    patch: { mode: 'lerp', lerp: 0.1, wheelMultiplier: 1, smoothWheel: true },
  },
  {
    id: 'crisp',
    label: '灵敏',
    note: '更快跟上滚轮',
    patch: { mode: 'lerp', lerp: 0.28, wheelMultiplier: 1.15, smoothWheel: true },
  },
  {
    id: 'cinema',
    label: '电影感',
    note: '按固定时长缓动',
    patch: { mode: 'duration', duration: 1.8, wheelMultiplier: 1.6, smoothWheel: true },
  },
  {
    id: 'native',
    label: '接近原生',
    note: '关掉滚轮平滑',
    patch: { mode: 'lerp', lerp: 0.1, wheelMultiplier: 1, smoothWheel: false },
  },
]

type SmoothContextValue = {
  state: SmoothState
  patch: (next: Partial<SmoothState>) => void
  reset: () => void
  isDefault: boolean
}

const SmoothContext = createContext<SmoothContextValue | null>(null)

export function useSmoothOptions() {
  const ctx = useContext(SmoothContext)
  if (!ctx) throw new Error('useSmoothOptions 必须在 SmoothProvider 内部使用')
  return ctx
}

function parseUrlState(): SmoothState {
  if (typeof window === 'undefined') return DEFAULT_SMOOTH
  try {
    const params = new URLSearchParams(window.location.search)
    if (!params.has('mode') && !params.has('lerp') && !params.has('duration')) {
      return DEFAULT_SMOOTH
    }
    const next = { ...DEFAULT_SMOOTH }
    const mode = params.get('mode')
    if (mode === 'lerp' || mode === 'duration') next.mode = mode
    const lerp = parseFloat(params.get('lerp') ?? '')
    if (!isNaN(lerp) && lerp >= 0.01 && lerp <= 1) next.lerp = lerp
    const duration = parseFloat(params.get('duration') ?? '')
    if (!isNaN(duration) && duration >= 0.1 && duration <= 5) next.duration = duration
    const wheel = parseFloat(params.get('wheelMultiplier') ?? params.get('wheel') ?? '')
    if (!isNaN(wheel) && wheel >= 0.1 && wheel <= 5) next.wheelMultiplier = wheel
    const touch = parseFloat(params.get('touchMultiplier') ?? params.get('touch') ?? '')
    if (!isNaN(touch) && touch >= 0.1 && touch <= 5) next.touchMultiplier = touch
    if (params.has('smoothWheel')) next.smoothWheel = params.get('smoothWheel') !== 'false'
    if (params.has('syncTouch')) next.syncTouch = params.get('syncTouch') === 'true'
    return next
  } catch {
    return DEFAULT_SMOOTH
  }
}

export function toShareUrl(state: SmoothState): string {
  if (typeof window === 'undefined') return ''
  const url = new URL(window.location.href)
  url.searchParams.set('mode', state.mode)
  if (state.mode === 'lerp') {
    url.searchParams.set('lerp', String(Number(state.lerp.toFixed(2))))
    url.searchParams.delete('duration')
  } else {
    url.searchParams.set('duration', String(Number(state.duration.toFixed(2))))
    url.searchParams.delete('lerp')
  }
  url.searchParams.set('wheel', String(Number(state.wheelMultiplier.toFixed(2))))
  if (state.touchMultiplier !== 1) {
    url.searchParams.set('touch', String(Number(state.touchMultiplier.toFixed(2))))
  } else {
    url.searchParams.delete('touch')
  }
  if (!state.smoothWheel) {
    url.searchParams.set('smoothWheel', 'false')
  } else {
    url.searchParams.delete('smoothWheel')
  }
  if (state.syncTouch) {
    url.searchParams.set('syncTouch', 'true')
  } else {
    url.searchParams.delete('syncTouch')
  }
  url.hash = 'playground'
  return url.toString()
}

export function SmoothProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SmoothState>(() => parseUrlState())

  const patch = useCallback((next: Partial<SmoothState>) => {
    setState((prev) => ({ ...prev, ...next }))
  }, [])

  const reset = useCallback(() => {
    setState(DEFAULT_SMOOTH)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.search = ''
      window.history.replaceState({}, '', url.toString())
    }
  }, [])

  const value = useMemo<SmoothContextValue>(
    () => ({
      state,
      patch,
      reset,
      isDefault: JSON.stringify(state) === JSON.stringify(DEFAULT_SMOOTH),
    }),
    [state, patch, reset],
  )

  const options = useMemo(() => toLenisOptions(state), [state])

  return (
    <SmoothContext.Provider value={value}>
      {/*
        ReactLenis 会在 options 的 JSON 签名变化时重建实例，
        因此调参后立刻就能在整站感受到新的手感。
      */}
      <ReactLenis root options={options}>
        {children}
      </ReactLenis>
    </SmoothContext.Provider>
  )
}
