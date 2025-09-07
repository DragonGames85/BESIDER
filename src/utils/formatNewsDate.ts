export const formatArticleDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};
