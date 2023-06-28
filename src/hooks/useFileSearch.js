import { useEffect, useState } from 'react'

function useFileSearch(files, query) {
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (query) {
            const filtered = files.filter(f => f.title.toLowerCase().includes(query.toLowerCase()));
            setResult(filtered)
        } else {
            setResult([])
        }
    }, [query, files])

    return { result }
}

export default useFileSearch