export const formatFile = (file) => {
    return ({ content: file?.content, title: file?.title, id: file?.id || file?._id, createdAt: file?.createdAt, updatedAt: file?.updatedAt, folder: file?.folder })
}

export const NotesEndpoint = process.env.NEXT_PUBLIC_API_URL + '/notes';

export const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://smart-note.onrender.com';