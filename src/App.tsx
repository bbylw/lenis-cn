import { ApiReference } from '@/components/api-reference'
import { Features } from '@/components/features'
import { Hero } from '@/components/hero'
import { Install } from '@/components/install'
import { Limits } from '@/components/limits'
import { Manifesto } from '@/components/manifesto'
import { Notes } from '@/components/notes'
import { OptionsExplorer } from '@/components/options-explorer'
import { Playground } from '@/components/playground'
import { Resources } from '@/components/resources'
import { BackToTop } from '@/components/back-to-top'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { SmoothProvider } from '@/components/smooth-provider'
import { Sponsors } from '@/components/sponsors'

export default function App() {
  return (
    <SmoothProvider>
      <div className="relative isolate min-h-dvh overflow-x-clip">
        {/* 顶部光晕：只做一点层次，不参与滚动，始终在内容之下 */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-115 bg-[radial-gradient(120%_78%_at_50%_-12%,var(--brand-soft),transparent_68%)]"
        />

        <div className="relative z-10">
          <SiteNav />
          <main>
            <Hero />
            <Sponsors />
            <Features />
            <Manifesto />
            <Playground />
            <Install />
            <OptionsExplorer />
            <ApiReference />
            <Notes />
            <Limits />
            <Resources />
          </main>
          <SiteFooter />
          <BackToTop />
        </div>
      </div>
    </SmoothProvider>
  )
}
