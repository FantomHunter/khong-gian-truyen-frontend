import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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
  recentList$: Observable<Product[]>;
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
    this.popularList$ = of(this.popularList);
    this.recentList$ = of(this.recentList);
  }

  ngOnInit(): void {
    this.store.dispatch(TrendingPageActions.loadTrendingPages());
  }

  onProductSelected(id: number): void {
    console.log(id);
    this.store.dispatch(TrendingPageActions.showTrendingDetails({id}));
  }
}
