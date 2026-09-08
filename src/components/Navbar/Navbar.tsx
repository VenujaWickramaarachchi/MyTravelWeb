import Link from 'next/link'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Tours', href: '/tours' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Travel Guides', href: '/travel-guides' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href='/' aria-label='Viora Lanka home'>
          Viora Lanka
        </Link>

        <div>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <Link href='/search'>Search</Link>

          <Link href='/contact'>Plan Your Trip</Link>
        </div>
      </nav>
    </header>
  )
}
