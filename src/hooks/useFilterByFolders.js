import React, { useEffect, useState } from 'react'

function useFilterByFolders(files) {
    const [result, setResult] = useState(files);
    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleSelectFolder = (folder) => {
        if (selectedFolder == folder) return setSelectedFolder(null);
        setSelectedFolder(folder)
    }

    useEffect(() => {
        if (selectedFolder == null) return setResult(files);
        const filtered = files.filter(f => f?.folder == selectedFolder);
        setResult(filtered)

    }, [files, selectedFolder])


    return { result, selectedFolder, handleSelectFolder }
}

export default useFilterByFolders