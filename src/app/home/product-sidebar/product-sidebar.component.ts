import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'src/app/core/model/product.model';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSidebarComponent implements OnInit {
  constructor() {}

  sideBarViewList: Product[] = [];
  sideBarCommentList: Product[] = [];
  ngOnInit(): void {
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
  }
}
