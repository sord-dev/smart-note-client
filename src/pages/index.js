import React, { useEffect } from 'react'
import { Layout, TabGeneratorComponent } from '@/components'
import { useTabs } from '@/contexts/TabContext'
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

import axios from 'axios'
import useSWR from 'swr'

const fetcher = async (url) => {
    try {
        const response = await axios.get(url, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


const Home = () => {
    const { activeTab } = useTabs();
    const { user } = useAuth();
    const router = useRouter();

    const { data: fetchedNotes, error } = useSWR('http://localhost:3001/notes', fetcher, {
        initialData: [], // Provide initial data from props if available
    });

    useEffect(() => {
        if (!user) router?.push('/authenticate');
        console.log(fetchedNotes);
    }, [fetchedNotes, user, router]);

    if (error) {
        // Handle error state
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedNotes) {
        // Handle loading state
        return <div>Loading...</div>;
    }

    // Render the notes data
    return (
        <Layout>
            <TabGeneratorComponent tabType={activeTab.type} data={activeTab.data} />
        </Layout>
    );
};

export default Home