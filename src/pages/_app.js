import React from 'react'

import { TabProvider } from '@/contexts/TabContext'
import { AuthProvider } from '@/contexts/AuthContext'

import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <TabProvider>
                    <Component {...pageProps} />
                </TabProvider>
            </AuthProvider>
        </>
    )
}