import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductPaging } from 'src/app/core/model/product-paging.model';
import { AllProductReducer } from '../reducer';

export const selectAllProductsState = createFeatureSelector<AllProductReducer.State>(
  AllProductReducer.allProductFeatureKey
);

export const selectAllProducts = createSelector(
  selectAllProductsState,
  AllProductReducer.selectAll
);

export const selectPagingInfo = createSelector(
  selectAllProductsState,
  (state: AllProductReducer.State) => {
    let hasPrevious = state.start >= state.size ? true : false;
    let hasNext = state.start + state.size < state.total ? true : false;
    let page = state.start / state.size + 1;
    const pagingInfo: AllProductPagingInfo = {
      size: state.size,
      start: state.start,
      total: state.total,
      order: state.order,
      page: page,
      hasPrevious: hasPrevious,
      hasNext: hasNext,
    };
    return pagingInfo;
  }
);
export const selectAllProductsWithPaging = createSelector(
  selectAllProducts,
  selectPagingInfo,
  (allProducts, paging): ProductPaging => {
    const result: ProductPaging = {
      currentList: allProducts,
      size: paging.start,
      total: paging.total,
      start: paging.start,
    };
    return result;
  }
);

export interface AllProductPagingInfo {
  size: number;
  start: number;
  total: number;
  order: string;
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
