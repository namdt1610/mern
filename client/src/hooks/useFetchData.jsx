import { useState, useEffect } from 'react';

const useFetchData = (url, dispatch, actionType) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
            //     console.log('API Response:', result); // Log the entire API response

                if (response.ok) {
                    if (result.products && result.totalProducts !== undefined) {
                        setData(result.products);
                        setTotal(result.totalProducts);
                        dispatch({ type: actionType, payload: result.products });
                    } else {
                        throw new Error('Invalid API response structure');
                    }
                } else {
                    throw new Error(result.message || 'Failed to fetch data');
                }
            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err); // Log the error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, dispatch, actionType]);

    return { data, total, loading, error };
};

export default useFetchData;