import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { ArrowCounterClockwise, ArrowDown, ArrowUp, Check, LinkSimple } from '@phosphor-icons/react'
import { CodeBlock } from '@/components/code-block'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { PRESETS, toCode, toShareUrl, useSmoothOptions, type SmoothState } from '@/components/smooth-provider'
import { cn } from '@/lib/utils'

const toScalar = (value: number | readonly number[]) => (Array.isArray(value) ? value[0] : value)

type SliderKey = 'lerp' | 'duration' | 'wheelMultiplier' | 'touchMultiplier'

const SLIDERS: {
  key: SliderKey
  label: string
  min: number
  max: number
  step: number
  hint: string
  activeIn: (state: SmoothState) => boolean
}[] = [
  {
    key: 'lerp',
    label: 'lerp',
    min: 0.02,
    max: 1,
    step: 0.01,
    hint: '线性插值强度。数值越小，尾巴拖得越长。',
    activeIn: (state) => state.mode === 'lerp',
  },
  {
    key: 'duration',
    label: 'duration',
    min: 0.2,
    max: 3,
    step: 0.1,
    hint: '滚动动画时长，单位为秒。',
    activeIn: (state) => state.mode === 'duration',
  },
  {
    key: 'wheelMultiplier',
    label: 'wheelMultiplier',
    min: 0.2,
    max: 3,
    step: 0.1,
    hint: '滚轮行程倍率，调大等于一次滚更远。',
    activeIn: () => true,
  },
  {
    key: 'touchMultiplier',
    label: 'touchMultiplier',
    min: 0.2,
    max: 3,
    step: 0.1,
    hint: '触摸行程倍率，只影响触屏设备。',
    activeIn: () => true,
  },
]

const TOGGLES: {
  key: 'smoothWheel' | 'syncTouch' | 'respectReducedMotion' | 'stopInertiaOnNavigate'
  label: string
  hint: string
}[] = [
  { key: 'smoothWheel', label: 'smoothWheel', hint: '关掉后滚轮走原生滚动，只剩程序化滚动被平滑。' },
  { key: 'syncTouch', label: 'syncTouch', hint: '在触屏上模拟平滑滚动，iOS 16 以下可能不稳。' },
  {
    key: 'respectReducedMotion',
    label: 'respectReducedMotion',
    hint: '尊重系统减弱动效偏好，开启后平滑效果会被自动禁用。',
  },
  {
    key: 'stopInertiaOnNavigate',
    label: 'stopInertiaOnNavigate',
    hint: '点击站内锚点时立刻掐掉惯性。',
  },
]

export function Playground() {
  const { state, patch, reset, isDefault } = useSmoothOptions()
  const [draft, setDraft] = useState<SmoothState>(state)
  const [copiedShare, setCopiedShare] = useState(false)
  const lenis = useLenis()

  // 预设或重置改动了全局状态时，把草稿同步回来
  useEffect(() => setDraft(state), [state])

  const setSlider = (key: SliderKey, value: number) => setDraft((prev) => ({ ...prev, [key]: value }))
  const commit = (key: SliderKey, value: number) => patch({ [key]: value })

  const copyShareLink = async () => {
    const url = toShareUrl(draft)
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopiedShare(true)
      setTimeout(() => setCopiedShare(false), 2000)
    } catch {
      // 剪贴板不可用时降级
    }
  }

  const scrollByDelta = (delta: number) => {
    if (lenis) {
      lenis.scrollTo((lenis.scroll || 0) + delta)
    }
  }

  const scrollToInstall = () => {
    if (lenis) {
      lenis.scrollTo('#install')
    }
  }

  return (
    <section id="playground" className="scroll-mt-24 border-y border-border bg-surface-sunken/60 py-20 lg:py-28">
      <div className="mx-auto max-w-300 px-5">
        <Reveal className="max-w-[62ch]">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            调出你要的阻尼感。
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            这组控件直接作用在本页的 Lenis 实例上，滑块松手后整页立刻换手感，往下滚就能感觉到。
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* 控制面板 */}
          <Reveal className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              {PRESETS.map((preset) => {
                const on = Object.entries(preset.patch).every(
                  ([key, value]) => draft[key as keyof SmoothState] === value,
                )

                return (
                  <button
                    key={preset.id}
                    type="button"
                    title={preset.note}
                    onClick={() => patch(preset.patch)}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-[13px] transition-colors active:translate-y-px',
                      on
                        ? 'border-brand-line bg-brand-soft text-brand'
                        : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {preset.label}
                  </button>
                )
              })}

              <div className="ml-auto flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyShareLink}
                  title="生成并复制当前参数配置的专属链接"
                  className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copiedShare ? (
                    <>
                      <Check size={13} weight="bold" className="text-brand" />
                      <span className="text-brand">已复制链接</span>
                    </>
                  ) : (
                    <>
                      <LinkSimple size={13} />
                      <span>分享参数</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  disabled={isDefault}
                  className="gap-1.5 text-muted-foreground"
                >
                  <ArrowCounterClockwise size={13} />
                  重置
                </Button>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-mono text-[12px] text-muted-foreground">插值模式</span>
              <div className="inline-flex rounded-lg border border-border p-0.5">
                {(['lerp', 'duration'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => patch({ mode })}
                    className={cn(
                      'rounded-[7px] px-3 py-1 font-mono text-[12px] transition-colors',
                      draft.mode === mode
                        ? 'bg-brand text-brand-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[11px] text-muted-foreground/80">
                定义了 lerp 则 duration 失效
              </span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {SLIDERS.map((slider) => {
                const enabled = slider.activeIn(draft)
                return (
                  <div key={slider.key} className={cn('space-y-2', !enabled && 'opacity-45')}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[12px] text-foreground">{slider.label}</span>
                      <span className="font-mono text-[12px] tabular-nums text-brand">
                        {draft[slider.key].toFixed(2)}
                      </span>
                    </div>
                    <Slider
                      aria-label={slider.label}
                      value={draft[slider.key]}
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      disabled={!enabled}
                      onValueChange={(value) => setSlider(slider.key, toScalar(value))}
                      onValueCommitted={(value) => commit(slider.key, toScalar(value))}
                      className="slider-brand"
                    />
                    <p className="text-[11.5px] leading-relaxed text-muted-foreground">{slider.hint}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-7 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
              {TOGGLES.map((toggle) => (
                <div key={toggle.key} className="flex gap-3">
                  <Switch
                    checked={draft[toggle.key]}
                    onCheckedChange={(checked) => patch({ [toggle.key]: checked })}
                    aria-label={toggle.label}
                    className="mt-0.5 shrink-0 data-checked:bg-brand"
                  />
                  <div className="min-w-0">
                    <span className="block font-mono text-[12px] text-foreground">{toggle.label}</span>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                      {toggle.hint}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 生成的代码与手感测试 */}
          <Reveal delay={0.08} className="flex flex-col gap-4">
            <CodeBlock
              code={toCode(draft)}
              lang="javascript"
              label="本页正在运行的配置"
              className="flex-1"
            />

            {/* 即时手感试炼 */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold">即时手感试炼</span>
                <span className="font-mono text-[11px] text-muted-foreground">原地触发平滑阻尼</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => scrollByDelta(350)}
                  className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ArrowDown size={13} />
                  向下行进 350px
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => scrollByDelta(-350)}
                  className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ArrowUp size={13} />
                  向上回拉 350px
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={scrollToInstall}
                  className="gap-1.5 text-xs text-muted-foreground hover:border-brand-line hover:bg-brand-soft hover:text-brand"
                >
                  平滑直达安装区
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                想把这些参数写回你自己的项目，直接复制左侧的
                <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
                  new Lenis
                </code>
                调用即可。整页的滚动都在用这组值。
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
