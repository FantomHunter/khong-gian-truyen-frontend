import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRequestOption } from '../../../core/request/request-util';
import { IComment } from '../comment.model';
import { CommentService } from './comment.service';

export type EntityResponseType = HttpResponse<IComment>;
export type EntityArrayResponseType = HttpResponse<IComment[]>;

@Injectable({ providedIn: 'root' })
export class CommentExtendsService extends CommentService {
  queryCommentsByProduct(
    id: number,
    req?: any
  ): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IComment[]>(`${this.resourceUrl}/product/${id}`, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }
}
