import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/core/model/product.model';
import { TopViewsFilter } from 'src/app/core/model/top-views-filter.enum.model';
import { TopViewsProductsSelector } from 'src/app/home/store/selector';
import { TopViewsApiActions } from '../store/action';

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
      this.sideBarViewList.push({
        ...defautItem,
        name: 'sidebar view product name',
      });
      this.sideBarCommentList.push({
        ...defautItem,
        name: 'sidebar comment product name',
      });
    }
    // this.sideBarViewList$ = of(this.sideBarViewList);
    this.sideBarCommentList$ = of(this.sideBarCommentList);
    this.sideBarViewList$ = this.store.pipe(
      select(TopViewsProductsSelector.selectTopViewsProducts)
    );
    // this.topViewsFilter$ = of(TopViewsFilter.MONTH);
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
