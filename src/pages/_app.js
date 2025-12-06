import React from 'react'

import { TabProvider } from '@/contexts/TabContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { FileProvider } from '@/contexts/FileContext'
import { SEOProvider } from '@/contexts/SEOContext'

import '../styles/globals.css'

const providers = [
    SEOProvider,
    AuthProvider,
    FileProvider,
    TabProvider
]

function combineProviders(providers) {
    return ({ children }) => {
        return providers.reduce(
            (acc, Provider) => <Provider>{acc}</Provider>,
            children
        )
    }
}

const AllProviders = combineProviders(providers)

export default function MyApp({ Component, pageProps }) {
    return (
        <AllProviders>
            <Component {...pageProps} />
        </AllProviders>
    )
}
