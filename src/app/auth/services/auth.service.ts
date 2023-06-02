import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginReqPayload } from '../dto/login.payload';
import { AuthResponse } from '../dto/auth-response';
import { Observable, map } from 'rxjs';
import { RegisterReqPayload } from '../dto/register.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  register(userInfo: RegisterReqPayload): Observable<string> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, userInfo)
      .pipe(
        map((data) => {
          this.storeToken(data);

          return data.message;
        })
      );
  }

  login(credentials: LoginReqPayload): Observable<string> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map((data) => {
          this.storeToken(data);
          return data.message;
        })
      );
  }

  resetPassword(email: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, { email });
  }

  logout() {
    localStorage.removeItem('auth-token');
  }

  storeToken(data: AuthResponse) {
    localStorage.setItem('auth-token', data.token);
  }

  getToken() {
    return localStorage.getItem('auth-token');
  }

  // isLoggedIn() {}
  // getUserName(): Observable<UserDto> {
  //   return this.httpClient.get<UserDto>(MY_PROFILE_PATH);
  // }
}
