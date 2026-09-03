import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = path.resolve(import.meta.dirname, '../public/images')
const OUT = path.join(SRC, 'optimized')

const TARGETS = [
  { match: /long_exposure/, name: 'sync-motion', widths: [720, 1080, 1440] },
  { match: /wide_cinematic/, name: 'manifesto', widths: [960, 1440, 1920] },
]

await mkdir(OUT, { recursive: true })
const files = await readdir(SRC)

for (const target of TARGETS) {
  const source = files.find((f) => target.match.test(f))
  if (!source) {
    console.warn(`[images] 未找到匹配 ${target.name} 的源图，跳过`)
    continue
  }
  const input = path.join(SRC, source)
  for (const width of target.widths) {
    const base = await sharp(input).resize({ width, withoutEnlargement: true })
    await writeFile(path.join(OUT, `${target.name}-${width}.webp`), await base.clone().webp({ quality: 78 }).toBuffer())
    if (width === target.widths.at(-1)) {
      await writeFile(path.join(OUT, `${target.name}-${width}.jpg`), await base.clone().jpeg({ quality: 82, mozjpeg: true }).toBuffer())
    }
  }
  console.log(`[images] ${target.name} <- ${source}`)
}

console.log('[images] 完成')
