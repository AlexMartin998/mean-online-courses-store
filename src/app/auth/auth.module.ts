import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { LoginAndRegisterPageComponent } from './pages/login-and-register-page/login-and-register-page.component';

@NgModule({
  declarations: [LoginAndRegisterPageComponent, AuthLayoutComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
