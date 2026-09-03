import { useRef, useEffect } from 'react'
import { useLenis } from 'lenis/react'

interface OfficialBannerHudProps {
  className?: string
}

export function OfficialBannerHud({ className = '' }: OfficialBannerHudProps) {
  const velTextRef = useRef<SVGTextElement>(null)
  const posTextRef = useRef<SVGTextElement>(null)
  const stateTextRef = useRef<SVGTextElement>(null)
  const velBarRef = useRef<SVGRectElement>(null)
  const laserRef = useRef<SVGLineElement>(null)
  const crosshairRef = useRef<SVGGElement>(null)

  // 绑定 Lenis 滚动帧，直接操作 SVG 矢量 DOM，零 React 重渲染损耗
  useLenis((lenis) => {
    const vel = lenis.velocity
    const scroll = Math.round(lenis.scroll)
    const isMoving = Math.abs(vel) > 0.05

    if (velTextRef.current) {
      velTextRef.current.textContent = `${vel >= 0 ? '+' : ''}${vel.toFixed(2)} px/f`
    }
    if (posTextRef.current) {
      posTextRef.current.textContent = `${scroll.toString().padStart(4, '0')} px`
    }
    if (stateTextRef.current) {
      stateTextRef.current.textContent = isMoving ? 'INTERPOLATING' : 'SYNCHRONIZED'
      stateTextRef.current.setAttribute('fill', isMoving ? 'var(--color-brand)' : 'currentColor')
    }
    if (velBarRef.current) {
      const ratio = Math.min(Math.abs(vel) / 30, 1)
      velBarRef.current.setAttribute('width', (ratio * 140).toFixed(1))
    }
    if (crosshairRef.current) {
      // 十字准星根据速度轻微偏转与位移
      const nudgeY = Math.max(-12, Math.min(12, vel * 1.5))
      crosshairRef.current.setAttribute('transform', `translate(0, ${nudgeY})`)
    }
  })

  // 扫描线持续在卡匣视窗内上下扫动
  useEffect(() => {
    let frameId: number
    let t = 0
    const scan = () => {
      t += 0.028
      if (laserRef.current) {
        // 卡匣 Y 坐标范围 42 ~ 258 (高度 216)
        const yPos = 42 + (Math.sin(t) * 0.5 + 0.5) * 216
        laserRef.current.setAttribute('y1', yPos.toFixed(1))
        laserRef.current.setAttribute('y2', yPos.toFixed(1))
      }
      frameId = requestAnimationFrame(scan)
    }
    frameId = requestAnimationFrame(scan)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <div
      className={`relative w-full max-w-160 select-none overflow-hidden rounded-2xl border border-border/80 bg-surface/85 backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-brand/5 ${className}`}
    >
      <svg
        viewBox="0 0 640 300"
        className="size-full overflow-visible text-foreground/80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 红色发光滤镜 */}
          <filter id="laser-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 激光渐变 */}
          <linearGradient id="laser-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0" />
            <stop offset="25%" stopColor="var(--color-brand)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--color-brand)" stopOpacity="1" />
            <stop offset="75%" stopColor="var(--color-brand)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
          </linearGradient>

          {/* 卡匣裁剪路径 */}
          <clipPath id="cassette-clip">
            <rect x="28" y="42" width="216" height="216" rx="6" />
          </clipPath>
        </defs>

        {/* ── 1. 外部工程框架底衬与四角机械准星 ── */}
        <rect
          x="12"
          y="12"
          width="616"
          height="276"
          rx="10"
          className="stroke-border/70 fill-surface-raised/40"
          strokeWidth="1"
        />

        {/* 四角技术折角 [ ┌ ┐ └ ┘ ] */}
        <path d="M 12,28 L 12,12 L 28,12" className="stroke-brand" strokeWidth="2" />
        <path d="M 612,12 L 628,12 L 628,28" className="stroke-brand" strokeWidth="2" />
        <path d="M 12,272 L 12,288 L 28,288" className="stroke-brand" strokeWidth="2" />
        <path d="M 612,288 L 628,288 L 628,272" className="stroke-brand" strokeWidth="2" />

        {/* 顶部与底部工业刻度标尺 */}
        {Array.from({ length: 25 }).map((_, i) => (
          <line
            key={`top-tick-${i}`}
            x1={45 + i * 23}
            y1={12}
            x2={45 + i * 23}
            y2={i % 5 === 0 ? 19 : 15}
            className="stroke-border/80"
            strokeWidth="1"
          />
        ))}

        {/* ── 2. 左侧：官方动态卡匣视窗 (Embedded Animated GIF) ── */}
        {/* 卡匣外框沉降区 */}
        <rect
          x="26"
          y="40"
          width="220"
          height="220"
          rx="8"
          className="stroke-border fill-black/60"
          strokeWidth="1.5"
        />

        {/* 嵌入官方动态点阵 GIF */}
        <image
          href="/images/official_cassette_anim.gif"
          x="28"
          y="42"
          width="216"
          height="216"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#cassette-clip)"
        />

        {/* 动态激光扫描线 */}
        <line
          ref={laserRef}
          x1="28"
          y1="42"
          x2="244"
          y2="42"
          stroke="url(#laser-line-grad)"
          strokeWidth="2"
          filter="url(#laser-glow)"
        />

        {/* 卡匣四周微型工程定位点 */}
        <circle cx="28" cy="42" r="2.5" className="fill-brand" />
        <circle cx="244" cy="42" r="2.5" className="fill-brand" />
        <circle cx="28" cy="258" r="2.5" className="fill-brand" />
        <circle cx="244" cy="258" r="2.5" className="fill-brand" />

        {/* 卡匣底部型号字标 */}
        <text
          x="30"
          y="278"
          className="fill-muted-foreground font-mono text-[9px] tracking-[0.15em]"
        >
          REF.MOD // DARKROOM_DITHER_WAVE.01
        </text>

        {/* ── 3. 右侧：瑞士国际主义排版与实时仪表盘 ── */}
        {/* 垂直分割工程线 */}
        <line x1="266" y1="40" x2="266" y2="260" className="stroke-border/60" strokeDasharray="3 3" />

        {/* 官方血统标题与口号 */}
        <g transform="translate(286, 68)">
          <text
            x="0"
            y="0"
            className="fill-brand font-mono text-[10px] font-semibold uppercase tracking-[0.25em]"
          >
            ORIGINAL HERITAGE // 官方核心源语
          </text>
          <text
            x="0"
            y="36"
            className="fill-foreground font-sans text-[32px] font-black tracking-tighter"
            letterSpacing="-0.03em"
          >
            LENIS
          </text>
          <text
            x="114"
            y="36"
            className="fill-muted-foreground font-mono text-[11px] font-normal"
          >
            v1.1.x
          </text>

          {/* 硬核座右铭横条 [:: GET SMOOTH OR DIE TRYING ::] */}
          <rect
            x="0"
            y="48"
            width="250"
            height="22"
            rx="4"
            className="fill-brand-soft/40 stroke-brand-line/60"
            strokeWidth="1"
          />
          <text
            x="12"
            y="63"
            className="fill-brand font-mono text-[10px] font-bold tracking-[0.18em]"
          >
            :: GET SMOOTH OR DIE TRYING ::
          </text>
        </g>

        {/* 实时遥测仪表盘 (Live Telemetry) */}
        <g transform="translate(286, 172)">
          {/* 背景参数板 */}
          <rect
            x="0"
            y="0"
            width="322"
            height="88"
            rx="6"
            className="stroke-border/70 fill-surface-sunken/60"
            strokeWidth="1"
          />

          {/* 参数 1: 实时速度 */}
          <text x="14" y="24" className="fill-muted-foreground font-mono text-[10px] uppercase tracking-wider">
            Velocity
          </text>
          <text
            ref={velTextRef}
            x="14"
            y="44"
            className="fill-foreground font-mono text-[15px] font-semibold tabular-nums"
          >
            +0.00 px/f
          </text>

          {/* 速度能量条 */}
          <rect x="14" y="54" width="140" height="4" rx="2" className="fill-border/60" />
          <rect
            ref={velBarRef}
            x="14"
            y="54"
            width="0"
            height="4"
            rx="2"
            className="fill-brand transition-all duration-75"
          />

          {/* 参数 2: 滚动位置 */}
          <text x="175" y="24" className="fill-muted-foreground font-mono text-[10px] uppercase tracking-wider">
            Scroll Y
          </text>
          <text
            ref={posTextRef}
            x="175"
            y="44"
            className="fill-foreground font-mono text-[15px] font-semibold tabular-nums"
          >
            0000 px
          </text>

          {/* 状态徽标 */}
          <text x="175" y="68" className="fill-muted-foreground font-mono text-[9px] uppercase tracking-wider">
            Engine:
          </text>
          <text
            ref={stateTextRef}
            x="222"
            y="68"
            className="font-mono text-[9px] font-bold tracking-wider"
            fill="currentColor"
          >
            SYNCHRONIZED
          </text>
        </g>

        {/* 动态十字工程准星 (根据滚动微调) */}
        <g ref={crosshairRef} transform="translate(0, 0)">
          <path
            d="M 590,52 L 606,52 M 598,44 L 598,60"
            className="stroke-brand/60"
            strokeWidth="1.5"
          />
          <circle cx="598" cy="52" r="5" className="stroke-brand/40" strokeWidth="1" />
        </g>
      </svg>
    </div>
  )
}
