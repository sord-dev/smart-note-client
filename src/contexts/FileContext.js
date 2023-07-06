import api from '../utils/api.config.js';
import React, { createContext, useContext, useEffect, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);

    const loadFiles = (files) => {
        const folders = new Set(files.map(f => f?.folder)); // create a unique set of folder names
        setFolders(Array.from(folders).filter(f => f && f)) // set folder state, filtering for undefined and nulls
        setFiles(files)
    }

    const createFile = async () => {
        try {
            const response = await api.post('/notes', { title: 'New Note', content: '# This is a new note\n**Double Click** to edit any note.', folder: '' });

            const file = { id: response.data._id, ...response.data };

            setFiles((prev) => [...prev, file])

            return file;
        } catch (error) {
            console.error(error)
        }
    }

    const saveFile = async (data) => {

        try {
            const response = await api.patch(`/notes/${data.id}`, data);
            const filteredFiles = files.filter(f => f.id !== data.id);

            const file = { id: response.data._id, ...response.data };

            setFiles([...filteredFiles, file]);
        } catch (error) {
            console.error(error.message)
        }

    }

    const deleteFile = async (id) => {
        try {
            await api.delete(`/notes/${id}`);

            const filteredFiles = files.filter(f => f.id !== id);
            setFiles(filteredFiles)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log('file state updated: ', { files, folders })
    }, [files, folders])

    const fileControls = {
        loadFiles,
        createFile,
        saveFile,
        deleteFile
    }

    return (
        <FileContext.Provider value={{ files, folders, fileControls }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFiles = () => useContext(FileContext)