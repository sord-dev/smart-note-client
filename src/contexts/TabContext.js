import React, { createContext, useContext, useEffect, useState } from 'react';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState({ type: 'map', data: '' });
    const [processList, setProcessList] = useState([]);

    const addProcess = (proc) => {
        if (processList.some(p => p.data.id == proc.data.id)) return;
        setProcessList(prev => ([...prev, proc]))
    }

    const openMarkdown = (file) => {
        if (!file.content || !file.title) return openMarkdown({ title: 'Error', content: '# Oops, file not found or is invalid.' });
        if (activeTab.data == file?.content) return;

        const process = { type: 'markdown', data: { content: file.content, title: file.title, id: file.id, createdAt: file.createdAt, updatedAt: file.updatedAt } }
        setActiveTab(process)
        addProcess(process)
    }

    const setEditFile = () => {
        if (activeTab.type !== 'markdown') return;
        const newEditState = !activeTab.data.editingFile;
        setActiveTab(prev => ({ ...prev, data: { ...prev.data, editingFile: newEditState } }))
    }

    const openMap = () => {
        if (activeTab.type == 'map') return;
        const process = { type: 'map', data: '' }
        setActiveTab(process)
        addProcess(process)
    }

    const tabControls = {
        openMap,
        openMarkdown
    }

    const fileStateControls = {
        setEditFile
    }

    useEffect(() => {
        console.log('active tab: ', activeTab)
    }, [activeTab])

    useEffect(() => {
        console.log('process list update: ', processList)
    }, [processList])

    return (
        <TabContext.Provider value={{ activeTab, processList, tabControls, fileStateControls }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTabs = () => useContext(TabContext)