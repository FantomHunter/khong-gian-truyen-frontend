import * as dayjs from 'dayjs';
import { IUser } from '../../entities/user/user.model';
import { IProduct } from '../../entities/product/product.model';

export interface ILike {
  id?: number;
  likeDate?: dayjs.Dayjs | null;
  user?: IUser;
  product?: IProduct | null;
}

export class Like implements ILike {
  constructor(public id?: number, public likeDate?: dayjs.Dayjs | null, public user?: IUser, public product?: IProduct | null) {}
}

export function getLikeIdentifier(like: ILike): number | undefined {
  return like.id;
}
