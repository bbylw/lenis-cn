import { ArrowUpRight } from '@phosphor-icons/react'
import { Panel } from '@/components/panel'
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal'
import { PLUGINS, PACKAGES, TUTORIALS, type ResourceLink } from '@/lib/content'

function LinkCard({ link }: { link: ResourceLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand-line hover:bg-brand-soft"
    >
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[13.5px] font-medium">{link.title}</span>
        <span className="mt-1 block text-[12.5px] leading-relaxed text-muted-foreground">
          {link.note}
        </span>
      </span>
      <ArrowUpRight
        size={14}
        className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
      />
    </a>
  )
}

export function Resources() {
  return (
    <section
      id="resources"
      className="scroll-mt-24 border-y border-border bg-surface-sunken/60 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-300 px-5">
        <Reveal className="max-w-[62ch]">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">接着往下读。</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            文档之外，教程、插件与各框架适配器的入口都在这。
          </p>
        </Reveal>

        <RevealGroup step={0.07} className="mt-10 grid gap-5 lg:grid-cols-2">
          <RevealItem>
            <div>
              <h3 className="text-[15px] font-semibold">教程</h3>
              <p className="mt-1 text-[12.5px] text-muted-foreground">别人的踩坑记录，值得先读</p>
              <div className="mt-3 grid gap-3">
                {TUTORIALS.map((link) => (
                  <LinkCard key={link.href} link={link} />
                ))}
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <div>
              <h3 className="text-[15px] font-semibold">插件</h3>
              <p className="mt-1 text-[12.5px] text-muted-foreground">
                在 Lenis 之上再叠一层能力
              </p>
              <div className="mt-3 grid gap-3">
                {PLUGINS.map((link) => (
                  <LinkCard key={link.href} link={link} />
                ))}
              </div>
            </div>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-5">
          <Panel className="p-5">
            <h3 className="text-[15px] font-semibold">相关包</h3>
            <p className="mt-1 text-[12.5px] text-muted-foreground">按你的框架挑</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {PACKAGES.map((pkg) => (
                <a
                  key={pkg.href}
                  href={pkg.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2.5 rounded-lg border border-border bg-surface-raised px-3.5 py-2.5 transition-colors hover:border-brand-line hover:bg-brand-soft"
                >
                  <span className="font-mono text-[13px]">{pkg.title}</span>
                  <span className="text-[12px] text-muted-foreground">{pkg.note}</span>
                  <ArrowUpRight
                    size={13}
                    className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                  />
                </a>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </section>
  )
}
