import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import { BrandIcon } from '@/components/brand-icon'
import { ScrollTelemetry } from '@/components/scroll-telemetry'
import { Button } from '@/components/ui/button'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <section id="top" className="relative lg:flex lg:min-h-[calc(100dvh-4rem)] lg:items-center">
      <div className="mx-auto grid w-full max-w-300 items-center gap-12 px-5 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-20">
        <div>
          <motion.h1
            {...fade(0)}
            className="text-balance text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            在原生滚动之上，
            <br />
            加一层顺滑。
          </motion.h1>

          <motion.p
            {...fade(0.09)}
            className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-[17px]"
          >
            几 KB、零依赖。它包裹浏览器原生滚动，所以 sticky、锚点与无障碍照常工作。
          </motion.p>

          <motion.div {...fade(0.18)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              render={<a href="#install" />}
              className="h-11 gap-2 rounded-lg bg-brand px-6 text-[15px] text-brand-foreground hover:bg-brand/90"
            >
              快速开始
              <ArrowRight size={16} weight="bold" />
            </Button>
            <Button
              variant="outline"
              render={
                <a
                  href="https://github.com/darkroomengineering/lenis"
                  target="_blank"
                  rel="noreferrer noopener"
                />
              }
              className="h-11 gap-2 rounded-lg px-6 text-[15px]"
            >
              <BrandIcon name="github" className="size-4" />
              查看 GitHub
            </Button>
          </motion.div>
        </div>

        <motion.div {...fade(0.14)} className="w-full">
          <ScrollTelemetry />
        </motion.div>
      </div>
    </section>
  )
}
