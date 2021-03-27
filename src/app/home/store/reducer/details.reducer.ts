import { Action, createReducer, on } from '@ngrx/store';
import { ProductDetail } from 'src/app/core/model/product-details.model';
import { Product } from 'src/app/core/model/product.model';
import { DetailsApiActions } from '../action';

export const detailsFeatureKey = 'details';

export interface State {
  productDetails: ProductDetail;
}

export const initialState: State = {
  productDetails: {
    id: -1,
    name: 'Product Details',
    description: 'This is description',
    author: 'Jackson',
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
    nbComment: 10,
    nbLike: 30,
    nbView: 30,
    publishTime: new Date(),
    categoryList: ['Test', 'Action', 'Fantasy'],
    quality: 'Convert',
    status: 'Complete',
    length: 500,
    rating: 4.5,
  },
};

export const reducer = createReducer(
  initialState,
  on(DetailsApiActions.loadDetailsApisSuccess, (state, { productDetail }) => ({
    productDetails: productDetail,
  }))
);
