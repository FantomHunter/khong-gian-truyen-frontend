import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductDetail } from '../../model/product-details.model';
import { ProductPaging } from '../../model/product-paging.model';
import { Product } from '../../model/product.model';
import { ProductServiceApi } from '../product.service.api';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceMock extends ProductServiceApi {
  getLimitTrendingProduct(size: number): Observable<Product[]> {
    let trendingList: Product[] = [];
    const defautItem = {
      id: -1,
      name: 'default',
      status: 'comming',
      categoryList: ['Action', 'Movie'],
      nbComment: 30,
      nbView: 300,
      imageUrl: 'https://source.unsplash.com/1600x900/?product',
    };
    for (let i = 0; i < size; i++) {
      trendingList.push({
        ...defautItem,
        id: i,
        name: 'trending defaut ' + (i + 1),
      });
    }
    return of(trendingList).pipe(delay(1200));
  }

  getProductDetail(id: number): Observable<ProductDetail> {
    if (isNaN(id)) {
      return throwError('id not exist');
    }
    const currentProductDetails: ProductDetail = {
      id: id,
      name: 'Product Details from Mock service',
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
    };

    return of(currentProductDetails).pipe(delay(1200));
  }

  getAllProductWithPaging(
    start: number,
    size: number,
    order: string
  ): Observable<ProductPaging> {
    const defautItem = {
      id: -1,
      name: 'default paging mock',
      status: 'comming',
      categoryList: ['Action', 'Movie'],
      nbComment: 30,
      nbView: 300,
      imageUrl: 'https://source.unsplash.com/1600x900/?product',
    };
    let currentList = [];
    for (let i = start; i < start + size; i++) {
      currentList.push({ ...defautItem, id: i });
    }
    return of({
      currentList: currentList,
      size: size,
      start: start,
      total: 500,
    });
  }

  constructor() {
    super();
  }
}
