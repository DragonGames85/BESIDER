import { useCallback, useRef } from 'react';

export const useInfiniteScrollRef = (options: { loading: boolean; hasMoreData: boolean; onLoadMore: () => void }) => {
    const { loading, hasMoreData, onLoadMore } = options;
    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMoreData) {
                    onLoadMore();
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [loading, hasMoreData, onLoadMore],
    );

    return lastElementRef;
};
