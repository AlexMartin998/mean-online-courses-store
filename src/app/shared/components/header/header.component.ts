import { Component } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onGoToUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  onLogout(): void {
    this.authService.logout();

    // with signals this navigation is not required
    this.router.navigateByUrl('/');
  }
}
