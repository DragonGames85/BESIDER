import type { NYTArticle } from '../api/models';

export const getImageUrl = (article: NYTArticle) => {
    if (article.multimedia && article.multimedia.length > 0) {
        const image = article.multimedia.find(img => img.subtype === 'thumbnail');
        if (image) {
            return `https://www.nytimes.com/${image.url}`;
        }
    }
    return null;
};
