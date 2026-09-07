import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div>
        <div>
          <Link href='/'>Viora Lanka</Link>

          <p>
            Discover Sri Lanka through meaningful journeys, unforgettable
            experiences, and carefully crafted travel.
          </p>
        </div>

        <div>
          <h2>Explore</h2>

          <Link href='/destinations'>Destinations</Link>
          <Link href='/tours'>Tours</Link>
          <Link href='/experiences'>Experiences</Link>
          <Link href='/attractions'>Attractions</Link>
          <Link href='/accommodations'>Accommodations</Link>
          <Link href='/itineraries'>Itineraries</Link>
        </div>

        <div>
          <h2>Discover</h2>

          <Link href='/travel-guides'>Travel Guides</Link>
          <Link href='/faqs'>FAQs</Link>
          <Link href='/about'>About Us</Link>
          <Link href='/contact'>Contact</Link>
        </div>

        <div>
          <h2>Plan Your Trip</h2>

          <p>Ready to explore Sri Lanka?</p>

          <Link href='/contact'>Plan Your Trip</Link>
        </div>
      </div>

      <div>
        <p>© {new Date().getFullYear()} Viora Lanka. All rights reserved.</p>

        <div>
          <Link href='/privacy-policy'>Privacy Policy</Link>
          <Link href='/terms-and-conditions'>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  )
}
