import axios from 'axios';
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
            const response = await axios.post('http://localhost:3001/notes', { title: 'New Note', content: '# This is a new note\n**Double Click** to edit any note.', folder: 'none' }, { withCredentials: true });

            setFiles((prev) => [...prev, { id: response.data._id, ...response.data }])
        } catch (error) {
            console.error(error)
        }
    }

    const saveFile = async (data) => {
        try {
            const response = await axios.patch(`http://localhost:3001/notes/${data.id}`, data, { withCredentials: true });
            const filteredFiles = files.filter(f => f.id !== data.id);

            setFiles([...filteredFiles, response.data]);
        } catch (error) {
            console.error(error.message)
        }

    }

    const deleteFile = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/notes/${id}`, { withCredentials: true });

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