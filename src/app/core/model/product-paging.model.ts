import { Product } from './product.model';

export interface ProductPaging {
  currentList: Product[];
  size: number;
  start: number;
  total: number;
}
