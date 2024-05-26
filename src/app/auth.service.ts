import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, user);
  }

  login(credentials: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/user/login`, credentials, { responseType: 'text' });
  }

  getBearerToken(): string | null {
    return localStorage.getItem('token');
  }

  setBearerToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getUserIdFromToken(token: string): number | null {
    const decoded: any = JSON.parse(atob(token.split('.')[1]));
    return decoded.id;
  }

  getTransactions(): Observable<any> {
    const userId = this.getUserId();
    if (userId !== null) {
      const token = this.getBearerToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}/transaction/history`, { headers });
    }
    return new Observable((observer) => {
      observer.error(new Error('User ID not found'));
    });
  }

  getBalance(): Observable<any> {
    const userId = this.getUserId();
    if (userId !== null) {
      const token = this.getBearerToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}/user/balance`, { headers });
    }
    return new Observable((observer) => {
      observer.error(new Error('User ID not found'));
    });
  }

  getUserId(): number | null {
    const token = this.getBearerToken();
    return token ? this.getUserIdFromToken(token) : null;
  }

  setUserId(userId: number | null): void {
    if (userId !== null) {
      localStorage.setItem('userId', userId.toString());
    } else {
      localStorage.removeItem('userId');
    }
  }
}
