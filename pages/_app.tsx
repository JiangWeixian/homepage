import '~/styles/globals.css'
import '~/styles/nprogress.css'
import '~/styles/prose-style.css'
import '~/styles/atropos.css'

import Router from 'next/router'
import Progress from 'nprogress'
import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'mayumi/theme'
import { Analytics } from '@vercel/analytics/react'

Router.events.on('routeChangeStart', () => Progress.start())
Router.events.on('routeChangeComplete', () => Progress.done())
Router.events.on('routeChangeError', () => Progress.done())

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    )
  }
}
export default MyApp
