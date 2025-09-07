import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AXIOS_CLIENT } from '../../api/api';
import type { NYTArticle } from '../../api/models';
import { groupArticlesByDate } from '../../utils/groupArticlesByDate';

interface NewsState {
    articles: NYTArticle[];
    groupedArticles: { [date: string]: NYTArticle[] };
    loading: boolean;
    error: string | null;
    lastFetchTime: number | null;
    currentYear: number;
    currentMonth: number;
    hasMoreData: boolean;
}

const initialState: NewsState = {
    articles: [],
    groupedArticles: {},
    loading: false,
    error: null,
    lastFetchTime: null,
    currentYear: 2024,
    currentMonth: 12,
    hasMoreData: true,
};

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async ({ year, month }: { year: number; month: number }) => {
        try {
            const response = await AXIOS_CLIENT.get(`/archive/v1/${year}/${month}.json`);
            return response.data?.response?.docs || [];
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 403) {
                    return [];
                }
            }
            throw error;
        }
    },
);

export const fetchLatestNews = createAsyncThunk('news/fetchLatestNews', async () => {
    const now = new Date();
    try {
        const response = await AXIOS_CLIENT.get(`/archive/v1/${now.getFullYear()}/${now.getMonth() + 1}.json`);
        return response.data?.response?.docs || [];
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { status?: number } };
            if (axiosError.response?.status === 403) {
                return [];
            }
        }
        throw error;
    }
});

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearError: state => {
            state.error = null;
        },
        setCurrentDate: (state, action: PayloadAction<{ year: number; month: number }>) => {
            state.currentYear = action.payload.year;
            state.currentMonth = action.payload.month;
        },
        resetNews: state => {
            state.articles = [];
            state.groupedArticles = {};
            state.currentYear = 2024;
            state.currentMonth = 12;
            state.hasMoreData = true;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchNews.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                const newArticles = action.payload;

                const existingIds = new Set(state.articles.map(article => article._id));
                const uniqueNewArticles = newArticles.filter((article: NYTArticle) => !existingIds.has(article._id));

                if (uniqueNewArticles.length > 0) {
                    state.articles = [...state.articles, ...uniqueNewArticles];
                    state.groupedArticles = groupArticlesByDate(state.articles);
                }

                state.lastFetchTime = Date.now();

                const { year: fetchedYear, month: fetchedMonth } = action.meta.arg as { year: number; month: number };
                state.currentYear = fetchedYear;
                state.currentMonth = fetchedMonth;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить новости';
            })
            .addCase(fetchLatestNews.fulfilled, (state, action) => {
                const newArticles = action.payload;
                const now = new Date();
                const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

                const recentArticles = newArticles.filter((article: NYTArticle) => {
                    const articleDate = new Date(article.pub_date);
                    return articleDate > oneHourAgo;
                });

                if (recentArticles.length > 0) {
                    const existingIds = new Set(state.articles.map(article => article._id));
                    const uniqueNewArticles = recentArticles.filter(
                        (article: NYTArticle) => !existingIds.has(article._id),
                    );

                    if (uniqueNewArticles.length > 0) {
                        state.articles = [...uniqueNewArticles, ...state.articles];
                        state.groupedArticles = groupArticlesByDate(state.articles);
                    }
                }
            });
    },
});

export const { clearError, setCurrentDate, resetNews } = newsSlice.actions;
export default newsSlice.reducer;
