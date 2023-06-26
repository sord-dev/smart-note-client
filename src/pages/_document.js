import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon" type="image/x-icon" href="/icon.svg" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}