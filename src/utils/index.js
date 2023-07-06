export const formatFile = (file) => {
    return ({ content: file?.content, title: file?.title, id: file?.id || file?._id, createdAt: file?.createdAt, updatedAt: file?.updatedAt, folder: file?.folder })
}