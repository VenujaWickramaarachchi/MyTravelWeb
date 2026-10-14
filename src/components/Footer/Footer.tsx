import Link from 'next/link'
import type { SiteSettings } from '@/types/site-settings'
import BrandMark from '@/components/Shared/BrandMark'

interface FooterProps {
  settings?: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-violet-deep text-ivory border-t border-white/10'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8'>
          {/* Brand Col */}
          <div className='lg:col-span-2 space-y-4'>
            <Link href='/' aria-label='Viora Lanka Home'>
              <BrandMark logo={settings?.footerLogo || settings?.siteLogo} light />
            </Link>
            <p className='text-lilac text-sm leading-relaxed max-w-sm pt-2'>
              {settings?.footerDescription ||
                'Discover Sri Lanka through meaningful journeys, unforgettable experiences, and carefully crafted tailor-made travel across the island.'}
            </p>
            {/* Contact details if available */}
            <div className='pt-2 space-y-1.5 text-xs text-lilac/90'>
              {settings?.phone && (
                <p>
                  <span className='text-ivory font-medium'>Phone:</span>{' '}
                  <a href={`tel:${settings.phone}`} className='hover:text-gold transition-colors'>
                    {settings.phone}
                  </a>
                </p>
              )}
              {settings?.email && (
                <p>
                  <span className='text-ivory font-medium'>Email:</span>{' '}
                  <a href={`mailto:${settings.email}`} className='hover:text-gold transition-colors'>
                    {settings.email}
                  </a>
                </p>
              )}
              {settings?.businessAddress && (
                <p className='text-lilac/80 pt-1'>
                  {settings.businessAddress}
                </p>
              )}
            </div>
          </div>

          {/* Explore Col */}
          <div>
            <h3 className='font-serif text-lg font-medium text-ivory mb-4 tracking-wide'>
              Explore
            </h3>
            <ul className='space-y-2.5 text-sm'>
              <li>
                <Link href='/destinations' className='text-lilac hover:text-gold transition-colors'>
                  Destinations
                </Link>
              </li>
              <li>
                <Link href='/tours' className='text-lilac hover:text-gold transition-colors'>
                  Tours
                </Link>
              </li>
              <li>
                <Link href='/experiences' className='text-lilac hover:text-gold transition-colors'>
                  Experiences
                </Link>
              </li>
              <li>
                <Link href='/attractions' className='text-lilac hover:text-gold transition-colors'>
                  Attractions
                </Link>
              </li>
              <li>
                <Link href='/accommodations' className='text-lilac hover:text-gold transition-colors'>
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href='/itineraries' className='text-lilac hover:text-gold transition-colors'>
                  Itineraries
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover Col */}
          <div>
            <h3 className='font-serif text-lg font-medium text-ivory mb-4 tracking-wide'>
              Discover
            </h3>
            <ul className='space-y-2.5 text-sm'>
              <li>
                <Link href='/travel-guides' className='text-lilac hover:text-gold transition-colors'>
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link href='/faqs' className='text-lilac hover:text-gold transition-colors'>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href='/our-story' className='text-lilac hover:text-gold transition-colors'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-lilac hover:text-gold transition-colors'>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='/search' className='text-lilac hover:text-gold transition-colors'>
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Plan Your Trip Col */}
          <div>
            <h3 className='font-serif text-lg font-medium text-ivory mb-4 tracking-wide'>
              Plan Your Trip
            </h3>
            <p className='text-lilac text-sm mb-4 leading-relaxed'>
              Ready to explore Sri Lanka? Start designing your tailor-made holiday.
            </p>
            <Link
              href='/contact'
              className='inline-block px-4 py-2.5 text-sm font-semibold text-ink bg-gold hover:bg-gold-deep rounded transition-colors duration-150'
            >
              Plan Your Trip
            </Link>

            {/* Social Links */}
            {(settings?.facebookUrl || settings?.instagramUrl || settings?.youtubeUrl || settings?.tiktokUrl) && (
              <div className='pt-6'>
                <p className='text-xs uppercase tracking-widest text-lilac/70 mb-2 font-medium'>
                  Follow Us
                </p>
                <div className='flex flex-wrap gap-3 text-xs text-lilac'>
                  {settings.facebookUrl && (
                    <a href={settings.facebookUrl} target='_blank' rel='noopener noreferrer' className='hover:text-gold'>
                      Facebook
                    </a>
                  )}
                  {settings.instagramUrl && (
                    <a href={settings.instagramUrl} target='_blank' rel='noopener noreferrer' className='hover:text-gold'>
                      Instagram
                    </a>
                  )}
                  {settings.youtubeUrl && (
                    <a href={settings.youtubeUrl} target='_blank' rel='noopener noreferrer' className='hover:text-gold'>
                      YouTube
                    </a>
                  )}
                  {settings.tiktokUrl && (
                    <a href={settings.tiktokUrl} target='_blank' rel='noopener noreferrer' className='hover:text-gold'>
                      TikTok
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-lilac/70 gap-4'>
          <p>
            {settings?.copyrightText ||
              `© ${currentYear} Viora Lanka. All rights reserved.`}
          </p>

          <div className='flex flex-wrap gap-6'>
            <Link href='/privacy-policy' className='hover:text-ivory transition-colors'>
              Privacy Policy
            </Link>
            <Link href='/terms-conditions' className='hover:text-ivory transition-colors'>
              Terms & Conditions
            </Link>
            <Link href='/cookie-policy' className='hover:text-ivory transition-colors'>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
