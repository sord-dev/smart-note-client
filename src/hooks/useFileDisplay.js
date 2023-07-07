const { useEffect, useState } = require("react");

const useFileDisplay = (file, activeTab, fileStateControls, fileControls) => {
    const [content, setContent] = useState(file?.content);
    const [fileFolder, setFileFolder] = useState(file?.folder);
    const [newContent, setNewContent] = useState(content);
    const [fileEdited, setFileEdited] = useState(false);

    useEffect(() => { // check for file change and update content
        setContent(file?.content);
        setFileFolder(file?.folder);

        console.log(fileFolder)
    }, [activeTab, file]);

    useEffect(() => {  // check for source file content change and update content
        setNewContent(content);
    }, [content]);

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