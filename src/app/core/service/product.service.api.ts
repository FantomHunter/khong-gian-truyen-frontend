import { Observable } from "rxjs";
import { ProductDetail } from '../model/product-details.model';
import { Product } from "../model/product.model";

export abstract class ProductServiceApi {
    abstract getLimitTrendingProduct(size: number): Observable<Product[]>;
    abstract getProductDetail(id: number): Observable<ProductDetail>;
}