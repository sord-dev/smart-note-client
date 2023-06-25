import React from 'react'
import styles from './styles.module.css'
import { useTabs } from '@/contexts/TabContext'
import { useFiles } from '@/contexts/FileContext';

export function Layout({ children }) {
    const { tabControls: { openMap, openMarkdown } } = useTabs();
    const { files } = useFiles();

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1>SmartNote</h1>

                <div>
                    <button onClick={() => openMap()}>Map</button>
                </div>
            </header>

            <aside className={styles.sidebar}>
                <h3>Files</h3>
                <div onClick={() => openMarkdown({ title: 'Test File', content: '# Wow' })}>Test File</div>
                <div>
                    {files ? files.map(f => {
                        return <p key={f.id} onClick={() => openMarkdown(f)}>{f.title}</p>
                    }) : null}
                </div>
            </aside>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
                <p>Made with ❤️ by <a href="http://github.com/sord-dev" target="_blank" rel="noopener noreferrer">stef</a></p>
            </footer>
        </div>
    )
}