import type { FC } from 'react';

import type { NYTArticle } from '../../api/models';
import { formatArticleDate } from '../../utils/formatNewsDate';
import { getImageUrl } from '../../utils/getImageUrl';

interface ArticleItemProps {
    article: NYTArticle;
    isLastElement: boolean;
}

const ArticleItem: FC<ArticleItemProps> = ({ article, isLastElement }) => {
    const articleDate = formatArticleDate(article.pub_date);
    const imageUrl = getImageUrl(article);

    const handleClick = () => {
        window.open(article.web_url, '_blank');
    };

    const borderStyle = isLastElement ? '' : 'border-b border-gray-200';

    return (
        <article
            className={`mx-4 flex items-start gap-3 pb-4 ${borderStyle} cursor-pointer transition-colors active:bg-gray-50`}
            onClick={handleClick}
        >
            {imageUrl && (
                <figure className="mt-7 flex-shrink-0">
                    <img src={imageUrl} alt={articleDate} className="h-20 w-20 object-cover" />
                </figure>
            )}
            <div className="min-w-0 flex-1">
                <span className="mb-2 block text-sm font-extrabold text-blue-600">
                    {article.source || 'New York Times'}
                </span>
                <h3 className="mb-2 text-base leading-tight font-medium text-gray-900">{article.abstract}</h3>
                <time dateTime={article.pub_date} className="text-sm text-gray-500">
                    {articleDate}
                </time>
            </div>
        </article>
    );
};

export default ArticleItem;
