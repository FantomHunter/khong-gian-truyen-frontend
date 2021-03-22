import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { ProductPagingComponent } from './product-paging/product-paging.component';


@NgModule({
  declarations: [HomeComponent, ProductDetailsComponent, ProductAllComponent, ProductSidebarComponent, ProductPagingComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
