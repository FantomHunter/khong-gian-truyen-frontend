import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'src/app/core/model/product.model';

@Component({
  selector: 'app-product-paging',
  templateUrl: './product-paging.component.html',
  styleUrls: ['./product-paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPagingComponent implements OnInit {
  currentList: Product[] = [];
  size = 20;
  page = 1;
  total = 200;
  hasNext = true;
  hasPrevious = false;

  constructor() {
    const defautItem = {
      id: -1,
      name: 'default paging',
      status: 'comming',
      categoryList: ['Action', 'Movie'],
      nbComment: 30,
      nbView: 300,
      imageUrl: 'https://source.unsplash.com/1600x900/?product',
    };
    for (let i = 0; i < 20; i++) {
      this.currentList.push(defautItem);
    }
  }

  ngOnInit(): void {}
}
