import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-and-register-page',
  templateUrl: './login-and-register-page.component.html',
  styles: [],
})
export class LoginAndRegisterPageComponent {
  public loginForm: FormGroup = this.fb.group({
    // defaultValue, [sync validations], [async validations]
    email: [
      'alex1@test.com',
      [Validators.required, Validators.pattern(ValidatorsService.emailPattern)],
    ],
    password: ['123123', [Validators.required, Validators.minLength(6)]],
  });

  public registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(ValidatorsService.emailPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },

    // Tengo acceso a Todos los Controls del Form
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo(
          'password',
          'confirmPassword'
        ),
      ],
    }
  );

  constructor(
    private readonly authService: AuthService,
    private readonly validatorsService: ValidatorsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  onLogin() {
    if (this.loginForm.invalid) return this.loginForm.markAllAsTouched();

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

  onRegister() {
    if (this.registerForm.invalid) return this.registerForm.markAllAsTouched();
    console.log(this.registerForm.value);
  }

  isInvalidField(field: string) {
    return this.validatorsService.isInvalidField(this.registerForm, field);
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
