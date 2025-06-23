'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cloneElement } from 'react'
import { useTheme } from 'next-themes'


interface ActiveLinkProps {
  href: string
  children: React.ReactElement<{ className?: string }>
  shouldMatchExactHref?: boolean
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  href,
}: Readonly<ActiveLinkProps>) {
  const pathname = usePathname()

  const isExactMatch = pathname === href
  const isStartsWithMatch = pathname?.startsWith(href)

  const isActive = shouldMatchExactHref ? isExactMatch : isStartsWithMatch

  return (
    <Link href={href} legacyBehavior>
      {cloneElement(children, {
        className: `${children.props.className ?? ''} ${isActive ? 'text-primary' : 'text-gray-400'}`
      })}
    </Link>
  )
}