'use client'

import Script from 'next/script'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdsenseScript() {
  return (
    <>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3695234063616330"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onLoad={() => {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        }}
      />
    </>
  )
}
