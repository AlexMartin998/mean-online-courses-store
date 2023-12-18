import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginAndRegisterPageComponent } from './pages/login-and-register-page/login-and-register-page.component';

@NgModule({
  declarations: [LoginAndRegisterPageComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
