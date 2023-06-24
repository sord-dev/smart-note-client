import React, { createContext, useContext, useEffect, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        console.log('file state updated: ', files)
    }, [files])

    return (
        <FileContext.Provider value={{ files }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFiles = () => useContext(FileContext)