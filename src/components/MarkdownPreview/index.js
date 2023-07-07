import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTabs } from '../../contexts/TabContext';

import useFileDisplay from '../../hooks/useFileDisplay';

import 'easymde/dist/easymde.min.css'
import styles from './styles.module.css';
import { useFiles } from '../../contexts/FileContext';
import { FileMetaControls, RenderMarkdown } from './subcomponents';
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false }); // don't load NodeGraph component when we're server side 

export const FileDisplay = ({ file }) => {
    const { activeTab, fileStateControls, tabControls } = useTabs();
    const { fileControls, folders } = useFiles();


    const {
        content,
        newContent,
        fileEdited,
        handleDoubleClick,
        handleEditorChange,
        handleFolderChange,
        handleSave
    } = useFileDisplay({ ...file }, activeTab, fileStateControls, fileControls);

    const onSave = async () => {
        handleSave();
        tabControls.openMarkdown(file)
    }

    const handleDeleteFile = async (id) => {
        await fileControls.deleteFile(id);
        tabControls.openMap()
    }


    if (!file) return <h1>No file provided.</h1>;

    const createdAt = new Date(file.createdAt);

    return (
        <div data-testid="markdown-preview" onDoubleClick={handleDoubleClick}>
            <FileMetaControls {...{ createdAt, file, fileStateControls, handleDeleteFile, folders, handleFolderChange }} />

            {activeTab?.data?.editingFile ? (
                <>
                    <SimpleMDE
                        className={styles['markdown-editor']}
                        value={newContent.value}
                        onChange={handleEditorChange}
                    />

                </>
            ) : (
                <RenderMarkdown {...{ content, newContent, fileEdited }} />
            )}
            {fileEdited.value == true && (
                <button className={`${styles['save-button']} btn`} onClick={onSave}>
                    Save
                </button>
            )}
        </div>
    );
};
export default class MarkdownPreview {
    // Markdown tab implementation
    render({ data }) {
        const file = { content: data.content, id: data.id, title: data.title, folder: data?.folder, createdAt: data.createdAt }
        return <FileDisplay file={file} />;
    }
}