import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);

    const loadFiles = (files) => {
        setFiles(prev => {
            const newFile = prev.find(f => f.title === 'New Note');

            if (newFile) { // if a new file is present, allow it to stay on update
                return [...files, newFile]
            } else { // else set files to updated state
                return files
            }
        })
    }

    const createFile = () => {
        setFiles((prev) => [...prev, { id: `New Note ${files.length}`, title: 'New Note', content: '# This is a new note\n**Double Click** to edit any note.' }])
    }

    const saveFileToAPI = async (data) => {
        try {
            const response = await axios.post('http://localhost:3001/notes', data, { withCredentials: true });

            setFiles(prev => [...prev, response.data]);
        } catch (error) {
            console.error(error.message)
        }

    }

    useEffect(() => {
        console.log('file state updated: ', files)
    }, [files])

    const fileControls = {
        loadFiles,
        createFile,
        saveFileToAPI
    }

    return (
        <FileContext.Provider value={{ files, fileControls }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFiles = () => useContext(FileContext)