import { Component, OnInit } from '@angular/core';
import { Product } from '../core/model/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  trendingList: Product[] = [];
  popularList: Product[] = [];
  recentList: Product[] = [];
  sideBarViewList: Product[] = [];
  sideBarCommentList: Product[] = [];

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
    for (let i = 0; i < 6; i++) {
      this.trendingList.push(defautItem);
      this.popularList.push(defautItem);
      this.recentList.push(defautItem);
      this.sideBarViewList.push({
        ...defautItem,
        name: 'sidebar view product name',
      });
      this.sideBarCommentList.push({
        ...defautItem,
        name: 'sidebar comment product name',
      });
    }
  }

  ngOnInit(): void {}
}
