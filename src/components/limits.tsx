import { Wrench, Warning } from '@phosphor-icons/react'
import { Panel } from '@/components/panel'
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal'
import { LIMITATIONS, TROUBLESHOOTING } from '@/lib/content'

const PLATFORM_LIMITS = [LIMITATIONS[1], LIMITATIONS[2], LIMITATIONS[3], LIMITATIONS[4]]
const SCOPE_LIMITS = [LIMITATIONS[0], LIMITATIONS[5]]

export function Limits() {
  return (
    <section id="limits" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-300 px-5">
        <Reveal className="max-w-[62ch]">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            边界在哪，排查从哪下手。
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            这些都是已知问题，不是你的配置错了。真出问题了，右边那份清单按顺序过一遍。
          </p>
        </Reveal>

        <RevealGroup step={0.08} className="mt-10 grid gap-5 lg:grid-cols-2">
          <RevealItem>
            <Panel className="h-full p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Warning size={17} weight="regular" className="text-brand" />
                <h3 className="text-[15px] font-semibold">局限性</h3>
              </div>

              <div className="mt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  平台限制
                </p>
                <ul className="mt-2.5 grid gap-2.5">
                  {PLATFORM_LIMITS.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed">
                      <span className="mt-1.75 size-1 shrink-0 rounded-full bg-brand/60" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  能力边界
                </p>
                <ul className="mt-2.5 grid gap-2.5">
                  {SCOPE_LIMITS.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed">
                      <span className="mt-1.75 size-1 shrink-0 rounded-full bg-brand/60" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          </RevealItem>

          <RevealItem>
            <Panel className="h-full bg-surface-raised p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Wrench size={17} weight="regular" className="text-brand" />
                <h3 className="text-[15px] font-semibold">故障排查</h3>
              </div>

              <ol className="mt-5 grid gap-3">
                {TROUBLESHOOTING.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-brand-line bg-brand-soft font-mono text-[11px] text-brand">
                      {index + 1}
                    </span>
                    <span className="text-[13.5px] leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </Panel>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
