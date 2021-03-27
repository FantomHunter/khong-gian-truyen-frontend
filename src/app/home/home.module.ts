import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { ProductPagingComponent } from './product-paging/product-paging.component';
import { ProductServiceApi } from '../core/service/product.service.api';
import { environment } from 'src/environments/environment';
import { ProductServiceMock } from '../core/service/mock/product.service.mock';
import { StoreModule } from '@ngrx/store';
import * as fromTrending from './store/reducer/trending.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TrendingEffects } from './store/effect/trending.effects';

@NgModule({
  declarations: [
    HomeComponent,
    ProductDetailsComponent,
    ProductAllComponent,
    ProductSidebarComponent,
    ProductPagingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    StoreModule.forFeature(
      fromTrending.trendingFeatureKey,
      fromTrending.reducer
    ),
    EffectsModule.forFeature([TrendingEffects]),
  ],
  providers: [
    {
      provide: ProductServiceApi,
      useClass: !environment.production
        ? ProductServiceMock
        : ProductServiceMock,
    },
  ],
})
export class HomeModule {}
