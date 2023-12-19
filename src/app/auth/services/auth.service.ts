import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { API_BASE_URL } from 'src/app/config';
import { LocalStorageEnum, User } from 'src/app/shared/interfaces';
import {
  AuthStatus,
  LoginCredentials,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  RenewTokenResponse,
} from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = API_BASE_URL;
  private _currentUser?: User;
  private _authStatus: AuthStatus = AuthStatus.checking;

  constructor(private http: HttpClient) {}

  get currentUser() {
    return this._currentUser;
  }

  get authStatus() {
    return this._authStatus;
  }

  login(loginCredentials: LoginCredentials): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, loginCredentials)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((error) => throwError(() => error.error.error))
      );
  }

  register(registerData: RegisterData): Observable<boolean> {
    return this.http
      .post<RegisterResponse>(`${this.baseUrl}/auth/register`, registerData)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((error) => throwError(() => error.error.error))
      );
  }

  checkAuthStatus(): Observable<User | null> {
    const token = localStorage.getItem('token');
    if (!token) {
      this._authStatus = AuthStatus.notAuthenticated;
      // this.logout();
      return of(null);
    }

    return this.http
      .get<RenewTokenResponse>(`${this.baseUrl}/auth/renew-token`)
      .pipe(
        map((res) => {
          this.setAuthentication(res.user, res.token);

          return res.user;
        }),
        catchError(() => {
          this._authStatus = AuthStatus.notAuthenticated;

          return of(null);
        })
      );
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser = user;
    this._authStatus = AuthStatus.authenticated;

    localStorage.setItem(LocalStorageEnum.authJWTKey, token);

    return true;
  }
}
