export type OptionCategory = 'feel' | 'structure' | 'interaction'

export type LenisOption = {
  name: string
  type: string
  default: string
  description: string
  category: OptionCategory
  warn?: boolean
}

export const OPTION_CATEGORIES: { id: OptionCategory | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'feel', label: '滚动手感' },
  { id: 'structure', label: '容器与结构' },
  { id: 'interaction', label: '交互与事件' },
]

export const OPTIONS: LenisOption[] = [
  {
    name: 'allowNestedScroll',
    type: 'boolean',
    default: 'false',
    category: 'interaction',
    description:
      '自动允许嵌套的可滚动元素以原生方式滚动，是处理嵌套滚动最简单的方式。由于每次滚动事件都要检查 DOM 树，可能带来性能问题，若担心请改用 prevent 选项。',
    warn: true,
  },
  {
    name: 'anchors',
    type: 'boolean, ScrollToOptions',
    default: 'false',
    category: 'interaction',
    description:
      '点击时滚动到锚点链接。传 true 表示以默认选项启用，传 ScrollToOptions 表示以给定选项启用。',
  },
  {
    name: 'autoRaf',
    type: 'boolean',
    default: 'false',
    category: 'interaction',
    description: '是否自动运行 requestAnimationFrame 循环。',
  },
  {
    name: 'autoResize',
    type: 'boolean',
    default: 'true',
    category: 'structure',
    description:
      '基于 ResizeObserver 自动调整实例尺寸。若为 false，你必须手动调用 .resize()。',
  },
  {
    name: 'autoToggle',
    type: 'boolean',
    default: 'false',
    category: 'structure',
    description:
      '根据 wrapper 的 overflow 属性自动启动或停止 lenis 实例。需要 Lenis 推荐的 CSS，并要求 Safari > 17.3、Chrome > 116、Firefox > 128。',
    warn: true,
  },
  {
    name: 'content',
    type: 'HTMLElement',
    default: 'document.documentElement',
    category: 'structure',
    description: '承载将被滚动内容的元素，通常是 wrapper 的直接子元素。',
  },
  {
    name: 'duration',
    type: 'number',
    default: '1.2',
    category: 'feel',
    description: '滚动动画时长，单位为秒。若定义了 lerp 则无效。',
  },
  {
    name: 'easing',
    type: 'function',
    default: '(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))',
    category: 'feel',
    description:
      '滚动动画使用的缓动函数。Lenis 提供了自定义的默认值，你也可以从 Easings.net 中挑选。若定义了 lerp 则无效。',
  },
  {
    name: 'eventsTarget',
    type: 'HTMLElement, Window',
    default: 'wrapper',
    category: 'structure',
    description: '监听 wheel 和 touch 事件的元素。',
  },
  {
    name: 'gestureOrientation',
    type: 'string',
    default: 'vertical',
    category: 'feel',
    description: '手势方向，可为 vertical、horizontal 或 both。',
  },
  {
    name: 'infinite',
    type: 'boolean',
    default: 'false',
    category: 'feel',
    description: '启用无限滚动。在触摸设备上需要配合 syncTouch: true。',
  },
  {
    name: 'lerp',
    type: 'number',
    default: '0.1',
    category: 'feel',
    description: '线性插值（lerp）强度，取值在 0 到 1 之间。',
  },
  {
    name: 'naiveDimensions',
    type: 'boolean',
    default: 'false',
    category: 'structure',
    description: '若为 true，Lenis 将使用朴素的尺寸计算方式。请注意这会影响性能。',
    warn: true,
  },
  {
    name: 'orientation',
    type: 'string',
    default: 'vertical',
    category: 'feel',
    description: '滚动的方向，可为 vertical 或 horizontal。',
  },
  {
    name: 'overscroll',
    type: 'boolean',
    default: 'true',
    category: 'interaction',
    description: '类似 CSS 的 overscroll-behavior，控制是否允许滚动溢出传递。',
  },
  {
    name: 'prevent',
    type: 'function',
    default: 'undefined',
    category: 'interaction',
    description:
      '根据事件所经过的元素手动阻止滚动被平滑处理。若返回 true，该滚动将不被平滑化。示例：(node) => node.classList.contains("cookie-modal")。',
  },
  {
    name: 'respectReducedMotion',
    type: 'boolean',
    default: 'true',
    category: 'interaction',
    description:
      '尊重用户的 prefers-reduced-motion 设置：禁用平滑效果，程序化滚动即时完成，同时滚动仍在主线程上运行。',
  },
  {
    name: 'smoothWheel',
    type: 'boolean',
    default: 'true',
    category: 'feel',
    description: '平滑由 wheel 事件触发的滚动。',
  },
  {
    name: 'stopInertiaOnNavigate',
    type: 'boolean',
    default: 'false',
    category: 'interaction',
    description: '若为 true，Lenis 会在点击站内链接时停止惯性滚动。',
  },
  {
    name: 'syncTouch',
    type: 'boolean',
    default: 'false',
    category: 'feel',
    description: '在允许滚动同步的同时模拟触摸设备的滚动，在 iOS 16 以下可能不稳定。',
    warn: true,
  },
  {
    name: 'syncTouchLerp',
    type: 'number',
    default: '0.075',
    category: 'feel',
    description: 'syncTouch 惯性阶段所应用的 lerp。',
  },
  {
    name: 'touchInertiaExponent',
    type: 'number',
    default: '1.7',
    category: 'feel',
    description: '控制 syncTouch 惯性的强度。',
  },
  {
    name: 'touchMultiplier',
    type: 'number',
    default: '1',
    category: 'feel',
    description: '触摸事件的倍率。',
  },
  {
    name: 'virtualScroll',
    type: 'function',
    default: 'undefined',
    category: 'interaction',
    description:
      '在事件被消费之前手动修改它们。若返回 false，该滚动将不被平滑处理。示例：(e) => { e.deltaY /= 2 }。',
  },
  {
    name: 'wheelMultiplier',
    type: 'number',
    default: '1',
    category: 'feel',
    description: '鼠标滚轮事件的倍率。',
  },
  {
    name: 'wrapper',
    type: 'HTMLElement, Window',
    default: 'window',
    category: 'structure',
    description: '用作滚动容器的元素。',
  },
]

export type ApiItem = { name: string; type: string; description: string }

export const PROPERTIES: ApiItem[] = [
  { name: 'actualScroll', type: 'number', description: '浏览器记录的当前滚动值' },
  { name: 'animatedScroll', type: 'number', description: '当前滚动值' },
  { name: 'className', type: 'string (getter)', description: 'rootElement 的 className' },
  { name: 'dimensions', type: 'object', description: 'Dimensions 实例' },
  { name: 'direction', type: 'number', description: '1 表示向上滚动，-1 表示向下滚动' },
  { name: 'isHorizontal', type: 'boolean (getter)', description: '实例是否为水平方向' },
  {
    name: 'isScrolling',
    type: 'boolean, string (getter)',
    description: '滚动是否正在被动画化，取值 smooth、native 或 false',
  },
  { name: 'isStopped', type: 'boolean (getter)', description: '用户是否应被禁止滚动' },
  { name: 'lastVelocity', type: 'number', description: '上一次的滚动速度' },
  { name: 'limit', type: 'number (getter)', description: '最大滚动值' },
  { name: 'options', type: 'object', description: '实例选项' },
  {
    name: 'prefersReducedMotion',
    type: 'boolean (getter)',
    description: '用户是否偏好减弱动效，且 Lenis 正在遵循该偏好',
  },
  { name: 'progress', type: 'number (getter)', description: '滚动进度，从 0 到 1' },
  { name: 'rootElement', type: 'HTMLElement (getter)', description: 'Lenis 实例所挂载的元素' },
  {
    name: 'scroll',
    type: 'number (getter)',
    description: '当前滚动值，启用无限滚动时会做相应处理',
  },
  { name: 'targetScroll', type: 'number', description: '目标滚动值' },
  { name: 'time', type: 'number', description: '自实例创建以来经过的时间' },
  { name: 'velocity', type: 'number', description: '当前滚动速度' },
]

export const METHODS: ApiItem[] = [
  { name: 'destroy()', type: 'void', description: '销毁实例并移除所有事件。' },
  {
    name: 'on(id, function)',
    type: 'void',
    description: 'id 可为任意实例事件，用于监听 scroll 或 virtual-scroll。',
  },
  { name: 'raf(time)', type: 'void', description: '必须每帧调用，供内部使用，time 以毫秒为单位。' },
  {
    name: 'resize()',
    type: 'void',
    description: '计算内部尺寸，当 autoResize 为 false 时必须使用。',
  },
  {
    name: 'scrollTo(target, options)',
    type: 'void',
    description:
      '滚动到目标位置。target 可为像素数值、CSS 选择器、关键字（top、left、start、bottom、right、end）或 DOM 元素。options 支持 offset、lerp、duration、easing、immediate、lock、force、onComplete、userData。',
  },
  { name: 'start()', type: 'void', description: '恢复滚动。' },
  { name: 'stop()', type: 'void', description: '暂停滚动。' },
]

export const EVENTS: ApiItem[] = [
  { name: 'scroll', type: 'Lenis 实例', description: '滚动时触发，回调参数为当前 Lenis 实例。' },
  {
    name: 'virtual-scroll',
    type: '{ deltaX, deltaY, event }',
    description: '虚拟滚动事件被消费时触发，可用于改写滚动输入。',
  },
]

export const PREVENT_ATTRIBUTES = [
  { attr: 'data-lenis-prevent', description: '阻止所有平滑滚动事件' },
  { attr: 'data-lenis-prevent-wheel', description: '仅阻止滚轮事件' },
  { attr: 'data-lenis-prevent-touch', description: '仅阻止触摸事件' },
  { attr: 'data-lenis-prevent-vertical', description: '仅阻止垂直滚动事件' },
  { attr: 'data-lenis-prevent-horizontal', description: '仅阻止水平滚动事件' },
]

export const LIMITATIONS = [
  '不支持 CSS scroll-snap，请改用 lenis/snap 插件。',
  '在 Safari 上被限制为 60fps，低电量模式下为 30fps。',
  '在 iframe 之上平滑滚动会失效，因为 iframe 不转发 wheel 事件。',
  '在 M1 之前的 macOS Safari 上，position: fixed 似乎会掉帧。',
  '在 iOS 16 以下启用 syncTouch 时，触摸事件可能出现异常行为。',
  '嵌套滚动容器需要正确配置才能正常工作。',
]

export const TROUBLESHOOTING = [
  '确保你使用的是最新版 Lenis。',
  '引入推荐的 CSS，否则 autoToggle 与 stopped 状态不会生效。',
  '如果使用 GSAP ScrollTrigger，请确保按文档完成集成。',
  '在不使用 Lenis 的情况下测试，确认你的元素或页面本身是可滚动的。',
  '确保使用 autoRaf: true，或在你的动画循环中手动调用 lenis.raf(time)。',
]

export type ResourceLink = { title: string; note: string; href: string }

export const TUTORIALS: ResourceLink[] = [
  {
    title: '用 Lenis 实现无限滚动',
    note: 'Matt Rothenberg 在 Codrops 上的分步教程',
    href: 'https://tympanus.net/Development/ScrollAnimationsGrid/',
  },
  {
    title: '2025 年用 Lenis 构建平滑滚动',
    note: 'Edoardo Lunardi 的实战长文',
    href: 'https://www.edoardolunardi.dev/blog/building-smooth-scroll-in-2025-with-lenis',
  },
]

export const PLUGINS: ResourceLink[] = [
  {
    title: 'r3f-scroll-rig',
    note: '14islands 出品，把 DOM 与 WebGL 滚动场景对齐',
    href: 'https://github.com/14islands/r3f-scroll-rig',
  },
  {
    title: 'locomotive-scroll',
    note: 'Locomotive 出品，基于 Lenis 的滚动动效库',
    href: 'https://github.com/locomotivemtl/locomotive-scroll',
  },
]

export const PACKAGES: ResourceLink[] = [
  { title: 'lenis', note: '核心库', href: 'https://github.com/darkroomengineering/lenis/blob/main/README.md' },
  {
    title: 'lenis/react',
    note: 'React 适配器',
    href: 'https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md',
  },
  {
    title: 'lenis/vue',
    note: 'Vue 适配器',
    href: 'https://github.com/darkroomengineering/lenis/tree/main/packages/vue/README.md',
  },
  { title: 'lenis/framer', note: 'Framer 站点接入', href: 'https://lenis.framer.website/' },
  {
    title: 'lenis/snap',
    note: '滚动吸附插件',
    href: 'https://github.com/darkroomengineering/lenis/tree/main/packages/snap/README.md',
  },
]

export const FEATURES = [
  {
    id: 'sync',
    title: '为同步而生',
    body: '一个循环即可驱动 WebGL 滚动场景、GSAP ScrollTrigger 和视差效果，所有消费者读到的都是同一个插值结果。',
  },
  {
    id: 'lightweight',
    title: '轻量且无依赖',
    body: '整个库只有几 KB，零运行时依赖。装进去不需要重新审视你的打包体积。',
  },
  {
    id: 'native',
    title: '基于原生滚动',
    body: '它包裹浏览器自身的滚动，因此 position: sticky、锚点链接和可访问性都能照常工作。',
  },
  {
    id: 'axis',
    title: '支持任意轴向',
    body: '单个实例即可实现平滑的垂直、水平以及嵌套滚动，切换方向只是改一个选项。',
  },
  {
    id: 'snap',
    title: '滚动吸附',
    body: 'snap 插件可在不与平滑滚动冲突的前提下对齐各个分节，无需 CSS scroll-snap。',
  },
  {
    id: 'frameworks',
    title: '框架适配器',
    body: '提供面向 React、Vue 和 Framer 的一等支持，不需要自己写生命周期胶水代码。',
  },
]

export const INSTALL_COMMANDS: { id: string; label: string; lang: 'bash' | 'html'; code: string }[] = [
  { id: 'bun', label: 'bun', lang: 'bash', code: 'bun add lenis' },
  { id: 'npm', label: 'npm', lang: 'bash', code: 'npm i lenis' },
  { id: 'pnpm', label: 'pnpm', lang: 'bash', code: 'pnpm add lenis' },
  { id: 'yarn', label: 'yarn', lang: 'bash', code: 'yarn add lenis' },
  {
    id: 'cdn',
    label: 'script 标签',
    lang: 'html',
    code: `<script src="https://unpkg.com/lenis@1.3.26/dist/lenis.min.js"><\/script>`,
  },
]

export const ZERO_CODE_SNIPPET = `<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.26/dist/lenis.css">
<script src="https://unpkg.com/lenis@1.3.26/dist/lenis.min.js"><\/script>
<script>
  new Lenis({
    autoRaf: true,
    autoToggle: true,
    anchors: true,
    allowNestedScroll: true,
    naiveDimensions: true,
    stopInertiaOnNavigate: true,
  })
<\/script>`

export const RECOMMENDED_CSS_SNIPPET = `import 'lenis/dist/lenis.css'`

export const RECOMMENDED_CSS_LINK = `<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.26/dist/lenis.css">`

export const BASIC_USAGE_SNIPPET = `import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const lenis = new Lenis({
  autoRaf: true,
})

lenis.on('scroll', (e) => {
  console.log(e)
})`

export const CUSTOM_RAF_SNIPPET = `import Lenis from 'lenis'

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)`

export const GSAP_SNIPPET = `import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()

// 把 Lenis 的滚动同步给 ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

// 用 GSAP 的 ticker 驱动 Lenis 的 raf，时间需要从秒换算成毫秒
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

// 关闭延迟平滑，避免滚动动画出现迟滞
gsap.ticker.lagSmoothing(0)`

export const NESTED_PREVENT_SNIPPET = `<div data-lenis-prevent>scrollable content</div>`

export const NESTED_PREVENT_JS_SNIPPET = `const lenis = new Lenis({
  prevent: (node) => node.id === 'modal',
})`

export const NESTED_ALLOW_SNIPPET = `const lenis = new Lenis({
  allowNestedScroll: true,
})`

export const ANCHOR_ENABLE_SNIPPET = `new Lenis({
  anchors: true,
})`

export const ANCHOR_OPTIONS_SNIPPET = `new Lenis({
  anchors: {
    offset: 100,
    onComplete: () => {
      console.log('scrolled to anchor')
    },
  },
})`

export const REDUCED_MOTION_SNIPPET = `// 默认值，通常不需要写出来
const lenis = new Lenis({
  respectReducedMotion: true,
})

// 也可以选择退出（不推荐）
const ignorePreference = new Lenis({
  respectReducedMotion: false,
})`

export const REACT_USAGE_SNIPPET = `import { ReactLenis, useLenis } from 'lenis/react'

function Layout({ children }) {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      {children}
    </ReactLenis>
  )
}

function ScrollButton() {
  const lenis = useLenis()

  return (
    <button onClick={() => lenis?.scrollTo('#contact')}>
      滚动到联系方式
    </button>
  )
}`

export const SPONSOR_LOGOS = [
  {
    name: 'The Content Architecture',
    href: 'https://www.contentarchitecture.dev/?utm_source=lenis&utm_medium=github',
    logo: 'https://darkroom-lenis-showcase.s3.us-east-1.amazonaws.com/pbc_3665759510/23raiqpdg8nej3m/word_49x1dnfo22.svg',
  },
]

export const SPONSOR_PEOPLE = [
  { login: 'glauber-sampaio', name: 'Glauber' },
  { login: 'smsunarto', name: 'Scott' },
  { login: 'bizarro', name: 'Luis Bizarro' },
  { login: 'edoardolunardi', name: 'Edoardo Lunardi' },
  { login: 'cachet-studio', name: 'cachet.studio' },
  { login: 'GoodFellaStudio', name: 'Julian Fella' },
  { login: 'OHO-Design', name: 'OHO Design' },
  { login: 'itsoffbrand', name: 'OFF+BRAND.' },
]
