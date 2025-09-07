import type { NYTArticle } from '../api/models';

export const groupArticlesByDate = (articles: NYTArticle[]) => {
    const grouped: { [date: string]: NYTArticle[] } = {};

    articles.forEach(article => {
        const date = new Date(article.pub_date).toDateString();
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(article);
    });

    Object.keys(grouped).forEach(date => {
        grouped[date].sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());
    });

    return grouped;
};
