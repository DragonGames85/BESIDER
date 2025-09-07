import { type FC } from 'react';

import type { NYTArticle } from '../../api/models';
import ArticleItem from '../article/articleItem';
import Loading from './loading';

interface IArticleList {
    sortedDates: string[];
    groupedArticles: {
        [date: string]: NYTArticle[];
    };
    hasMoreData: boolean;
    endRef?: (node: HTMLDivElement | null) => void;
}

const ArticleList: FC<IArticleList> = ({ groupedArticles, sortedDates, hasMoreData, endRef }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div>
            {sortedDates.map(date => (
                <section key={date} className="mb-8">
                    <h2 className="mb-3 px-4 text-lg font-semibold text-gray-800">News for {formatDate(date)}</h2>
                    <div className="space-y-4">
                        {groupedArticles[date].map((article, i) => (
                            <ArticleItem
                                key={article._id}
                                article={article}
                                isLastElement={groupedArticles[date].length - 1 == i}
                            />
                        ))}
                    </div>
                </section>
            ))}
            {hasMoreData && (
                <div ref={endRef}>
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default ArticleList;
