import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from 'mayumi/theme'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
