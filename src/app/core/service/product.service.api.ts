import { Observable } from "rxjs";
import { Product } from "../model/product.model";

export abstract class ProductServiceApi {
    abstract getLimitTrendingProduct(size: number): Observable<Product[]>;
}