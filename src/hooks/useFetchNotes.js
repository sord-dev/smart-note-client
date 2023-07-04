import { useEffect } from 'react';
import useSWR from 'swr';
import api from '../utils/api.config';

const fetcher = async (url) => {
    try {
        const response = await api.get(url);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedNotes]);

    return {
        notes: fetchedNotes,
        error,
        isLoading: !fetchedNotes && !error,
    };
};

export default useFetchNotes;
