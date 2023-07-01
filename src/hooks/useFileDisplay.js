const { useEffect, useState } = require("react");

const useFileDisplay = (file, activeTab, fileStateControls, fileControls) => {
    const [content, setContent] = useState(file?.content);
    const [newContent, setNewContent] = useState(content);
    const [fileEdited, setFileEdited] = useState(false);

    useEffect(() => { // check for file change and update content
        setContent(file?.content);
    }, [activeTab, file]);

    useEffect(() => {  // check for source file content change and update content
        setNewContent(content);
    }, [content]);

    useEffect(() => {  // check for user inputed content to change
        if (content !== newContent) {
            setFileEdited(true);
        } else setFileEdited(false)
    }, [newContent, content]);

    const handleDoubleClick = () => {
        fileStateControls.setEditFile();
    };

    const handleEditorChange = (value) => {
        setNewContent(value);
    };

    const handleSave = () => {
        fileStateControls.setEditFile();
        if (file?._id) {
            fileControls.saveFile({ ...file, id: file._id, content: newContent });
        } else {
            fileControls.saveFile({ ...file, content: newContent });
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
        handleDoubleClick,
        handleEditorChange,
        handleSave
    };
};

export default useFileDisplay;