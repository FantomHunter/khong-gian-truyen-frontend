import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
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
  convertToResouceDownload
} from './adapter/product.adapter';
import { CommentExtendsService } from './entities/comment/service/comment.extends.service';
import { ProductExtendsService } from './entities/product/service/product.extends.service';
import { ProductService } from './entities/product/service/product.service';
import { ResourceDownloadExtendsService } from './entities/resource-download/service/resource-download.extends.service';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceJhipster extends ProductServiceApi {
  constructor(
    private productService: ProductService,
    private productExtendsService: ProductExtendsService,
    private commentExtendsService: CommentExtendsService,
    private resourceDownloadExtendsService: ResourceDownloadExtendsService
  ) {
    super();
  }

  getLimitTrendingProduct(size: number): Observable<Product[]> {
    console.log('get limit trending product, size: ', size);
    return this.productService
      .query({
        page: 0,
        size: size,
        sort: ['id,asc'],
      })
      .pipe(
        switchMap((data) => {
          return forkJoin(
            data.body?.map(product => this.getProductComments(9900, product.id ? product.id : 1).pipe(
              map(comments => {
                return Object.assign({}, product, { ...product, comments: comments })
              })
            )
            )
          ).pipe(
            map(productWithCommentList => {
              return _.map(productWithCommentList, convertToProduct);
            })
          );
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
      }),
      withLatestFrom(
        this.resourceDownloadExtendsService
          .getResourceDownloadByProduct(id)
          .pipe(
            map((data) => {
              return _.map(data.body, convertToResouceDownload);
            })
          )
      ),
      withLatestFrom(this.getProductComments(9900, id)),
      map(([[productDetail, resourceDowloadList], comment]) => {
        productDetail.downloadSource = resourceDowloadList;
        productDetail.nbComment = comment.length;
        return productDetail;
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

    return this.productExtendsService.queryProductWithComments({
      page: page,
      size: size,
      sort: [order + ',asc']
    }).pipe(
      map(data => {
        return {
          currentList: _.map(data.body?.products, convertToProduct),
          size: size,
          start: start,
          total: data.body?.totalElements ? data.body.totalElements : 100,
        }
      })
    )
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

    return this.productExtendsService.queryNewCommentedProduct({
      page: 0,
      size: size,
      sort: [],
    }).pipe(
      map(data => _.map(data.body, convertToProduct))
    )
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
        sort: ['id,desc'],
      })
      .pipe(map((data) => _.map(data.body, convertToComment)));
  }

  addCommentToProduct(comment: string, productId: number): Observable<string> {
    // console.log('add new comments for  products with id: ', productId);
    // return of('OK').pipe(delay(2000));
    return this.commentExtendsService.createComment(productId, comment).pipe(
      map((data) => {
        console.log('addCommentToProduct :', data);
        return 'ok';
      })
    );
  }
}
