import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: Props) {
  if (!items || items.length === 0) return null

  return (
    <nav
      aria-label='Breadcrumb'
      className={`py-4 text-xs font-medium text-ink/65 ${className}`}
    >
      <ol className='flex items-center flex-wrap gap-1.5'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={`${item.label}-${index}`}
              className='flex items-center gap-1.5'
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className='hover:text-violet transition-colors'
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? 'text-ink font-semibold' : ''}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className='text-ink/30 select-none' aria-hidden='true'>
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
