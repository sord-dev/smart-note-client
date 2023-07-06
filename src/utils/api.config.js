import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://smart-note.onrender.com';

const api = axios.create({
    baseURL,
    withCredentials: true
});

export default api;