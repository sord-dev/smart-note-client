import React, { createContext, useContext, useEffect, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);

    const loadFiles = (files) => {
        setFiles(files)
    }

    useEffect(() => {
        console.log('file state updated: ', files)
    }, [files])

    const fileControls = {
        loadFiles
    }

    return (
        <FileContext.Provider value={{ files, fileControls }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFiles = () => useContext(FileContext)