import { Observable } from 'rxjs';
import { Comment } from '../model/comment.model';
import { ProductDetail } from '../model/product-details.model';
import { ProductPaging } from '../model/product-paging.model';
import { Product } from '../model/product.model';
import { TopViewsFilter } from '../model/top-views-filter.enum.model';

export abstract class ProductServiceApi {
  abstract getLimitTrendingProduct(size: number): Observable<Product[]>;
  abstract getProductDetail(id: number): Observable<ProductDetail>;
  abstract getAllProductWithPaging(
    start: number,
    size: number,
    order: string
  ): Observable<ProductPaging>;
  abstract getTopViewsProduct(
    size: number,
    filterType: TopViewsFilter
  ): Observable<Product[]>;
  abstract getNewCommentProducts(size: number): Observable<Product[]>;
  abstract getProductComments(
    size: number,
    productId: number
  ): Observable<Comment[]>;
  abstract addCommentToProduct(
    comment: string,
    productId: number
  ): Observable<string>;
}
