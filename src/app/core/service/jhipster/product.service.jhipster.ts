import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Comment } from 'src/app/core/model/comment.model';
import { ProductDetail } from 'src/app/core/model/product-details.model';
import { ProductPaging } from 'src/app/core/model/product-paging.model';
import { Product } from 'src/app/core/model/product.model';
import { TopViewsFilter } from 'src/app/core/model/top-views-filter.enum.model';
import { ProductServiceApi } from '../product.service.api';
import {
  convertToComment,
  convertToProduct,
  convertToProductDetail,
} from './adapter/product.adapter';
import { CommentExtendsService } from './entities/comment/service/comment.extends.service';
import { ProductService } from './entities/product/service/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceJhipster extends ProductServiceApi {
  constructor(
    private productService: ProductService,
    private commentExtendsService: CommentExtendsService
  ) {
    super();
  }

  getLimitTrendingProduct(size: number): Observable<Product[]> {
    console.log('get limit trending product, size: ', size);
    return this.productService
      .query({
        page: 0,
        size: size,
        sort: ['id', 'asc'],
      })
      .pipe(
        map((data) => {
          return _.map(data.body, convertToProduct);
        })
      );
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

    // return of(currentProductDetails).pipe(delay(1200));
    return this.productService.find(id).pipe(
      map((data) => {
        return data.body
          ? convertToProductDetail(data.body)
          : currentProductDetails;
      })
    );
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
    let page = start / size;

    return this.productService
      .query({
        page: page,
        size: size,
        sort: ['id', 'asc'],
      })
      .pipe(
        map((data) => {
          return {
            currentList: _.map(data.body, convertToProduct),
            size: size,
            start: start,
            total: 500,
          };
        })
      );
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
    console.log('get products list which have news comments with size: ', size);

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
    console.log(
      'get comments of products with product id: ',
      productId,
      ', size',
      size
    );
    return this.commentExtendsService
      .queryCommentsByProduct(productId, {
        page: 0,
        size: size,
        sort: ['id', 'asc'],
      })
      .pipe(map((data) => _.map(data.body, convertToComment)));
  }

  addCommentToProduct(comment: string, productId: number): Observable<string> {
    console.log('add new comments for  products with id: ', productId);
    return of('OK').pipe(delay(2000));
  }
}
