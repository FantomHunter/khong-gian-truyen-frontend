import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Product } from 'src/app/core/model/product.model';

@Component({
  selector: 'app-product-small',
  templateUrl: './product-small.component.html',
  styleUrls: ['./product-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSmallComponent implements OnInit {
  @Input() product: Product = {
    id: -1,
    name: 'default product small',
    status: 'comming',
    categoryList: ['Action', 'Movie'],
    nbComment: 30,
    nbView: 300,
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
  };
  constructor() {}

  ngOnInit(): void {}
}
