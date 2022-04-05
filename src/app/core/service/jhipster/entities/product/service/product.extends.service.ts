import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as dayjs from 'dayjs';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { createRequestOption } from '../../../core/request/request-util';
import { IProduct } from "../product.model";
import { ProductService } from "./product.service";

export type EntityResponseType = HttpResponse<IProduct>;
export type EntityArrayResponseType = HttpResponse<IProduct[]>;
interface ProductPaging {
  products: IProduct[];
  totalElements: number;
  totalPage: number;
}

export type EntityPagingResponseType = HttpResponse<ProductPaging>;

@Injectable({ providedIn: 'root' })
export class ProductExtendsService extends ProductService {
  queryNewCommentedProduct(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProduct[]>(`${this.resourceUrl}/new-comment`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryProductWithComments(req?: any): Observable<EntityPagingResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ProductPaging>(`${this.resourceUrl}/comments`, { params: options, observe: 'response' })
      .pipe(map((res: EntityPagingResponseType) => this.convertDateFromPageing(res)));
  }

  convertDateFromPageing(res: EntityPagingResponseType): EntityPagingResponseType {
    if (res.body?.products) {
      res.body.products.forEach((product: IProduct) => {
        product.publishDate = product.publishDate ? dayjs(product.publishDate) : undefined;
      });
    }
    return res;
  }
}
