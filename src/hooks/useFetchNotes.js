import { useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => {
    try {
        const response = await axios.get(url, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const useFetchNotes = (url, fileControls) => {
    const { data: fetchedNotes, error } = useSWR(url, fetcher, {
        initialData: [],
    });

    useEffect(() => {
        if (fetchedNotes) {
            fileControls?.loadFiles(fetchedNotes);
        }
    }, [fetchedNotes, fileControls]);

    return {
        notes: fetchedNotes,
        error,
        isLoading: !fetchedNotes && !error,
    };
};

export default useFetchNotes;
