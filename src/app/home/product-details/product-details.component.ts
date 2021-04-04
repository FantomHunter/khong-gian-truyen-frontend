import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { LoginPageActions } from 'src/app/auth/store/action';
import { AuthenticationStatusSelector } from 'src/app/auth/store/selector';
import { Comment } from 'src/app/core/model/comment.model';
import { ProductDetail } from 'src/app/core/model/product-details.model';
import { Product } from 'src/app/core/model/product.model';
import { DetailsPageActions } from '../store/action';
import { DetailProductSelector } from '../store/selector';

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
    downloadSource: [],
  };

  currentCommentForm = this.formBuilder.group({
    comment: [''],
  });
  isUserLoggedIn$: Observable<boolean>;
  constructor(
    private store: Store,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    const defautItem = {
      id: -1,
      name: 'default',
      status: 'comming',
      categoryList: ['Action', 'Movie'],
      nbComment: 30,
      nbView: 300,
      imageUrl: 'https://source.unsplash.com/1600x900/?product',
    };
    for (let i = 0; i < 6; i++) {
      this.relatedList.push(defautItem);
    }
    this.relatedList$ = of(this.relatedList);
    this.currentProductDetails$ = this.store.select(
      DetailProductSelector.selectDetailsProduct
    );
    this.commentList$ = this.store.select(
      DetailProductSelector.selectCommentsProduct
    );
    this.isUserLoggedIn$ = this.store.select(
      AuthenticationStatusSelector.selectIsLoggedIn
    );
  }

  ngOnInit(): void {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    this.store.dispatch(
      DetailsPageActions.loadDetailsPages({ id: Number(productId) })
    );
    this.store.dispatch(
      DetailsPageActions.loadProductComments({
        size: 5,
        productId: Number(productId),
      })
    );
  }

  onSubmitComment(productId: number): void {
    console.log('on submitComment', this.currentCommentForm.value);
    this.store.dispatch(
      DetailsPageActions.addNewComment({
        comment: this.currentCommentForm.value,
        prodId: productId,
      })
    );
    this.currentCommentForm.reset();
  }
  onRedirectForLogin(event: any): void {
    console.log(' redirect login ', event);
    this.store.dispatch(
      LoginPageActions.loadLoginPages({ redirectUrl: this.router.url })
    );
  }
}
