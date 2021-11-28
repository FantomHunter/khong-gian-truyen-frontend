import * as _ from 'lodash';
import {
  DownloadSource,
  ProductDetail,
} from 'src/app/core/model/product-details.model';
import * as productApp from 'src/app/core/model/product.model';
import { ICategory } from '../entities/category/category.model';
import { IProduct } from '../entities/product/product.model';
import { IResourceDownload } from '../entities/resource-download/resource-download.model';

export function convertToProduct(productDto: IProduct): productApp.Product {
  return {
    id: productDto.id ? productDto.id : -1,
    name: productDto.name ? productDto.name : 'default name',
    status: productDto.status ? productDto.status : 'comming',
    categoryList: _.map(productDto.categories, convertToCategory),
    nbComment: productDto.comments ? productDto.comments.length : 0,
    nbView: 300,
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
  };
}

export function convertToCategory(categoryDto: ICategory): string {
  return categoryDto.name ? categoryDto.name : '';
}

export function convertToProductDetail(productDto: IProduct): ProductDetail {
  return {
    id: productDto.id ? productDto.id : -1,
    name: productDto.name ? productDto.name : 'default name',
    description: productDto.description
      ? productDto.description
      : 'This is description',
    author: productDto.author
      ? productDto.author.name
        ? productDto.author.name
        : 'author'
      : 'author',
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
    nbComment: productDto.comments ? productDto.comments.length : 0,
    nbLike: productDto.likes ? productDto.likes.length : 0,
    nbView: 30,
    publishTime: productDto.publishDate
      ? productDto.publishDate.toDate()
      : new Date(),
    categoryList: _.map(productDto.categories, convertToCategory),
    quality: 'Convert',
    status: productDto.status ? productDto.status : 'comming',
    length: productDto.totalChapter ? productDto.totalChapter : 0,
    rating: 4.5,
    downloadSource: _.map(productDto.resourceDownloads, convertToResouceDownload),
  };
}

export function convertToResouceDownload(
  resourceDownloadDto: IResourceDownload
): DownloadSource {
  return {
    source: resourceDownloadDto.format ? resourceDownloadDto.format : 'prc',
    url: resourceDownloadDto.url
      ? resourceDownloadDto.url
      : 'https://hackerthemes.com/bootstrap-cheatsheet/#text-left',
  };
}
