import React, { useState } from 'react';
import styles from './styles.module.css'
import useFileSearch from '@/hooks/useFileSearch';
import useFilterByFolders from '@/hooks/useFilterByFolders';

export const NoteControls = ({ activeTab, deleteFile, setEditFile }) => {
    if (activeTab?.type != 'markdown') return;

    return (
        <div className={styles.noteControls}>
            <button className='btn sm' onClick={setEditFile} >Edit Note</button>
            <button className='btn sm' onClick={deleteFile} >Delete Note</button>
        </div>
    )
}

export const FileList = ({ files, folders, activeTab, openFile, createFile, saveFile }) => {
    const { result, handleSelectFolder, selectedFolder } = useFilterByFolders(files)

    return (
        <>
            <h3>Files</h3>
            <button className='btn sm' onClick={createFile}>Create Note</button>
            <div className={styles.folderList}>
                {folders?.map((f, i) => (<FolderTag folder={f} key={f + i} handleSelectFolder={handleSelectFolder} selectedFolder={selectedFolder} />))}
            </div>

            <div className={styles.sidebarList}>
                {files ? result.map(f => {
                    const isActiveLink = activeTab.type == 'markdown' && activeTab.data.id == f.id;
                    return <FileTag key={f.id} isActiveFolder={isActiveLink} file={f} openFile={openFile} saveFile={saveFile} />
                }) : 'No Files'}
            </div>
        </>
    )
}

export const FileSearch = ({ files, activeTab, openFile }) => {
    const [q, setQ] = useState('');
    const { result } = useFileSearch(files, q)

    return (
        <>
            <h3>Search</h3>
            <input type="text" name='search' onChange={e => setQ(e.target.value)} value={q} autoComplete='off' />

            <NavItemList items={result} fallback='Search for a file.' activeTab={activeTab} openFile={openFile} />
        </>
    )
}

const NavItemList = ({ items = [], fallback = 'No Files Provided', activeTab, openFile }) => {
    return (
        <div className={styles.sidebarList}>
            {items.length ? items.map(f => {
                const isActiveLink = activeTab.type == 'markdown' && activeTab.data.id == f.id;
                return <FileTag key={f.id} isActiveLink={isActiveLink} file={f} openFile={openFile} />
            }) : <p>{fallback}</p>}
        </div>
    )
}

const FileTag = ({ isActiveLink, file, openFile, saveFile }) => {
    const [editTitle, setEditTitle] = useState();
    const [title, setTitle] = useState(file.title);

    const handleEdit = () => {
        setEditTitle(prev => !prev)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        await saveFile({ ...file, title }) // change file state and update file
        handleEdit()
    }


    return (
        <>
            {editTitle
                ?
                (
                    <form className={styles['file-edit-title']} onSubmit={handleFormSubmit}>
                        <input type="text" onDoubleClick={handleEdit} value={title} onChange={(e) => setTitle(e.target.value)} />
                    </form>
                )
                :
                (
                    <p
                        onDoubleClick={handleEdit}
                        className={isActiveLink ? `${styles.file} ${styles.active}` : styles.file}
                        key={file.id}
                        onClick={() => openFile(file)}>{title}</p>
                )
            }
        </>
    )
}

const FolderTag = ({ folder, selectedFolder, handleSelectFolder }) => {
    return (
        <p className={selectedFolder == folder ? `${styles.folder} ${styles.active}` : styles.folder} onClick={() => handleSelectFolder(folder)}>{folder}</p>
    )
}