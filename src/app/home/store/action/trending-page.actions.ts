import { createAction, props } from '@ngrx/store';

export const loadTrendingPages = createAction(
  '[TrendingPage] Load TrendingPages'
);

export const showTrendingDetails = createAction(
  '[TrendingPage] Show Trending Details',
  props<{ id: number }>()
);

export const showAllTrending = createAction('[TrendingPage] Show All Trending');
