import { useState } from 'react'
import { Heart } from '@phosphor-icons/react'
import { SPONSOR_LOGOS, SPONSOR_PEOPLE } from '@/lib/content'
import { Reveal } from '@/components/reveal'

function SponsorAvatar({ login, name }: { login: string; name: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        title={name}
        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-raised text-[13px] font-medium text-muted-foreground"
      >
        {name.slice(0, 1)}
      </span>
    )
  }

  return (
    <img
      src={`https://github.com/${login}.png?size=80`}
      alt={name}
      title={name}
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="size-10 rounded-full border border-border object-cover"
    />
  )
}

function SponsorLogo({ name, href, logo }: { name: string; href: string; logo: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="mr-2 flex h-10 items-center rounded-lg px-1 opacity-70 transition-opacity hover:opacity-100"
    >
      <img
        src={logo}
        alt={name}
        height={40}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-7 w-auto dark:invert"
      />
    </a>
  )
}

export function Sponsors() {
  return (
    <section className="border-y border-border bg-surface-sunken/60">
      <Reveal className="mx-auto max-w-300 px-5 py-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          <div className="shrink-0">
            <p className="text-sm font-medium">赞助者</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              他们让 Lenis 保持开源且无需付费。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {SPONSOR_LOGOS.map((sponsor) => (
              <SponsorLogo key={sponsor.name} {...sponsor} />
            ))}
            {SPONSOR_PEOPLE.map((person) => (
              <SponsorAvatar key={person.login} {...person} />
            ))}
          </div>

          <a
            href="https://github.com/sponsors/darkroomengineering"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-border px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-brand-line hover:bg-brand-soft hover:text-brand active:translate-y-px lg:ml-auto"
          >
            <Heart size={14} />
            成为赞助者
          </a>
        </div>
      </Reveal>
    </section>
  )
}
