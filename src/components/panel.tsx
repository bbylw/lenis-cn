import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * 形状一致性：内容容器统一 12px 圆角，交互控件统一 8px，头像与徽标走全圆。
 * 全站只此一套，不混用。
 */
export function Panel({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('rounded-xl border border-border bg-card', className)} {...props} />
}

export function PanelBody({
  title,
  description,
  children,
  className,
}: {
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <Panel className={cn('p-5', className)}>
      {title ? <h3 className="text-[15px] font-semibold">{title}</h3> : null}
      {description ? (
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </Panel>
  )
}
