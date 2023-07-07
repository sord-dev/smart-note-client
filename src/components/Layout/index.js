import React, { useState } from 'react'
import styles from './styles.module.css'

import { useTabs } from '@/contexts/TabContext'
import { useFiles } from '@/contexts/FileContext';

import { FileList, FileSearch } from './subcomponents';

export function Layout({ children }) {
    const { tabControls: { openMap, openMarkdown } } = useTabs();
    const { files, folders, fileControls } = useFiles();
    const { activeTab } = useTabs();

    const [show, setShow] = useState(true);

    return (
        <div className={show ? styles.layout : `${styles.layout} ${styles.full}`}>
            <header className={styles.header}>
                <h1 onClick={() => setShow(prev => !prev)}>SmartNote</h1>

                <nav className={styles.layoutNav}>
                    <button className='btn' onClick={() => openMap()}>Map</button>
                </nav>
            </header>

            <aside className={show ? styles.sidebar : `${styles.sidebar} ${styles.hide}`}>
                <div className={styles.sidebarItems}>
                    <FileList {...{ files, folders, activeTab, openFile: openMarkdown, createFile: fileControls?.createFile, saveFile: fileControls?.saveFile }} />

                    <FileSearch {...{ files, activeTab, openFile: openMarkdown }} />
                </div>
            </aside>

            <main className={styles.main}>{children}</main>
        </div>
    )
}
