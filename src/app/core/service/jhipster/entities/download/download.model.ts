import * as dayjs from 'dayjs';
import { IUser } from '../../entities/user/user.model';
import { IResourceDownload } from '../../entities/resource-download/resource-download.model';

export interface IDownload {
  id?: number;
  downloadDate?: dayjs.Dayjs | null;
  user?: IUser;
  resource?: IResourceDownload | null;
}

export class Download implements IDownload {
  constructor(
    public id?: number,
    public downloadDate?: dayjs.Dayjs | null,
    public user?: IUser,
    public resource?: IResourceDownload | null
  ) {}
}

export function getDownloadIdentifier(download: IDownload): number | undefined {
  return download.id;
}
