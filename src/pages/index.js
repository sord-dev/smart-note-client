/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import { Layout, TabGeneratorComponent } from '@/components'

import { useTabs } from '@/contexts/TabContext'
import { useFiles } from '@/contexts/FileContext'

import { useRouter } from 'next/router'
import Head from 'next/head'

import useFetchNotes from '@/hooks/useFetchNotes'
import { useSEOConfig } from '@/contexts/SEOContext'

const Home = () => {
    const { activeTab } = useTabs();
    const { fileControls } = useFiles();
    const router = useRouter();

    const { SEOConfig } = useSEOConfig()

    const { error, isLoading } = useFetchNotes('http://localhost:3001/notes', fileControls);

    if (isLoading) {
        // Handle loading state
        return <div>Loading...</div>;
    }

    if (error) {
        console.log('error, you\'ve been redirected: ', error)
        router.push('/authenticate')
    }

    // Render the notes data
    return (
        <>
            <Head>
                <title>{SEOConfig.title}</title>
            </Head>
            <Layout>
                <TabGeneratorComponent tabType={activeTab.type} data={activeTab.data} />
            </Layout>
        </>
    );
};

export default Home