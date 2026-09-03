import { CodeBlock } from '@/components/code-block'
import { Panel, PanelBody } from '@/components/panel'
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BASIC_USAGE_SNIPPET,
  CUSTOM_RAF_SNIPPET,
  GSAP_SNIPPET,
  INSTALL_COMMANDS,
  REACT_USAGE_SNIPPET,
  RECOMMENDED_CSS_LINK,
  RECOMMENDED_CSS_SNIPPET,
  ZERO_CODE_SNIPPET,
} from '@/lib/content'

const RECIPES = [
  { title: '基础用法', code: BASIC_USAGE_SNIPPET, lang: 'javascript' as const },
  { title: '自定义 raf 循环', code: CUSTOM_RAF_SNIPPET, lang: 'javascript' as const },
  { title: 'GSAP ScrollTrigger', code: GSAP_SNIPPET, lang: 'javascript' as const },
  { title: '在 React 里', code: REACT_USAGE_SNIPPET, lang: 'tsx' as const },
]

export function Install() {
  return (
    <section id="install" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-300 px-5">
        <Reveal className="max-w-[62ch]">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">装上去，两行就够。</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            用包管理器装，或者直接贴一个 script 标签。没有构建步骤也能跑。
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <Tabs defaultValue="bun" className="gap-3">
            <TabsList>
              {INSTALL_COMMANDS.map((command) => (
                <TabsTrigger key={command.id} value={command.id}>
                  {command.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {INSTALL_COMMANDS.map((command) => (
              <TabsContent key={command.id} value={command.id}>
                <CodeBlock
                  code={command.code}
                  lang={command.lang}
                  label={command.id === 'cdn' ? 'index.html' : '终端'}
                />
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>

        <RevealGroup step={0.07} className="mt-5 grid gap-5 lg:grid-cols-2">
          <RevealItem>
            <PanelBody
              title="零代码一行接入"
              description="没有构建步骤，直接放进 HTML。它顺手处理了大多数常见问题。"
              className="h-full"
            >
              <CodeBlock code={ZERO_CODE_SNIPPET} lang="html" label="index.html" />
              <ul className="mt-4 grid gap-1.5 text-[13px] text-muted-foreground">
                <li>与其他包的兼容性</li>
                <li>弹窗（modal）</li>
                <li>平滑的锚点跳转</li>
                <li>页面切换时重置滚动</li>
              </ul>
            </PanelBody>
          </RevealItem>

          <RevealItem>
            <PanelBody
              title="推荐的 CSS"
              description="Lenis 需要这段样式才能让 stopped 状态与 autoToggle 正常工作，二选一即可。"
              className="h-full"
            >
              <div className="grid gap-3">
                <CodeBlock code={RECOMMENDED_CSS_SNIPPET} lang="javascript" label="入口文件" />
                <CodeBlock code={RECOMMENDED_CSS_LINK} lang="html" label="index.html" />
              </div>
            </PanelBody>
          </RevealItem>
        </RevealGroup>

        <RevealGroup step={0.05} className="mt-5 grid gap-5 md:grid-cols-2">
          {RECIPES.map((recipe) => (
            <RevealItem key={recipe.title}>
              <Panel className="p-5">
                <h3 className="text-[15px] font-semibold">{recipe.title}</h3>
                <div className="mt-4">
                  <CodeBlock code={recipe.code} lang={recipe.lang} label={recipe.title} />
                </div>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
