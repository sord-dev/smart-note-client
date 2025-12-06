import React, { useCallback } from 'react'
import styles from './styles.module.css'

import { useTabs } from '@/contexts/TabContext'
import { useFiles } from '@/contexts/FileContext'

import { FileList, FileSearch } from './subcomponents'

export function Layout({ children }) {
    const { tabControls: { openMap, openMarkdown }, activeTab } = useTabs()
    const { files, folders, fileControls } = useFiles()

    const handleOpenMap = useCallback(() => {
        openMap()
    }, [openMap])

    const handleOpenFile = useCallback((file) => {
        openMarkdown(file)
    }, [openMarkdown])

    return (
        <div className={styles.layout}>
            <header className={styles.header} role="banner">
                <h1 className={styles.title}>
                    <span className={styles.logo}>📝</span>
                    SmartNote
                </h1>

                <nav className={styles.layoutNav} role="navigation" aria-label="Main navigation">
                    <button 
                        className={`btn ${styles.navButton}`} 
                        onClick={handleOpenMap}
                        aria-label="Open mind map view"
                        type="button"
                    >
                        ��️ Map
                    </button>
                </nav>
            </header>

            <aside className={styles.sidebar} role="complementary" aria-label="File browser">
                <div className={styles.sidebarItems}>
                    <section aria-label="File list">
                        <FileList 
                            files={files}
                            folders={folders}
                            activeTab={activeTab}
                            openFile={handleOpenFile}
                            createFile={fileControls?.createFile}
                            saveFile={fileControls?.saveFile}
                        />
                    </section>

                    <section aria-label="File search">
                        <FileSearch 
                            files={files}
                            activeTab={activeTab}
                            openFile={handleOpenFile}
                        />
                    </section>
                </div>
            </aside>

            <main className={styles.main} role="main" id="main-content">
                {children}
            </main>
        </div>
    )
}
