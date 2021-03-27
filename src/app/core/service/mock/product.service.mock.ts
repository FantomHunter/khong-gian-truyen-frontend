import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
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
        id: i + 1,
        name: 'trending defaut ' + i,
      });
    }
    return of(trendingList).pipe(delay(1200));
  }

  constructor() {
    super();
  }
}
