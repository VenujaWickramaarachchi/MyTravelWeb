import type { Metadata } from 'next'
import { Fraunces, Manrope } from 'next/font/google'

import Script from 'next/script'

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
      <head>
        <Script
          id='google-tag-manager'
          strategy='afterInteractive'
        >
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MZLGSNCC');
      `}
        </Script>
      </head>

      <body className='min-h-full flex flex-col bg-paper text-ink font-sans'>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-MZLGSNCC'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Navbar settings={settings} />
        <div className='flex-1'>{children}</div>
        <Footer settings={settings} />
      </body>
    </html>
  )
}

