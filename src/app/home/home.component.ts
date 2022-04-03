import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../core/model/product.model';
import { TrendingPageActions } from './store/action';
import { TrendingProductSelector } from './store/selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  trendingList$: Observable<Product[]>;
  popularList$: Observable<Product[]>;
  isPopularListEnable = environment.features.popularProduct.isEnable;
  recentList$: Observable<Product[]>;
  isRecentListEnable = environment.features.topNewProduct.isEnable;
  trendingList: Product[] = [];
  popularList: Product[] = [];
  recentList: Product[] = [];

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
      this.trendingList.push(defautItem);
      this.popularList.push(defautItem);
      this.recentList.push(defautItem);
    }
    this.trendingList$ = this.store.pipe(
      select(TrendingProductSelector.selectAllTrendingProducts)
    );
    this.popularList$ = this.isPopularListEnable ? of(this.popularList) : of(this.popularList);
    this.recentList$ = this.isRecentListEnable ? of(this.recentList) : of(this.recentList);
  }

  ngOnInit(): void {
    this.store.dispatch(TrendingPageActions.loadTrendingPages());
  }

  onShowAllProduct(): void {
    this.store.dispatch(TrendingPageActions.showAllTrending());
  }
}
