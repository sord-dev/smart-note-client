import React from 'react'
import styles from './styles.module.css'

import { useTabs } from '@/contexts/TabContext'
import { useFiles } from '@/contexts/FileContext';

import { FileList, FileSearch } from './subcomponents';

export function Layout({ children }) {
    const { tabControls: { openMap, openMarkdown } } = useTabs();
    const { files, folders, fileControls } = useFiles();
    const { activeTab } = useTabs();

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1>SmartNote</h1>

                <nav className={styles.layoutNav}>
                    <button className='btn' onClick={() => openMap()}>Map</button>
                </nav>
            </header>

            <aside className={styles.sidebar}>
                <div className={styles.sidebarItems}>
                    <FileList {...{ files, folders, activeTab, openFile: openMarkdown, createFile: fileControls?.createFile, saveFile: fileControls?.saveFile }} />

                    <FileSearch {...{ files, activeTab, openFile: openMarkdown }} />
                </div>


            </aside>

            <main className={styles.main}>{children}</main>


        </div>
    )
}
