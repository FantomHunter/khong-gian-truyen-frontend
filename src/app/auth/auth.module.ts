import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/effect/login.effects';
import { StoreModule } from '@ngrx/store';
import * as fromLoginStatus from './store/reducer/login-status.reducer';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    EffectsModule.forFeature([LoginEffects]),
    StoreModule.forFeature(
      fromLoginStatus.loginStatusFeatureKey,
      fromLoginStatus.reducer
    ),
  ],
})
export class AuthModule {}
