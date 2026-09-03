import { ArrowsHorizontal, Feather, Magnet, Pulse, Stack } from '@phosphor-icons/react'
import { ReactLenis } from 'lenis/react'
import { BrandIcon } from '@/components/brand-icon'
import { RevealGroup, RevealItem } from '@/components/reveal'
import { FEATURES } from '@/lib/content'

const HORIZONTAL_ITEMS = ['垂直', '水平', '嵌套', '反向', '分段', '无限', '吸附', '视差']

/** 一个真正跑着 Lenis 的水平滚动实例，用来演示 orientation: 'horizontal' */
function HorizontalScrollDemo() {
  return (
    <div className="mt-3 -mx-1">
      <ReactLenis
        options={{
          orientation: 'horizontal',
          gestureOrientation: 'both',
          autoRaf: true,
          duration: 1.1,
          wheelMultiplier: 1.4,
        }}
        {...{ 'data-lenis-prevent': '' }}
        className="code-scroll overflow-x-auto overflow-y-hidden"
      >
        <div className="flex w-max gap-2 pb-1">
          {HORIZONTAL_ITEMS.map((item, index) => (
            <span
              key={item}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border bg-surface-raised px-3 font-mono text-[12px] text-muted-foreground"
            >
              <span className="text-brand">{String(index + 1).padStart(2, '0')}</span>
              {item}
            </span>
          ))}
        </div>
      </ReactLenis>
      <p className="mt-2 font-mono text-[11px] text-muted-foreground/80">
        在这个条上滚动，它是独立的水平实例
      </p>
    </div>
  )
}

function FeatureShell({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode
  className?: string
  padded?: boolean
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-card ${padded ? 'p-5' : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

export function Features() {
  const byId = (id: string) => FEATURES.find((feature) => feature.id === id)!

  return (
    <section id="features" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-300 px-5">
        <div className="max-w-[62ch]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">特性</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            小体积，换来的是整个页面的手感。
          </h2>
        </div>

        <RevealGroup
          step={0.06}
          className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(9.5rem,auto)]"
        >
          {/* 为同步而生：整张图铺满，2x2 */}
          <RevealItem className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <FeatureShell padded={false} className="h-full min-h-64 lg:min-h-0">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/optimized/sync-motion-720.webp 720w, /images/optimized/sync-motion-1080.webp 1080w, /images/optimized/sync-motion-1440.webp 1440w"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <img
                  src="/images/optimized/sync-motion-1440.jpg"
                  alt="长曝光下连续流动的光带，象征被平滑同步的滚动运动"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/55 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-5">
                <Pulse size={20} className="mb-3 text-brand" />
                <h3 className="text-lg font-semibold">{byId('sync').title}</h3>
                <p className="mt-1.5 max-w-[38ch] text-[13px] leading-relaxed text-muted-foreground">
                  {byId('sync').body}
                </p>
              </div>
            </FeatureShell>
          </RevealItem>

          {/* 轻量且无依赖 */}
          <RevealItem className="md:col-span-2 lg:col-span-2">
            <FeatureShell className="h-full">
              <Feather size={20} className="text-brand" />
              <h3 className="mt-3 text-base font-semibold">{byId('lightweight').title}</h3>
              <p className="mt-1.5 max-w-[48ch] text-[13px] leading-relaxed text-muted-foreground">
                {byId('lightweight').body}
              </p>
            </FeatureShell>
          </RevealItem>

          {/* 基于原生滚动 */}
          <RevealItem>
            <FeatureShell className="h-full bg-brand-soft">
              <Stack size={20} className="text-brand" />
              <h3 className="mt-3 text-base font-semibold">{byId('native').title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {byId('native').body}
              </p>
            </FeatureShell>
          </RevealItem>

          {/* 支持任意轴向：现场跑一个水平实例 */}
          <RevealItem>
            <FeatureShell className="h-full">
              <ArrowsHorizontal size={20} className="text-brand" />
              <h3 className="mt-3 text-base font-semibold">{byId('axis').title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {byId('axis').body}
              </p>
              <HorizontalScrollDemo />
            </FeatureShell>
          </RevealItem>

          {/* 滚动吸附 */}
          <RevealItem>
            <FeatureShell className="h-full">
              <div className="flex h-full flex-col">
                <Magnet size={20} className="text-brand" />
                <h3 className="mt-3 text-base font-semibold">{byId('snap').title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {byId('snap').body}
                </p>
                <a
                  href="https://github.com/darkroomengineering/lenis/tree/main/packages/snap/README.md"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-auto inline-flex items-center gap-1 pt-3 font-mono text-[12px] text-brand hover:underline"
                >
                  lenis/snap
                </a>
              </div>
            </FeatureShell>
          </RevealItem>

          {/* 框架适配器 */}
          <RevealItem className="md:col-span-2 lg:col-span-3">
            <FeatureShell className="flex h-full flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h3 className="text-base font-semibold">{byId('frameworks').title}</h3>
                <p className="mt-1.5 max-w-[46ch] text-[13px] leading-relaxed text-muted-foreground">
                  {byId('frameworks').body}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-5 text-muted-foreground">
                <span className="inline-flex items-center gap-2 text-[13px]">
                  <BrandIcon name="react" className="size-5" />
                  React
                </span>
                <span className="inline-flex items-center gap-2 text-[13px]">
                  <BrandIcon name="vue" className="size-5" />
                  Vue
                </span>
                <span className="inline-flex items-center gap-2 text-[13px]">
                  <BrandIcon name="framer" className="size-5" />
                  Framer
                </span>
              </div>
            </FeatureShell>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
