const { useEffect, useState } = require("react");

const useFileDisplay = (file, activeTab, fileStateControls, fileControls) => {
    const [fileFolder, setFileFolder] = useState(file?.folder);
    const [content, setContent] = useState(file?.content);
    const [newContent, setNewContent] = useState(content);
    const [fileEdited, setFileEdited] = useState(false);

    useEffect(() => { // check for file change and update state
        setContent(file?.content);
    }, [activeTab, file]);

    useEffect(() => {  // check for source file content change and update content
        setNewContent(content);
    }, [content]);

    useEffect(() => {
        console.log('file folder change, ', fileFolder)
    }, [fileFolder])

    useEffect(() => {  // check for user inputed content to change
        if (content !== newContent || fileFolder !== file?.folder) {
            setFileEdited(true);
        }
    }, [newContent, content, fileFolder]);

    const handleDoubleClick = () => {
        fileStateControls.setEditFile();
    };

    const handleEditorChange = (value) => {
        setNewContent(value);
    };

    const handleFolderChange = (folder) => {
        setFileFolder(folder)
    }

    const handleSave = () => {
        fileStateControls.setEditFile();
        if (file?._id) {
            fileControls.saveFile({ ...file, id: file._id, content: newContent, folder: fileFolder });
        } else {
            fileControls.saveFile({ ...file, content: newContent, folder: fileFolder });
        }
    };

    return {
        content: {
            value: content,
            setContent
        },
        newContent: {
            value: newContent,
            setNewContent
        },
        fileEdited: {
            value: fileEdited,
            setFileEdited
        },
        fileFolder: {
            value: fileFolder
        },
        handleDoubleClick,
        handleEditorChange,
        handleFolderChange,
        handleSave
    };
};

export default useFileDisplay;