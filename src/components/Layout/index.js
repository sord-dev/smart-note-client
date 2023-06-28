import React from 'react'
import styles from './styles.module.css'

import { useTabs } from '@/contexts/TabContext'
import { useFiles } from '@/contexts/FileContext';

import { NoteControls, FileList, FileSearch } from './subcomponents';

export function Layout({ children }) {
    const { tabControls: { openMap, openMarkdown }, fileStateControls } = useTabs();
    const { files, fileControls } = useFiles();
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
                    <FileList {...{ files, activeTab, openFile: openMarkdown, createFile: fileControls?.createFile, saveFile: fileControls?.saveFile }} />

                    <FileSearch {...{ files, activeTab, openFile: openMarkdown }} />
                </div>

                <NoteControls activeTab={activeTab} setEditFile={fileStateControls?.setEditFile} deleteFile={async () => await fileControls?.deleteFile(activeTab.data.id)} />
            </aside>

            <main className={styles.main}>{children}</main>


        </div>
    )
}
