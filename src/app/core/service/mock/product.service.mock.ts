import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Comment } from '../../model/comment.model';
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
    console.log('get product detail for id: ', id);
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
      downloadSource: [
        {
          source: 'prc',
          url: 'https://hackerthemes.com/bootstrap-cheatsheet/#text-left',
        },
        {
          source: 'epub',
          url: 'https://hackerthemes.com/bootstrap-cheatsheet/#text-left',
        },
        {
          source: 'pdf',
          url: 'https://hackerthemes.com/bootstrap-cheatsheet/#text-left',
        },
        {
          source: 'mobi',
          url: 'https://hackerthemes.com/bootstrap-cheatsheet/#text-left',
        },
      ],
    };

    return of(currentProductDetails).pipe(delay(1200));
  }

  getAllProductWithPaging(
    start: number,
    size: number,
    order: string
  ): Observable<ProductPaging> {
    console.log(
      'get all product with paging start at: ',
      start,
      ', size: ',
      size,
      ', order by: ',
      order
    );
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
      currentList.push({
        ...defautItem,
        id: i,
        name:
          'default paging mock ' +
          i +
          ', size: ' +
          size +
          ', order by: ' +
          order,
      });
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
        name: 'sidebar view mock filter by ' + TopViewsFilter[filterType],
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

  getProductComments(size: number, productId: number): Observable<Comment[]> {
    const defautComment: Comment = {
      id: -1,
      username: 'commenuser',
      avatarUrl: 'https://source.unsplash.com/1600x900/?product',
      content: 'this is the review content',
      time: new Date(1609834043000),
    };
    let commentList = [];
    for (let i = 0; i < size; i++) {
      commentList.push({ ...defautComment, id: i });
    }
    return of(commentList).pipe(delay(2000));
  }

  constructor() {
    super();
  }
}
