import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { OfficialBannerHud } from './official-banner-hud'

export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // 视差：图片随区块进出视口缓慢位移，用来拉开层次
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.12])

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { y, scale }}
      >
        <picture>
          <source
            type="image/webp"
            srcSet="/images/optimized/manifesto-960.webp 960w, /images/optimized/manifesto-1440.webp 1440w, /images/optimized/manifesto-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/images/optimized/manifesto-1920.jpg"
            alt="缓慢流动的半透明材质与一道朱红光痕，呼应平滑滚动的连续性"
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </picture>
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/90 to-background/40" />

      <div className="mx-auto flex min-h-96 max-w-300 flex-col justify-between gap-12 px-5 py-20 lg:flex-row lg:items-center md:min-h-120 lg:min-h-136">
        <div className="max-w-[44ch]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">宣言</p>
          <p className="mt-4 text-2xl leading-[1.35] font-medium tracking-tight text-balance sm:text-3xl">
            Lenis 取自拉丁语里的「平滑」。它不接管滚动，只是在原生滚动之上做一次插值。
          </p>
          <a
            href="https://github.com/darkroomengineering/lenis/blob/main/MANIFESTO.md"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-7 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-3.5 py-2 text-[13px] backdrop-blur-sm transition-colors hover:border-brand-line hover:text-brand active:translate-y-px"
          >
            阅读完整宣言
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="w-full flex-1 lg:max-w-150">
          <OfficialBannerHud />
        </div>
      </div>
    </section>
  )
}

