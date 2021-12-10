import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResourceDownload } from './../resource-download.model';
import {
  EntityArrayResponseType,
  ResourceDownloadService
} from './resource-download.service';

@Injectable({ providedIn: 'root' })
export class ResourceDownloadExtendsService extends ResourceDownloadService {
  getResourceDownloadByProduct(
    id: number
  ): Observable<EntityArrayResponseType> {
    return this.http.get<IResourceDownload[]>(
      `${this.resourceUrl}/product/${id}`,
      { observe: 'response' }
    );
  }
}
