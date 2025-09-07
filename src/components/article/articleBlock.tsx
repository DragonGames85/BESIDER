import { type FC, useEffect } from 'react';

import { useAutoRefreshLatestNews } from '../../hooks/useAutoRefreshLatestNews';
import { useInfiniteScrollRef } from '../../hooks/useInfiniteScrollRef';
import { useLoadMoreNews } from '../../hooks/useLoadMoreNews';
import type { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchNews } from '../../store/slices/newsSlice';
import ArticleList from './articleList';
import Loading from './loading';

const ArticleBlock: FC = () => {
    const dispatch = useAppDispatch();
    const { groupedArticles, loading, error, currentYear, currentMonth, hasMoreData } = useAppSelector(
        (state: RootState) => state.news,
    );

    const loadMoreNews = useLoadMoreNews({ loading, hasMoreData, currentYear, currentMonth });
    const lastElementRef = useInfiniteScrollRef({ loading, hasMoreData, onLoadMore: loadMoreNews });

    useEffect(() => {
        dispatch(fetchNews({ year: 2024, month: 12 }));
    }, [dispatch]);

    useAutoRefreshLatestNews(30000);

    const sortedDates = Object.keys(groupedArticles).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (loading && sortedDates.length === 0) {
        return <Loading />;
    }

    return (
        <main className="pt-20 pb-20">
            {error && <div className="border-l-4 border-red-400 bg-red-50 p-4 text-red-700">{error}</div>}

            <ArticleList
                sortedDates={sortedDates}
                groupedArticles={groupedArticles}
                hasMoreData={hasMoreData}
                endRef={lastElementRef}
            />

            {!hasMoreData && sortedDates.length > 0 && (
                <div className="py-8 text-center text-gray-500">Больше новостей нет</div>
            )}
        </main>
    );
};

export default ArticleBlock;
