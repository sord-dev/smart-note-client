import React from 'react'
import { Layout, TabGeneratorComponent } from '@/components'
import { useTabs } from '@/contexts/TabContext'

export default function Home() {
    const { activeTab } = useTabs();

    return (
        <Layout>
            <TabGeneratorComponent tabType={activeTab.type} data={activeTab.data} />
        </Layout>
    )
}
