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
import { RouteEffects } from './store/effect/route.effects';
import * as fromDetails from './store/reducer/details.reducer';
import { DetailsEffects } from './store/effect/details.effects';
import * as fromAllProduct from './store/reducer/all-product.reducer';
import { TopViewsEffects } from './store/effect/top-views.effects';
import * as fromTopViews from './store/reducer/top-views.reducer';

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
    EffectsModule.forFeature([TrendingEffects, RouteEffects, DetailsEffects, TopViewsEffects]),
    StoreModule.forFeature(fromDetails.detailsFeatureKey, fromDetails.reducer),
    StoreModule.forFeature(fromAllProduct.allProductFeatureKey, fromAllProduct.reducer),
    StoreModule.forFeature(fromTopViews.topViewsFeatureKey, fromTopViews.reducer),
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
