import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductMediumComponent } from './product-medium/product-medium.component';
import { ProductSmallComponent } from './product-small/product-small.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [ProductComponent, ProductMediumComponent, ProductSmallComponent, CommentComponent],
  imports: [CommonModule],
  exports: [ProductComponent, ProductMediumComponent, ProductSmallComponent, CommentComponent],
})
export class SharedModule {}
