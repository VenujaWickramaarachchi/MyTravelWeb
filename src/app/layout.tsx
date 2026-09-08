import type { Metadata } from 'next'
import { Fraunces, Manrope } from 'next/font/google'

import './globals.css'

import { getSiteSettings } from '@/lib/wordpress'

import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: settings.defaultSeoTitle || 'Sri Lanka Tours & Tailor-Made Holidays | Viora Lanka',

    description: settings.defaultMetaDescription || '',

    icons: settings.favicon
      ? {
          icon: settings.favicon.url,
        }
      : undefined,
  }
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const settings = await getSiteSettings()

  return (
    <html
      lang='en'
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col bg-paper text-ink font-sans'>
        <Navbar settings={settings} />
        <div className='flex-1'>{children}</div>
        <Footer settings={settings} />
      </body>
    </html>
  )
}

