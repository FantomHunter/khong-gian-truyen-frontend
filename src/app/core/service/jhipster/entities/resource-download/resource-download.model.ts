import { IDownload } from '../../entities/download/download.model';
import { IProduct } from '../../entities/product/product.model';
import { FormatType } from '../../entities/enumerations/format-type.model';

export interface IResourceDownload {
  id?: number;
  url?: string;
  format?: FormatType | null;
  downloads?: IDownload[] | null;
  product?: IProduct | null;
}

export class ResourceDownload implements IResourceDownload {
  constructor(
    public id?: number,
    public url?: string,
    public format?: FormatType | null,
    public downloads?: IDownload[] | null,
    public product?: IProduct | null
  ) {}
}

export function getResourceDownloadIdentifier(resourceDownload: IResourceDownload): number | undefined {
  return resourceDownload.id;
}
