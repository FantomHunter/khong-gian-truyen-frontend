import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductPaging } from 'src/app/core/model/product-paging.model';
import { Product } from 'src/app/core/model/product.model';
import { TrendingProductReducer } from '../reducer';

export const selectTrendingProductsState = createFeatureSelector<TrendingProductReducer.State>(
  TrendingProductReducer.trendingFeatureKey
);

export const selectAllTrendingProducts = createSelector(
  selectTrendingProductsState,
  TrendingProductReducer.selectAll
);

/********************************************************************************* */
/****RETURN PRODUCTS VIEW MODEL */
/********************************************************************************* */
export interface TrendingProductViewModel {
  products: Product[];
}

export const selectTrendingProductsViewModel = createSelector(
  selectAllTrendingProducts,
  (products: Product[]): TrendingProductViewModel => {
    return {
      products: products,
    };
  }
);
