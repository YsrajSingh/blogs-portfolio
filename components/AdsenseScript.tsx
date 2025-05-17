'use client'

import Script from 'next/script'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdsenseScript() {
  return (
    <Script
      id="adsbygoogle"
      strategy="afterInteractive"
      onLoad={() => {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }}
    />
  )
}
