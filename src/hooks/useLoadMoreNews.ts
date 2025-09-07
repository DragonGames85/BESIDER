import { useCallback } from 'react';

import { useAppDispatch } from '../store/hooks';
import { fetchNews } from '../store/slices/newsSlice';

interface UseLoadMoreNewsArgs {
    loading: boolean;
    hasMoreData: boolean;
    currentYear: number;
    currentMonth: number;
}

export const useLoadMoreNews = ({ loading, hasMoreData, currentYear, currentMonth }: UseLoadMoreNewsArgs) => {
    const dispatch = useAppDispatch();

    const loadMoreNews = useCallback(() => {
        if (!loading && hasMoreData) {
            let newYear = currentYear;
            let newMonth = currentMonth - 1;

            if (newMonth < 1) {
                newMonth = 12;
                newYear -= 1;
            }

            dispatch(fetchNews({ year: newYear, month: newMonth }));
        }
    }, [dispatch, loading, hasMoreData, currentYear, currentMonth]);

    return loadMoreNews;
};
