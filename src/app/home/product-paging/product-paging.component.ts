import { Observable, of } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'src/app/core/model/product.model';
import { ProductPaging } from 'src/app/core/model/product-paging.model';
import { select, Store } from '@ngrx/store';
import {
  TrendingProductSelector,
  AllProductsSelector,
} from '../store/selector';
import { AllProductsApiActions, TrendingApiActions } from '../store/action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-paging',
  templateUrl: './product-paging.component.html',
  styleUrls: ['./product-paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPagingComponent implements OnInit {
  productPaging$: Observable<ProductPaging>;
  currentList: Product[] = [];
  size = 20;
  page = 1;
  total = 200;
  hasNext$ = of(true);
  hasPrevious$ = of(false);

  constructor(private store: Store) {
    this.productPaging$ = this.store.pipe(
      select(AllProductsSelector.selectAllProductsWithPaging)
    );
    this.hasNext$ = this.store.pipe(
      select(AllProductsSelector.selectPagingInfo),
      map((info) => info.hasNext)
    );

    this.hasPrevious$ = this.store.pipe(
      select(AllProductsSelector.selectPagingInfo),
      map((info) => info.hasPrevious)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(
      AllProductsApiActions.loadAllProducts({ start: 0, size: 10, order: 'id' })
    );
  }
}
