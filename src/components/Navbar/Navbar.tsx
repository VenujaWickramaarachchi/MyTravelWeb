'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SiteSettings } from '@/types/site-settings'
import BrandMark from '@/components/Shared/BrandMark'

interface NavbarProps {
  settings?: SiteSettings | null
}

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Tours', href: '/tours' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Attractions', href: '/attractions' },
  { label: 'Travel Guides', href: '/travel-guides' },
  { label: 'Itineraries', href: '/itineraries' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'About', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isTransparent = isHome && !mobileMenuOpen

  return (
    <header
      className={`z-50 transition-colors duration-300 ${
        isTransparent
          ? 'absolute top-0 inset-x-0 bg-transparent border-b border-white/10 text-ivory'
          : 'sticky top-0 bg-paper/95 backdrop-blur-md border-b border-line text-ink'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link
            href='/'
            className='focus:outline-none focus-visible:ring-2 focus-visible:ring-violet'
            aria-label='Viora Lanka Home'
          >
            <BrandMark logo={settings?.siteLogo} light={isTransparent} />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-1 lg:space-x-6'>
            {navigation.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-[14px] font-medium transition-colors duration-150 ${
                    isActive
                      ? isTransparent
                        ? 'text-gold font-semibold border-b-2 border-gold pb-1.5'
                        : 'text-violet font-semibold border-b-2 border-gold pb-1.5'
                      : isTransparent
                        ? 'text-ivory/85 hover:text-ivory'
                        : 'text-ink/80 hover:text-violet'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Actions: Search & Plan Your Trip */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link
              href='/search'
              className={`p-2 transition-colors ${
                isTransparent
                  ? 'text-ivory/80 hover:text-ivory'
                  : 'text-ink/70 hover:text-violet'
              }`}
              aria-label='Search'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </Link>

            <Link
              href='/contact'
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded transition-colors duration-150 shadow-xs ${
                isTransparent
                  ? 'bg-gold hover:bg-gold-deep text-ink font-semibold'
                  : 'text-ivory bg-violet hover:bg-violet-deep border border-violet/20'
              }`}
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='flex items-center space-x-2 md:hidden'>
            <Link
              href='/search'
              className={`p-2 transition-colors ${
                isTransparent
                  ? 'text-ivory/80 hover:text-ivory'
                  : 'text-ink/70 hover:text-violet'
              }`}
              aria-label='Search'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </Link>

            <button
              type='button'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none ${
                isTransparent
                  ? 'text-ivory hover:text-gold'
                  : 'text-ink hover:text-violet'
              }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-paper border-b border-line px-4 pt-2 pb-6 space-y-1 shadow-lg'>
          {navigation.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded text-base font-medium ${isActive
                  ? 'bg-ivory text-violet font-semibold'
                  : 'text-ink hover:bg-ivory'
                  }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className='pt-4 mt-2 border-t border-line space-y-2'>
            <Link
              href='/contact'
              onClick={() => setMobileMenuOpen(false)}
              className='block w-full text-center px-4 py-3 text-sm font-medium text-ivory bg-violet hover:bg-violet-deep rounded'
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
