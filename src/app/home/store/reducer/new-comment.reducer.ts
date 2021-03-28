import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/core/model/product.model';
import { NewCommentsActions } from '../action';

export const newCommentFeatureKey = 'newComment';

export interface State extends EntityState<Product> {}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(NewCommentsActions.loadNewCommentsSuccess, (state, { products }) =>
    adapter.setAll(products, state)
  ),
  on(NewCommentsActions.loadNewCommentsFailure, (state, action) => initialState)
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
