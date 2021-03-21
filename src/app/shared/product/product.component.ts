import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product = {
    id: -1,
    name: 'default',
    status: 'comming',
    categoryList: ['Action', 'Movie'],
    nbComment: 30,
    nbView: 300,
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
  };

  constructor() {}

  ngOnInit(): void {}
}
