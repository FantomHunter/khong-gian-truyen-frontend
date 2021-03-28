import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductDetail } from '../../model/product-details.model';
import { ProductPaging } from '../../model/product-paging.model';
import { Product } from '../../model/product.model';
import { TopViewsFilter } from '../../model/top-views-filter.enum.model';
import { ProductServiceApi } from '../product.service.api';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceMock extends ProductServiceApi {
  getLimitTrendingProduct(size: number): Observable<Product[]> {
    console.log('get limit trending product, size: ', size);
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
    console.log('get product deail for id: ', id);
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
    console.log('get all product with paging');
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
      total: 50,
    });
  }

  getTopViewsProduct(
    size: number,
    filterType: TopViewsFilter
  ): Observable<Product[]> {
    console.log('get top views product with size: ', size);
    console.log('get top views product with type: ', filterType);
    let sideBarViewList: Product[] = [];

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
      sideBarViewList.push({
        ...defautItem,
        id: i,
        name: 'sidebar view product mock name',
      });
    }
    return of(sideBarViewList);
  }

  getNewCommentProducts(size: number): Observable<Product[]> {
    console.log('get new comments products list with size: ', size);

    let sideBarCommentList: Product[] = [];
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
      sideBarCommentList.push({
        ...defautItem,
        id: i,
        name: 'sidebar comment product mock name',
      });
    }
    return of(sideBarCommentList);
  }

  constructor() {
    super();
  }
}
