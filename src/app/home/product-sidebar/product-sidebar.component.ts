import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/model/product.model';
import { TopViewsFilter } from 'src/app/core/model/top-views-filter.enum.model';
import {
  NewCommentProductSelector,
  TopViewsProductsSelector
} from 'src/app/home/store/selector';
import { NewCommentsActions, TopViewsApiActions } from '../store/action';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSidebarComponent implements OnInit {
  sideBarViewList$: Observable<Product[]>;
  sideBarCommentList$: Observable<Product[]>;
  public TopViewsFilter = TopViewsFilter;
  topViewsFilter$: Observable<TopViewsFilter>;
  sideBarViewList: Product[] = [];
  sideBarCommentList: Product[] = [];
  constructor(private store: Store) {
    this.sideBarCommentList$ = this.store.pipe(
      select(NewCommentProductSelector.selectNewCommentProducts)
    );
    this.sideBarViewList$ = this.store.pipe(
      select(TopViewsProductsSelector.selectTopViewsProducts)
    );
    this.topViewsFilter$ = this.store.pipe(
      select(TopViewsProductsSelector.selectTopViewsFilterTypeProducts)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(
      TopViewsApiActions.loadTopViewsApis({
        size: 5,
        filterType: TopViewsFilter.DAY,
      })
    );
    this.store.dispatch(NewCommentsActions.loadNewComments({ size: 5 }));
  }
  onChangeFilter(filterType: TopViewsFilter) {
    this.store.dispatch(
      TopViewsApiActions.loadTopViewsApis({
        size: 5,
        filterType: filterType,
      })
    );
  }
}
