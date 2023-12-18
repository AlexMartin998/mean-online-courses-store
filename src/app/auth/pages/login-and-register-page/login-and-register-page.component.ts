import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-and-register-page',
  templateUrl: './login-and-register-page.component.html',
  styles: [],
})
export class LoginAndRegisterPageComponent {
  public loginForm: FormGroup = this.fb.group({
    email: ['alex1@test.com', [Validators.required, Validators.email]],
    password: ['123123', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  onLogin() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.showWelcomeMessageAndRedirect();
      },
      error: (errorMessage) => {
        alert(errorMessage);
        // this.showSnackbar(errorMessage);
      },
    });
  }

  private showWelcomeMessageAndRedirect() {
    const authUser = this.authService.currentUser;

    // // with signals this navigation is not necessary
    // redirect based on user role
    // if (authUser?.role.name === 'ADMIN')
    //   return this.router.navigateByUrl('/admin/books');

    return this.router.navigateByUrl('/');
  }
}
