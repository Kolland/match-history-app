import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials.model';
import { LoginApiModel } from '../models/login-api.model';

@Injectable({ providedIn: 'root' })
export class LoginApiService {
  constructor(private httpClient: HttpClient) { }

  login(credentials: CredentialsModel) {
    return this.httpClient.post<LoginApiModel>(`${environment.api}/auth/sign-in`, {
      email: credentials.email,
      password: credentials.password
    })
  }
}