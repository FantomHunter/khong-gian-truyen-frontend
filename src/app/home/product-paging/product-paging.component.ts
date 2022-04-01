import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductPaging } from 'src/app/core/model/product-paging.model';
import { Product } from 'src/app/core/model/product.model';
import { environment } from 'src/environments/environment';
import { AllProductsApiActions } from '../store/action';
import { AllProductsSelector } from '../store/selector';

@Component({
  selector: 'app-product-paging',
  templateUrl: './product-paging.component.html',
  styleUrls: ['./product-paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPagingComponent implements OnInit {
  productPaging$: Observable<ProductPaging>;
  currentList: Product[] = [];
  // size = 20;
  // page = 1;
  // total = 200;
  // hasNext$ = of(true);
  // hasPrevious$ = of(false);
  pagingInfor$: Observable<AllProductsSelector.AllProductPagingInfo>;
  currentOrderType = 'id';

  constructor(private store: Store) {
    this.productPaging$ = this.store.pipe(
      select(AllProductsSelector.selectAllProductsWithPaging)
    );
    // this.hasNext$ = this.store.pipe(
    //   select(AllProductsSelector.selectPagingInfo),
    //   map((info) => info.hasNext)
    // );

    // this.hasPrevious$ = this.store.pipe(
    //   select(AllProductsSelector.selectPagingInfo),
    //   map((info) => info.hasPrevious)
    // );
    this.pagingInfor$ = this.store.pipe(
      select(AllProductsSelector.selectPagingInfo)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(
      AllProductsApiActions.loadAllProducts({ start: 0, size: environment.features.productPaging.size, order: this.currentOrderType })
    );
  }

  onReloadPaging(start: number | null): void {
    if (start != null) {
      this.store.dispatch(
        AllProductsApiActions.loadAllProducts({ start, size: environment.features.productPaging.size, order: this.currentOrderType })
      );
    }
  }

  onChangeOrder(orderType: any): void {
    console.log('orderType: ', orderType);
    this.currentOrderType = orderType;
    this.store.dispatch(
      AllProductsApiActions.loadAllProducts({
        start: 0,
        size: environment.features.productPaging.size,
        order: orderType,
      })
    );
  }
}
