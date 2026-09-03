import type { HighlighterCore } from 'shiki/core'

export type CodeLang = 'bash' | 'html' | 'css' | 'javascript' | 'tsx'

let promise: Promise<HighlighterCore> | null = null

/**
 * 懒加载高亮器：shiki 体积不小，只有在第一个代码块进入视口后才会拉取。
 * 亮暗双主题一次性产出 CSS 变量，切换主题时无需重新高亮。
 */
function getHighlighter() {
  promise ??= (async () => {
    const [core, engine, bash, html, css, javascript, tsx, light, dark] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('shiki/langs/bash.mjs'),
      import('shiki/langs/html.mjs'),
      import('shiki/langs/css.mjs'),
      import('shiki/langs/javascript.mjs'),
      import('shiki/langs/tsx.mjs'),
      import('shiki/themes/github-light-default.mjs'),
      import('shiki/themes/github-dark-default.mjs'),
    ])

    return core.createHighlighterCore({
      themes: [light.default, dark.default],
      langs: [bash.default, html.default, css.default, javascript.default, tsx.default],
      engine: engine.createJavaScriptRegexEngine({ forgiving: true }),
    })
  })()

  return promise
}

export async function highlight(code: string, lang: CodeLang) {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: 'github-light-default', dark: 'github-dark-default' },
    defaultColor: false,
  })
}
