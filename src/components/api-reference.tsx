import { Panel } from '@/components/panel'
import { Reveal } from '@/components/reveal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EVENTS, METHODS, PROPERTIES, type ApiItem } from '@/lib/content'

const GROUPS: { value: string; label: string; note: string; items: ApiItem[] }[] = [
  {
    value: 'properties',
    label: '属性',
    note: '实例上可直接读取的状态，带 getter 的为实时计算值。',
    items: PROPERTIES,
  },
  {
    value: 'methods',
    label: '方法',
    note: '控制实例生命周期与程序化滚动。',
    items: METHODS,
  },
  {
    value: 'events',
    label: '事件',
    note: '用 lenis.on(id, callback) 订阅。',
    items: EVENTS,
  },
]

export function ApiReference() {
  return (
    <section id="api" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-300 px-5">
        <Reveal className="max-w-[62ch]">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            实例上有什么，这里全列出来。
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            拿到 <code className="rounded bg-muted px-1 py-0.5 font-mono text-[13px]">lenis</code>{' '}
            实例之后，能读的、能调的、能监听的都在这里。
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <Tabs defaultValue="properties" className="gap-4">
            <TabsList>
              {GROUPS.map((group) => (
                <TabsTrigger key={group.value} value={group.value}>
                  {group.label}
                  <span className="ml-1.5 font-mono text-[11px] text-muted-foreground">
                    {group.items.length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {GROUPS.map((group) => (
              <TabsContent key={group.value} value={group.value}>
                <p className="mb-4 text-[13px] text-muted-foreground">{group.note}</p>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <Reveal key={item.name} className="h-full" amount={0.1}>
                      <Panel className="h-full bg-surface-raised p-4">
                        <code className="font-mono text-[13px] font-medium text-brand">
                          {item.name}
                        </code>
                        <p className="mt-1 font-mono text-[11.5px] text-muted-foreground">
                          {item.type}
                        </p>
                        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </Panel>
                    </Reveal>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  )
}
