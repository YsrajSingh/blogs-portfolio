import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import { Geist, Geist_Mono } from 'next/font/google'

// import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
// import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import Script from 'next/script'
import AdsenseScript from '@/components/AdsenseScript'

// const space_grotesk = Space_Grotesk({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-space-grotesk',
// })

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      // className={`${space_grotesk.variable} scroll-smooth`}
      className={`scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/android-chrome-512x512.png`}
        color="#5bbad5"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href={`${basePath}/static/favicons/android-chrome-512x512.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <meta name="msapplication-TileColor" content="#000000" />
      {/* <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" /> */}
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white"> */}
        {/* <ThemeProviders> */}
        <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
        <SectionContainer>
          <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
            <Header />
            <div className="flex min-h-screen flex-col">
              <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
            </div>
          </SearchProvider>
        </SectionContainer>
        <AdsenseScript />
        {/* <ins
          id="dispaly-ads"
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3695234063616330"
          data-ad-slot="6866831648"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins> */}
        <Footer />
        {/* </ThemeProviders> */}
      </body>
    </html>
  )
}
