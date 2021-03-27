import { createAction, props } from '@ngrx/store';

export const loadDetailsPages = createAction(
  '[DetailsPage] Load DetailsPages',
  props<{ id: number }>()
);
