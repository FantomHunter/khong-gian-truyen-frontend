export interface ProductDetail {
  id: number;
  status: string;
  nbComment: number;
  nbView: number;
  nbLike: number;
  categoryList: string[];
  name: string;
  description: string;
  imageUrl: string;
  publishTime: Date;
  rating: number;
  length: number;
  quality: string;
  author: string;
  downloadSource: DownloadSource[];
}
export interface DownloadSource {
  source: string;
  url: string;
}
