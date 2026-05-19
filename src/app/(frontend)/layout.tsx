import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Al Huzaifa Design Studio | Luxury Interior Design Dubai',
  description:
    'Al Huzaifa Design Studio crafts immersive hospitality destinations, bespoke residences, and refined commercial interiors across Dubai and the UAE. Book a free consultation today.',
  keywords: [
    'interior design Dubai',
    'luxury interior design UAE',
    'hospitality interior design',
    'bespoke villa interiors',
    'commercial interior design Dubai',
    'F&B restaurant design',
    'residential interior design Dubai',
    'turnkey interior fit-out',
    'Al Huzaifa Design Studio',
    'design studio Dubai',
    'hotel interior design',
    'luxury apartment interiors',
  ],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Al Huzaifa Design Studio | Luxury Interior Design Dubai',
    description:
      'Immersive hospitality spaces, bespoke residences, and refined commercial interiors — crafted with precision from concept to completion.',
    url: 'https://alhuzaifadesignstudio.com',
    siteName: 'Al Huzaifa Design Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Al Huzaifa Design Studio',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al Huzaifa Design Studio | Luxury Interior Design Dubai',
    description:
      'Immersive hospitality spaces, bespoke residences, and refined commercial interiors — crafted with precision from concept to completion.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
