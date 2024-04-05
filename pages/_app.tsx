import '~/styles/globals.css'
import '~/styles/nprogress.css'
import '~/styles/prose-style.css'
import '~/styles/atropos.css'

import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'mayumi/theme'
import App from 'next/app'
import Router from 'next/router'
import Progress from 'nprogress'

import { ViewTransition } from '~/components/ViewTransition'

Router.events.on('routeChangeStart', () => Progress.start())
Router.events.on('routeChangeComplete', () => Progress.done())
Router.events.on('routeChangeError', () => Progress.done())

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider>
        <ViewTransition>
          <Component {...pageProps} />
        </ViewTransition>
        <Analytics />
      </ThemeProvider>
    )
  }
}
export default MyApp
