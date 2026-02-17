import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={
        'rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm ' + className
      }
      {...props}
    />
  )
}

type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function CardHeader({ className = '', ...props }: CardHeaderProps) {
  return (
    <div className={'px-4 pt-4 pb-2 flex flex-col gap-1 ' + className} {...props} />
  )
}

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode
}

export function CardTitle({ className = '', ...props }: CardTitleProps) {
  return (
    <h3
      className={'text-sm font-semibold leading-none tracking-tight ' + className}
      {...props}
    />
  )
}

type CardContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function CardContent({ className = '', ...props }: CardContentProps) {
  return <div className={'px-4 pb-4 pt-2 ' + className} {...props} />
}

