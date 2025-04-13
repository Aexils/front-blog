// src/app/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ message: string }>(`${this.baseUrl}/request-login`, {
      email,
      password,
    });
  }

  verifyCode(email: string, code: string) {
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/verify-code`, {
      email,
      code,
    });
  }
}
