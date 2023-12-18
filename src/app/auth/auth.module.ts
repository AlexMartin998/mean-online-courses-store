import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';


@NgModule({
  declarations: [
    LoginRegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
