import React, { useState } from 'react';
import styles from './styles.module.css'
import useFileSearch from '@/hooks/useFileSearch';
import useFilterByFolders from '@/hooks/useFilterByFolders';


export const FileList = ({ files, folders, activeTab, openFile, createFile, saveFile }) => {
    const { result, handleSelectFolder, selectedFolder } = useFilterByFolders(files)
    const [isCreating, setIsCreating] = useState(false)

    const handleCreateFile = async () => {
        if (isCreating) return
        setIsCreating(true)
        try {
            const file = await createFile()
            openFile(file)
        } finally {
            setIsCreating(false)
        }
    }

    const fileCount = result?.length || 0
    const totalFiles = files?.length || 0

    return (
        <>
            <div className={styles.sectionHeader}>
                <h3>📁 Files {totalFiles > 0 && `(${totalFiles})`}</h3>
                <button 
                    className={`btn sm ${styles.createButton}`} 
                    onClick={handleCreateFile}
                    disabled={isCreating}
                    title="Create a new note"
                >
                    {isCreating ? '⏳' : '✨'} {isCreating ? 'Creating...' : 'New Note'}
                </button>
            </div>

            {folders?.length > 0 && (
                <div className={styles.folderSection}>
                    <h4 className={styles.folderTitle}>📂 Folders</h4>
                    <div className={styles.folderList}>
                        <FolderTag 
                            folder={null} 
                            label="All Files" 
                            handleSelectFolder={handleSelectFolder} 
                            selectedFolder={selectedFolder}
                            count={totalFiles}
                        />
                        {folders.map((f, i) => (
                            <FolderTag 
                                folder={f} 
                                label={f}
                                key={f + i} 
                                handleSelectFolder={handleSelectFolder} 
                                selectedFolder={selectedFolder}
                                count={files?.filter(file => file.folder === f).length || 0}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.fileSection}>
                <div className={styles.fileListHeader}>
                    <span className={styles.fileCount}>
                        {selectedFolder ? `${fileCount} in "${selectedFolder}"` : `${fileCount} files`}
                    </span>
                    {selectedFolder && (
                        <button 
                            className={styles.clearFilter}
                            onClick={() => handleSelectFolder(null)}
                            title="Show all files"
                        >
                            ✕
                        </button>
                    )}
                </div>
                
                <div className={styles.sidebarList}>
                    {fileCount > 0 ? result.map(f => {
                        const isActiveLink = activeTab.type == 'markdown' && activeTab.data.id == f.id
                        return (
                            <FileTag 
                                key={f.id} 
                                isActiveLink={isActiveLink} 
                                file={f} 
                                openFile={openFile} 
                                saveFile={saveFile} 
                            />
                        )
                    }) : (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}>📄</span>
                            <p>No files found</p>
                            {selectedFolder && <p className={styles.emptyHint}>Try a different folder or create a new note</p>}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export const FileSearch = ({ files, activeTab, openFile }) => {
    const [q, setQ] = useState('')
    const { result } = useFileSearch(files, q)
    const [isFocused, setIsFocused] = useState(false)

    const handleClear = () => {
        setQ('')
    }

    return (
        <div className={styles.searchSection}>
            <div className={styles.sectionHeader}>
                <h3>🔍 Search</h3>
            </div>
            
            <div className={`${styles.searchInputWrapper} ${isFocused ? styles.focused : ''}`}>
                <input 
                    type="text" 
                    name='search' 
                    placeholder="Search notes..." 
                    onChange={e => setQ(e.target.value)} 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={q} 
                    autoComplete='off'
                    className={styles.searchInput}
                />
                {q && (
                    <button 
                        className={styles.clearSearch}
                        onClick={handleClear}
                        title="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            {q && (
                <div className={styles.searchResults}>
                    <p className={styles.searchMeta}>
                        {result.length} result{result.length !== 1 ? 's' : ''} for "{q}"
                    </p>
                    <NavItemList 
                        items={result} 
                        fallback={(
                            <div className={styles.emptyState}>
                                <span className={styles.emptyIcon}>🔍</span>
                                <p>No notes found</p>
                                <p className={styles.emptyHint}>Try different search terms</p>
                            </div>
                        )} 
                        activeTab={activeTab} 
                        openFile={openFile} 
                    />
                </div>
            )}
        </div>
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
    const [editTitle, setEditTitle] = useState(false)
    const [title, setTitle] = useState(file.title)
    const [isSaving, setIsSaving] = useState(false)

    const handleEdit = (e) => {
        e.stopPropagation()
        setEditTitle(prev => !prev)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (title.trim() === '') return
        
        setIsSaving(true)
        try {
            await saveFile({ ...file, title: title.trim() })
            setEditTitle(false)
        } catch (error) {
            console.error('Failed to save file title:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setEditTitle(false)
            setTitle(file.title) // Reset title
        }
    }

    const getFileIcon = () => {
        if (file.folder) return '📁'
        if (file.content?.includes('# ')) return '📝'
        if (file.content?.includes('TODO') || file.content?.includes('- [ ]')) return '✅'
        if (file.content?.includes('```')) return '💻'
        return '📄'
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    return (
        <div className={`${styles.fileItem} ${isActiveLink ? styles.activeFile : ''}`}>
            {editTitle ? (
                <form className={styles.fileEditTitle} onSubmit={handleFormSubmit}>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleFormSubmit}
                        autoFocus
                        disabled={isSaving}
                        className={styles.titleInput}
                        maxLength={100}
                    />
                    {isSaving && <span className={styles.savingIndicator}>💾</span>}
                </form>
            ) : (
                <div 
                    className={styles.fileContent}
                    onClick={() => openFile(file)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openFile(file)}
                >
                    <div className={styles.fileHeader}>
                        <span className={styles.fileIcon}>{getFileIcon()}</span>
                        <span className={styles.fileName}>{title}</span>
                        <button 
                            className={styles.editButton}
                            onClick={handleEdit}
                            title="Rename file"
                            aria-label={`Rename ${title}`}
                        >
                            ✏️
                        </button>
                    </div>
                    
                    {file.folder && (
                        <div className={styles.fileMeta}>
                            <span className={styles.folderBadge}>{file.folder}</span>
                        </div>
                    )}
                    
                    {file.createdAt && (
                        <div className={styles.fileDate}>
                            {formatDate(file.createdAt)}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

const FolderTag = ({ folder, label, selectedFolder, handleSelectFolder, count = 0 }) => {
    const isSelected = selectedFolder === folder
    
    return (
        <button 
            className={`${styles.folder} ${isSelected ? styles.active : ''}`} 
            onClick={() => handleSelectFolder(folder)}
            title={`${label}${count > 0 ? ` (${count} files)` : ''}`}
            aria-pressed={isSelected}
        >
            <span className={styles.folderLabel}>{label}</span>
            {count > 0 && <span className={styles.folderCount}>{count}</span>}
        </button>
    )
}