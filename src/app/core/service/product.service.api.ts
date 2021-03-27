import { Observable } from 'rxjs';
import { ProductDetail } from '../model/product-details.model';
import { ProductPaging } from '../model/product-paging.model';
import { Product } from '../model/product.model';

export abstract class ProductServiceApi {
  abstract getLimitTrendingProduct(size: number): Observable<Product[]>;
  abstract getProductDetail(id: number): Observable<ProductDetail>;
  abstract getAllProductWithPaging(
    start: number,
    size: number,
    order: string
  ): Observable<ProductPaging>;
}
