import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../product.model";
import { ProductService } from "./product.service";
import { createRequestOption } from '../../../core/request/request-util';
import { map } from "rxjs/operators";

export type EntityResponseType = HttpResponse<IProduct>;
export type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductExtendsService extends ProductService {
  queryNewCommentedProduct(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProduct[]>(`${this.resourceUrl}/new-comment`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

}
