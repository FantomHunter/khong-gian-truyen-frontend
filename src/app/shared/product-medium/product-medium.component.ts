import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Product } from 'src/app/core/model/product.model';

@Component({
  selector: 'app-product-medium',
  templateUrl: './product-medium.component.html',
  styleUrls: ['./product-medium.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductMediumComponent implements OnInit {
  @Input() product: Product = {
    id: -1,
    name: 'default medium',
    status: 'comming',
    categoryList: ['Action', 'Movie'],
    nbComment: 30,
    nbView: 300,
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
  };
  constructor() {}

  ngOnInit(): void {}
}
