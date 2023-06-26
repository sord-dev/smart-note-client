import React from 'react'
import styles from './styles.module.css'

import { useTabs } from '@/contexts/TabContext'
import { useFiles } from '@/contexts/FileContext';

import { EditNoteButton, FileList } from './subcomponents';

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
                    <FileList {...{ files, activeTab, openFile: openMarkdown, createFile: fileControls?.createFile }} />
                </div>

                <EditNoteButton activeTab={activeTab} onClick={fileStateControls?.setEditFile} />
            </aside>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
                <p>Made with ❤️ by <a href="http://github.com/sord-dev" target="_blank" rel="noopener noreferrer">stef</a></p>
            </footer>
        </div>
    )
}
