import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from '../../../core/util/operators';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { createRequestOption } from '../../../core/request/request-util';
import { IRating, getRatingIdentifier } from '../rating.model';

export type EntityResponseType = HttpResponse<IRating>;
export type EntityArrayResponseType = HttpResponse<IRating[]>;

@Injectable({ providedIn: 'root' })
export class RatingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ratings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(rating: IRating): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rating);
    return this.http
      .post<IRating>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rating: IRating): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rating);
    return this.http
      .put<IRating>(`${this.resourceUrl}/${getRatingIdentifier(rating) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(rating: IRating): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rating);
    return this.http
      .patch<IRating>(`${this.resourceUrl}/${getRatingIdentifier(rating) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRating>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRating[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRatingToCollectionIfMissing(ratingCollection: IRating[], ...ratingsToCheck: (IRating | null | undefined)[]): IRating[] {
    const ratings: IRating[] = ratingsToCheck.filter(isPresent);
    if (ratings.length > 0) {
      const ratingCollectionIdentifiers = ratingCollection.map(ratingItem => getRatingIdentifier(ratingItem)!);
      const ratingsToAdd = ratings.filter(ratingItem => {
        const ratingIdentifier = getRatingIdentifier(ratingItem);
        if (ratingIdentifier == null || ratingCollectionIdentifiers.includes(ratingIdentifier)) {
          return false;
        }
        ratingCollectionIdentifiers.push(ratingIdentifier);
        return true;
      });
      return [...ratingsToAdd, ...ratingCollection];
    }
    return ratingCollection;
  }

  protected convertDateFromClient(rating: IRating): IRating {
    return Object.assign({}, rating, {
      ratingDate: rating.ratingDate?.isValid() ? rating.ratingDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.ratingDate = res.body.ratingDate ? dayjs(res.body.ratingDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((rating: IRating) => {
        rating.ratingDate = rating.ratingDate ? dayjs(rating.ratingDate) : undefined;
      });
    }
    return res;
  }
}
