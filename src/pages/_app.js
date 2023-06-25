import React from 'react'

import { TabProvider } from '@/contexts/TabContext'
import { AuthProvider } from '@/contexts/AuthContext'

import '../styles/globals.css'
import { FileProvider } from '@/contexts/FileContext'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <FileProvider>
                    <TabProvider>
                        <Component {...pageProps} />
                    </TabProvider>
                </FileProvider>
            </AuthProvider>
        </>
    )
}