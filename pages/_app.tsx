import '../styles/globals.css'
import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'mayumi/theme'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
export default MyApp
