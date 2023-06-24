import React, { createContext, useContext, useEffect, useState } from 'react';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState({ type: 'map', data: '' });

    const openMarkdown = (file) => {
        if (!file.content || !file.title) return openMarkdown({ title: 'Error', content: '# Oops, file not found or is invalid.' });
        if (activeTab.data == file?.content) return;
        setActiveTab({ type: 'markdown', data: { ...file } })
    }

    const openMap = () => {
        if (activeTab.type == 'map') return;
        setActiveTab({ type: 'map', data: '' })
    }

    const tabControls = {
        openMap,
        openMarkdown
    }

    useEffect(() => {
        console.log('active tab: ', activeTab)
    }, [activeTab])

    return (
        <TabContext.Provider value={{ activeTab, tabControls }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTabs = () => useContext(TabContext)