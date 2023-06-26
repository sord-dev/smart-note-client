const { useEffect, useState } = require("react");

const useFileDisplay = (file, activeTab, fileStateControls) => {
    const [content, setContent] = useState(file?.content);
    const [newContent, setNewContent] = useState(content);
    const [fileEdited, setFileEdited] = useState(false);

    useEffect(() => { // check for file change and update content
        setContent(file?.content);
    }, [activeTab, file]);

    useEffect(() => {  // check for content change and update content
        setNewContent(content);
    }, [content]);

    const handleDoubleClick = () => {
        fileStateControls.setEditFile();
    };

    const handleEditorChange = (value) => {
        setNewContent(value);
    };

    const handleSave = () => {
        setFileEdited(true);
        fileStateControls.setEditFile();
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
        handleDoubleClick,
        handleEditorChange,
        handleSave
    };
};

export default useFileDisplay;