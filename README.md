[![LENIS](https://assets.darkroom.engineering/lenis/banner.gif)](https://github.com/darkroomengineering/lenis)

[![npm](https://img.shields.io/npm/v/lenis?colorA=E30613&colorB=000000
)](https://www.npmjs.com/package/lenis)
[![downloads](https://img.shields.io/npm/dm/lenis?colorA=E30613&colorB=000000
)](https://www.npmjs.com/package/lenis)
[![size](https://img.shields.io/bundlephobia/minzip/lenis?label=size&colorA=E30613&colorB=000000)](https://bundlephobia.com/package/lenis)

## 简介

Lenis（拉丁语中意为"平滑"）是一个轻量、稳健且高性能的平滑滚动库。它由 [@darkroom.engineering](https://twitter.com/darkroomdevs) 设计，目标是简单易用、便于集成到你的项目中。它以性能为核心构建，并针对现代浏览器做了优化。它非常适合为网站打造平滑滚动体验，例如 WebGL 滚动同步、视差效果等等，参见 [Demo](https://lenis.darkroom.engineering/) 和 [案例展示](https://www.lenis.dev/showcase)。

阅读我们的 [宣言](https://github.com/darkroomengineering/lenis/blob/main/MANIFESTO.md)，了解 Lenis 背后的灵感。

<br/>

- [特性](#特性)
- [赞助商](#赞助商)
- [相关包](#相关包)
- [案例展示](https://www.lenis.dev/showcase)
- [安装](#安装)
- [配置](#配置)
- [零代码使用](#零代码使用)
- [配置项](#配置项)
- [属性](#属性)
- [方法](#方法)
- [事件](#事件)
- [注意事项](#注意事项)
- [局限性](#局限性)
- [故障排查](#故障排查)
- [教程](#教程)
- [插件](#插件)
- [许可证](#许可证)

<br/>

## 特性

- **轻量且无依赖** —— 整个库只有几 KB，零运行时依赖
- **基于原生滚动运行** —— 包裹浏览器自身的滚动，因此 `position: sticky`、锚点链接和可访问性都能正常工作
- **支持任意轴向** —— 单个实例即可实现平滑的垂直、水平以及嵌套滚动
- **为同步而生** —— 一个循环即可驱动 WebGL 滚动场景、GSAP ScrollTrigger 和视差效果
- **框架适配器** —— 提供面向 React、Vue 和 Framer 的一等支持
- **滚动吸附** —— snap 插件可在不与平滑滚动冲突的前提下对齐各个分节

## 赞助商

如果你用过 Lenis，并且它让你的站点多了一丝生气，欢迎考虑 [赞助我们](https://github.com/sponsors/darkroomengineering)。

你的支持帮助我们一点一点把互联网变得更顺滑，也让我们能继续打造那些关注常被忽视细节的工具。

<!-- sponsors -->
<a href="https://www.contentarchitecture.dev/?utm_source=lenis&utm_medium=github"><img src="https://darkroom-lenis-showcase.s3.us-east-1.amazonaws.com/pbc_3665759510/23raiqpdg8nej3m/word_49x1dnfo22.svg" height="96" alt="The Content Architecture"/></a>

<a href="https://glauber.org/?utm_source=lenis&utm_medium=github"><img src="https://github.com/glauber-sampaio.png?size=64" width="64" height="64" alt="Glauber"/></a> <a href="https://smsunarto.com/?utm_source=lenis&utm_medium=github"><img src="https://github.com/smsunarto.png?size=64" width="64" height="64" alt="Scott"/></a> <a href="https://bizar.ro/?utm_source=lenis&utm_medium=github"><img src="https://github.com/bizarro.png?size=64" width="64" height="64" alt="Luis Bizarro"/></a> <a href="https://www.edoardolunardi.dev/?utm_source=lenis&utm_medium=github"><img src="https://github.com/edoardolunardi.png?size=64" width="64" height="64" alt="Edoardo Lunardi"/></a> <a href="https://www.cachet.studio/?utm_source=lenis&utm_medium=github"><img src="https://github.com/cachet-studio.png?size=64" width="64" height="64" alt="cachet.studio"/></a> <a href="https://good-fella.com/?utm_source=lenis&utm_medium=github"><img src="https://github.com/GoodFellaStudio.png?size=64" width="64" height="64" alt="Julian Fella"/></a> <a href="https://oho.design/?utm_source=lenis&utm_medium=github"><img src="https://github.com/OHO-Design.png?size=64" width="64" height="64" alt="OHO Design"/></a> <a href="https://itsoffbrand.com/?utm_source=lenis&utm_medium=github"><img src="https://github.com/OFF-BRAND.png?size=64" width="64" height="64" alt="OFF+BRAND."/></a>
<!-- sponsors -->

<br/>

## 相关包

- [lenis](https://github.com/darkroomengineering/lenis/blob/main/README.md)
- [lenis/react](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md)
- [lenis/vue](https://github.com/darkroomengineering/lenis/tree/main/packages/vue/README.md)
- [lenis/framer](https://lenis.framer.website/)
- [lenis/snap](https://github.com/darkroomengineering/lenis/tree/main/packages/snap/README.md)

<br/>

## 安装

使用包管理器：

```bash
npm i lenis
# 或
yarn add lenis
# 或
pnpm add lenis
```

```js
import Lenis from 'lenis'
```

<br/>

使用 script 标签：

```html
<script src="https://unpkg.com/lenis@1.3.26/dist/lenis.min.js"></script> 
```


<br/>

## 配置

### 基础用法：

```js
// 初始化 Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// 监听 scroll 事件并打印事件数据
lenis.on('scroll', (e) => {
  console.log(e);
});
```

### 自定义 raf 循环：

```js
// 初始化 Lenis
const lenis = new Lenis();

// 使用 requestAnimationFrame 持续更新滚动
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

### 推荐的 CSS：

**导入样式表：**
```js
import 'lenis/dist/lenis.css'
```

**或者通过 link 引入 CSS 文件：**

```html
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.26/dist/lenis.css">
```

**或者手动添加：**

[查看 lenis.css 样式表](https://github.com/darkroomengineering/lenis/blob/main/packages/core/lenis.css)

### GSAP ScrollTrigger：
```js
// 初始化一个新的 Lenis 实例以实现平滑滚动
const lenis = new Lenis();

// 将 Lenis 的滚动与 GSAP 的 ScrollTrigger 插件同步
lenis.on('scroll', ScrollTrigger.update);

// 把 Lenis 的 requestAnimationFrame（raf）方法加入 GSAP 的 ticker
// 这样可确保 Lenis 的平滑滚动动画在每次 GSAP tick 时更新
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // 将时间从秒换算为毫秒
});

// 关闭 GSAP 的延迟平滑，避免滚动动画出现延迟
gsap.ticker.lagSmoothing(0);

```

<br/>

## 零代码使用

一行代码，无需构建步骤 —— 直接放进你的 HTML：

```html
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.26/dist/lenis.css">
<script src="https://unpkg.com/lenis@1.3.26/dist/lenis.min.js"></script> 
<script>new Lenis({ autoRaf: true, autoToggle: true, anchors: true, allowNestedScroll: true, naiveDimensions: true, stopInertiaOnNavigate: true })</script>
```

就这样，你的页面现在拥有了平滑滚动，并且能应对大多数常见问题，例如：
- 与其他包的兼容性
- 弹窗（modal）
- 平滑的锚点跳转
- 页面切换时重置滚动

<br/>


## 配置项

| 选项                    | 类型                       | 默认值                                             | 说明                                                                                                                                                                                                                                                                              |
|-------------------------|----------------------------|----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `allowNestedScroll`     | `boolean`                  | `false`                                            | 自动允许嵌套的可滚动元素以原生方式滚动。这是处理嵌套滚动最简单的方式。⚠️ 由于每次滚动事件都要检查 DOM 树，可能带来性能问题。如果担心这点，请改用 `prevent` 选项。                                                                                       |
| `anchors`               | `boolean, ScrollToOptions` | `false`                                            | 点击时滚动到锚点链接。传 `true` 表示以默认选项启用锚点链接；传 `ScrollToOptions` 表示以给定选项启用锚点链接。                                                                                                                                                       |
| `autoRaf`               | `boolean`                  | `false`                                            | 是否自动运行 `requestAnimationFrame` 循环。                                                                                                                                                                                                                                    |
| `autoResize`            | `boolean`                  | `true`                                             | 基于 `ResizeObserver` 自动调整实例尺寸。若为 `false`，你必须手动调用 `.resize()`。                                                                                                                                                                                              |
| `autoToggle`            | `boolean`                  | `false`                                            | 根据 wrapper 的 overflow 属性自动启动或停止 lenis 实例，⚠️ 这需要 Lenis 推荐的 CSS。Safari > 17.3、Chrome > 116、Firefox > 128（[https://caniuse.com/?search=transition-behavior](https://caniuse.com/?search=transition-behavior)）。 |
| `content`               | `HTMLElement`              | `document.documentElement`                         | 承载将被滚动内容的元素，通常是 `wrapper` 的直接子元素。                                                                                                                                                                                                                       |
| `duration`              | `number`                   | `1.2`                                              | 滚动动画时长（单位：秒）。若定义了 lerp 则无效。                                                                                                                                                                                                                              |
| `easing`                | `function`                 | `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` | 滚动动画使用的缓动函数。我们提供了自定义的默认值，你也可以从 [Easings.net](https://easings.net/en) 中挑选。若定义了 lerp 则无效。                                                                                                                                       |
| `eventsTarget`          | `HTMLElement, Window`      | `wrapper`                                          | 监听 `wheel` 和 `touch` 事件的元素。                                                                                                                                                                                                                                          |
| `gestureOrientation`    | `string`                   | `vertical`                                         | 手势方向，可为 `vertical`、`horizontal` 或 `both`。                                                                                                                                                                                                                             |
| `infinite`              | `boolean`                  | `false`                                            | 启用无限滚动！在触摸设备上需要配合 `syncTouch: true`（[查看示例](https://codepen.io/ClementRoche/pen/OJqBLod)）。                                                                                                                                                              |
| `lerp`                  | `number`                   | `0.1`                                              | 线性插值（lerp）强度（0 到 1 之间）。                                                                                                                                                                                                                                         |
| `naiveDimensions`       | `boolean`                  | `false`                                            | 若为 `true`，Lenis 将使用朴素（naive）的尺寸计算方式。⚠️ 请注意，这会影响性能。                                                                                                                                                                                              |
| `orientation`           | `string`                   | `vertical`                                         | 滚动的方向，可为 `vertical` 或 `horizontal`。                                                                                                                                                                                                                                 |
| `overscroll`            | `boolean`                  | `true`                                             | 类似 CSS 的 overscroll-behavior（https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior）。                                                                                                                                                                   |
| `prevent`               | `function`                 | `undefined`                                        | 根据事件所经过的元素，手动阻止滚动被平滑处理。若返回 `true`，该滚动将不被平滑化。示例：`(node) =>  node.classList.contains('cookie-modal')`。                                                                                                                                |
| `respectReducedMotion`  | `boolean`                  | `true`                                             | 尊重用户的 `prefers-reduced-motion` 设置：禁用平滑效果，程序化滚动即时完成，同时滚动仍在主线程上运行（[参见"减弱动效"](#减弱动效)）。                                                                                                                                       |
| `smoothWheel`           | `boolean`                  | `true`                                             | 平滑由 `wheel` 事件触发的滚动。                                                                                                                                                                                                                                               |
| `stopInertiaOnNavigate` | `boolean`                  | `false`                                            | 若为 `true`，Lenis 会在点击站内链接时停止惯性滚动。                                                                                                                                                                                                                           |
| `syncTouch`             | `boolean`                  | `false`                                            | 在允许滚动同步的同时模拟触摸设备的滚动（在 iOS<16 上可能不稳定）。                                                                                                                                                                                                          |
| `syncTouchLerp`         | `number`                   | `0.075`                                            | `syncTouch` 惯性阶段所应用的 lerp。                                                                                                                                                                                                                                         |
| `touchInertiaExponent`  | `number`                   | `1.7`                                              | 控制 syncTouch 惯性的强度。                                                                                                                                                                                                                                                  |
| `touchMultiplier`       | `number`                   | `1`                                                | 触摸事件的倍率。                                                                                                                                                                                                                                                              |
| `virtualScroll`         | `function`                 | `undefined`                                        | 在事件被消费之前手动修改它们。若返回 `false`，该滚动将不被平滑处理。示例：`(e) => { e.deltaY /= 2 }`（减慢垂直滚动）或 `({ event }) => !event.shiftKey`（按下 shift 键时阻止平滑滚动）。                                                                                  |
| `wheelMultiplier`       | `number`                   | `1`                                                | 鼠标滚轮事件的倍率。                                                                                                                                                                                                                                                          |
| `wrapper`               | `HTMLElement, Window`      | `window`                                           | 用作滚动容器的元素。                                                                                                                                                                                                                                                          |
<br/>

<!-- `target`：要到达的目标
- `number`：以像素为单位的滚动值
- `string`：CSS 选择器或关键字（`top`、`left`、`start`、`bottom`、`right`、`end`）
- `HTMLElement`：DOM 元素

<br/>

`options`：
- `offset`(`number`)：等同于 [`scroll-padding-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top)
- `lerp`(`number`)：动画插值强度
- `duration`(`number`)：动画时长（单位：秒）
- `easing`(`function`)：动画缓动函数
- `immediate`(`boolean`)：忽略 duration、easing 和 lerp
- `lock`(`boolean`)：是否阻止用户滚动，直到抵达目标位置
- `onComplete`(`function`)：抵达目标位置时调用 -->

## 属性

| 属性                    | 类型              | 说明                                            |
|-------------------------|-------------------|---------------------------------------------------|
| `actualScroll`          | `number`          | 浏览器记录的当前滚动值                            |
| `animatedScroll`        | `number`          | 当前滚动值                                        |
| `className` (getter)    | `string`          | `rootElement` 的 className                         |
| `dimensions`            | `object`          | Dimensions 实例                                    |
| `direction`             | `number`          | `1`：向上滚动，`-1`：向下滚动                      |
| `isHorizontal` (getter) | `boolean`         | 实例是否为水平方向                                 |
| `isScrolling` (getter)  | `boolean, string` | 滚动是否正在被动画化，取值 `smooth`、`native` 或 `false` |
| `isStopped` (getter)    | `boolean`         | 用户是否应被禁止滚动                               |
| `lastVelocity`          | `number`          | 上一次的滚动速度                                   |
| `limit` (getter)        | `number`          | 最大滚动值                                         |
| `options`               | `object`          | 实例选项                                           |
| `prefersReducedMotion` (getter) | `boolean` | 用户是否偏好减弱动效，且 Lenis 正在遵循该偏好      |
| `progress` (getter)     | `number`          | 滚动进度，从 `0` 到 `1`                            |
| `rootElement` (getter)  | `HTMLElement`     | Lenis 实例所挂载的元素                             |
| `scroll` (getter)       | `number`          | 当前滚动值（启用无限滚动时会做相应处理）           |
| `targetScroll`          | `number`          | 目标滚动值                                         |
| `time`                  | `number`          | 自实例创建以来经过的时间                           |
| `velocity`              | `number`          | 当前滚动速度                                       |

<br/>

## 方法

| 方法                        | 说明                                          | 参数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|-----------------------------|-----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `destroy()`                 | 销毁实例并移除所有事件。                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `on(id, function)`          | `id` 可为下列任意[实例事件](#事件)，用于监听。 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `raf(time)`                 | 必须每帧调用，供内部使用。                     | `time`：以毫秒为单位                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `resize()`                  | 计算内部尺寸，当 `autoResize` 为 `false` 时必须使用。 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `scrollTo(target, options)` | 滚动到目标位置。                               | `target`：要到达的目标<ul><li>`number`：以像素为单位的滚动值</li><li>`string`：CSS 选择器或关键字（`top`、`left`、`start`、`bottom`、`right`、`end`）</li><li>`HTMLElement`：DOM 元素</li></ul>`options`<ul><li>`offset`(`number`)：等同于 [`scroll-padding-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top)</li><li>`lerp`(`number`)：动画插值强度</li><li>`duration`(`number`)：动画时长（单位：秒）</li><li>`easing`(`function`)：动画缓动函数</li><li>`immediate`(`boolean`)：忽略 duration、easing 和 lerp</li><li>`lock`(`boolean`)：是否阻止用户滚动，直到抵达目标位置</li><li>`force`(`boolean`)：即使实例已停止也要到达目标</li><li>`onComplete`(`function`)：抵达目标位置时调用</li><li>`userData`(`object`)：该对象会随 `scroll` 事件一并传递</li></ul> |
| `start()`                   | 恢复滚动                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `stop()`                    | 暂停滚动                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             }



## 事件

| 事件             | 回调参数                  |
|------------------|---------------------------|
| `scroll`         | Lenis 实例                |
| `virtual-scroll` | `{deltaX, deltaY, event}` |


<br/>

## 注意事项

### 嵌套滚动

处理嵌套可滚动元素最简单、最可靠的方式是使用 `allowNestedScroll` 选项：

```js
const lenis = new Lenis({
  allowNestedScroll: true,
})
```

它会自动检测嵌套的可滚动元素，并让它们以原生方式滚动。不过这可能带来性能问题，因为 Lenis 需要在每次滚动事件时检查 DOM 树。如果你遇到性能问题，请改用 `data-lenis-prevent`。

#### 使用 HTML 属性

```html
<div data-lenis-prevent>scrollable content</div>
```

[查看示例](https://codepen.io/ClementRoche/pen/PoLdjpw)

| 属性                            | 说明                     |
|---------------------------------|--------------------------|
| `data-lenis-prevent`            | 阻止所有平滑滚动事件     |
| `data-lenis-prevent-wheel`      | 仅阻止滚轮事件           |
| `data-lenis-prevent-touch`      | 仅阻止触摸事件           |
| `data-lenis-prevent-vertical`   | 仅阻止垂直滚动事件       |
| `data-lenis-prevent-horizontal` | 仅阻止水平滚动事件       |

#### 使用 JavaScript

```html
<div id="modal">scrollable content</div>
```

```js
const lenis = new Lenis({
  prevent: (node) => node.id === 'modal',
})
```

[查看示例](https://codepen.io/ClementRoche/pen/emONGYN)



### 锚点链接

默认情况下，Lenis 会在滚动过程中阻止锚点链接生效。若要启用，必须设置 `anchors: true`。

```js
new Lenis({
  anchors: true
})
```

你也可以使用 `scrollTo` 的选项：

```js
new Lenis({
  anchors: {
    offset: 100,
    onComplete: ()=>{
      console.log('scrolled to anchor')
    }
  }
})
```

### 减弱动效

默认情况下，Lenis 会尊重用户的 [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) 设置：当该值为 `reduce` 时，平滑效果被禁用（`lerp` 被强制为 `1`，使滚动与输入设备 1:1 同步，并忽略 `duration`/`easing`），程序化滚动（`scrollTo`、锚点链接）会立即跳到目标位置。Lenis 仍会继续运行，以保证 WebGL/DOM 同步不受影响，并且该偏好会被实时感知，无需刷新页面。你可以读取 `lenis.prefersReducedMotion` 来调整自己的动画。

你也可以选择退出（不推荐）：

```js
const lenis = new Lenis({
  respectReducedMotion: false,
})
```

<br/>

## 局限性

- 不支持 CSS scroll-snap，请改用 [lenis/snap](https://github.com/darkroomengineering/lenis/tree/main/packages/snap/README.md)
- 在 Safari 上被限制为 60fps（[来源](https://bugs.webkit.org/show_bug.cgi?id=173434)），低电量模式下为 30fps
- 在 iframe 之上平滑滚动会失效，因为 iframe 不转发 wheel 事件
- 在 M1 之前的 macOS Safari 上，`position: fixed` 似乎会掉帧（[来源](https://github.com/darkroomengineering/lenis/issues/103)）
- 在 iOS < 16 上启用 `syncTouch` 时，触摸事件可能出现异常行为
- 嵌套滚动容器需要正确配置才能正常工作

<br/>

## 故障排查

- 确保你使用的是最新版 [Lenis](https://www.npmjs.com/package/lenis?activeTab=versions)
- 引入推荐的 CSS
- 如果使用 GSAP ScrollTrigger，请确保正确集成（参见 [GSAP ScrollTrigger 配置](#配置) 一节）
- 在不使用 Lenis 的情况下测试，确认你的元素/页面本身是可滚动的
- 确保使用 `autoRaf: true`，或在你的动画循环中手动调用 `lenis.raf(time)`

<br/>

## 教程

- [用 Lenis 实现无限滚动](https://tympanus.net/Development/ScrollAnimationsGrid/) by [Matt Rothenberg](https://mattrothenberg.com/)
- [2025 年用 Lenis 构建平滑滚动](https://www.edoardolunardi.dev/blog/building-smooth-scroll-in-2025-with-lenis) by [Edoardo Lunardi](https://www.edoardolunardi.dev/)

<br/>

## 插件

- [r3f-scroll-rig](https://github.com/14islands/r3f-scroll-rig) by [14islands](https://14islands.com/)
- [locomotive-scroll](https://github.com/locomotivemtl/locomotive-scroll) by [Locomotive](https://locomotive.ca/)

<br/>

## 许可证

MIT © [darkroom.engineering](https://github.com/darkroomengineering)
