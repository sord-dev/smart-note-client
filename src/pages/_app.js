import { TabProvider } from '@/contexts/TabContext'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <TabProvider>
                <Component {...pageProps} />
            </TabProvider>
        </>
    )
}