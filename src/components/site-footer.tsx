import { BrandIcon } from '@/components/brand-icon'
import { PACKAGES } from '@/lib/content'

const EXTERNAL = [
  { label: 'GitHub', href: 'https://github.com/darkroomengineering/lenis' },
  { label: 'npm', href: 'https://www.npmjs.com/package/lenis' },
  { label: '案例展示', href: 'https://www.lenis.dev/showcase' },
  { label: '赞助', href: 'https://github.com/sponsors/darkroomengineering' },
]

export function SiteFooter() {
  return (
    <footer className="py-14">
      <div className="mx-auto max-w-300 px-5">
        <div className="grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-semibold tracking-tight">Lenis</span>
              <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                中文
              </span>
            </div>
            <p className="mt-3 max-w-[34ch] text-[13px] leading-relaxed text-muted-foreground">
              一个轻量、稳健且高性能的平滑滚动库，由 darkroom.engineering 出品。
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              官方链接
            </p>
            <ul className="mt-3 grid gap-2">
              {EXTERNAL.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[13px] text-foreground/85 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              相关包
            </p>
            <ul className="mt-3 grid gap-2">
              {PACKAGES.map((pkg) => (
                <li key={pkg.href}>
                  <a
                    href={pkg.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[13px] text-foreground/85 transition-colors hover:text-brand"
                  >
                    {pkg.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              许可证
            </p>
            <p className="mt-3 text-[13px] text-foreground/85">MIT</p>
            <a
              href="https://github.com/darkroomengineering"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 inline-flex items-center gap-2 text-[13px] text-foreground/85 transition-colors hover:text-brand"
            >
              <BrandIcon name="github" className="size-4" />
              darkroom.engineering
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">
            本站是 Lenis 官方 README 的中文整理与演示，不是官方站点，内容以
            <a
              href="https://github.com/darkroomengineering/lenis"
              target="_blank"
              rel="noreferrer noopener"
              className="mx-1 text-brand hover:underline"
            >
              原仓库
            </a>
            为准。页面自身的平滑滚动，就是你现在正在感受的这一层。
          </p>
        </div>
      </div>
    </footer>
  )
}
