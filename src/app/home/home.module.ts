import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { environment } from 'src/environments/environment';
import { ProductServiceJhipster } from '../core/service/jhipster/product.service.jhipster';
import { ProductServiceMock } from '../core/service/mock/product.service.mock';
import { ProductServiceApi } from '../core/service/product.service.api';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductPagingComponent } from './product-paging/product-paging.component';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { DetailsEffects } from './store/effect/details.effects';
import { NewCommentEffects } from './store/effect/new-comment.effects';
import { RouteEffects } from './store/effect/route.effects';
import { TopViewsEffects } from './store/effect/top-views.effects';
import { TrendingEffects } from './store/effect/trending.effects';
import * as fromAllProduct from './store/reducer/all-product.reducer';
import * as fromDetails from './store/reducer/details.reducer';
import * as fromNewComment from './store/reducer/new-comment.reducer';
import * as fromTopViews from './store/reducer/top-views.reducer';
import * as fromTrending from './store/reducer/trending.reducer';

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
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HomeRoutingModule,
    StoreModule.forFeature(
      fromTrending.trendingFeatureKey,
      fromTrending.reducer
    ),
    EffectsModule.forFeature([
      TrendingEffects,
      RouteEffects,
      DetailsEffects,
      TopViewsEffects,
      NewCommentEffects,
    ]),
    StoreModule.forFeature(fromDetails.detailsFeatureKey, fromDetails.reducer),
    StoreModule.forFeature(
      fromAllProduct.allProductFeatureKey,
      fromAllProduct.reducer
    ),
    StoreModule.forFeature(
      fromTopViews.topViewsFeatureKey,
      fromTopViews.reducer
    ),
    StoreModule.forFeature(
      fromNewComment.newCommentFeatureKey,
      fromNewComment.reducer
    ),
    SweetAlert2Module,
  ],
  providers: [
    {
      provide: ProductServiceApi,
      useClass: !environment.useMockService
        ? ProductServiceJhipster
        : ProductServiceMock,
    },
  ],
})
export class HomeModule {}
