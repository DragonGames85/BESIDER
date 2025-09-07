import { useEffect } from 'react';

import { useAppDispatch } from '../store/hooks';
import { fetchLatestNews } from '../store/slices/newsSlice';

export const useAutoRefreshLatestNews = (intervalMs: number = 30000) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchLatestNews());
        }, intervalMs);

        return () => clearInterval(interval);
    }, [dispatch, intervalMs]);
};
