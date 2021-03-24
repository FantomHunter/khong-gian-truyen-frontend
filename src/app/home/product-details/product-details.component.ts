import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductDetail } from 'src/app/core/model/product-details.model';
import { Comment } from 'src/app/core/model/comment.model';
import { Product } from 'src/app/core/model/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  relatedList$: Observable<Product[]>;
  commentList$: Observable<Comment[]>;
  relatedList: Product[] = [];
  commentList: Comment[] = [];
  currentProductDetails$: Observable<ProductDetail>;
  currentProductDetails: ProductDetail = {
    id: -1,
    name: 'Product Details',
    description: 'This is description',
    author: 'Jackson',
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
    nbComment: 10,
    nbLike: 30,
    nbView: 30,
    publishTime: new Date(),
    categoryList: ['Test', 'Action', 'Fantasy'],
    quality: 'Convert',
    status: 'Complete',
    length: 500,
    rating: 4.5,
  };

  constructor() {
    const defautItem = {
      id: -1,
      name: 'default',
      status: 'comming',
      categoryList: ['Action', 'Movie'],
      nbComment: 30,
      nbView: 300,
      imageUrl: 'https://source.unsplash.com/1600x900/?product',
    };
    const defautComment: Comment = {
      id: -1,
      username: 'commenuser',
      avatarUrl: 'https://source.unsplash.com/1600x900/?product',
      content: 'this is the review content',
      time: new Date(1609834043000),
    };
    for (let i = 0; i < 6; i++) {
      this.relatedList.push(defautItem);
      this.commentList.push(defautComment);
    }
    this.relatedList$ = of(this.relatedList);
    this.commentList$ = of(this.commentList);
    this.currentProductDetails$ = of(this.currentProductDetails).pipe(delay(1000));
  }

  ngOnInit(): void {}
}
