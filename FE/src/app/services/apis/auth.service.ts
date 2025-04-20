import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { API_BASE_URL, API_ENDPOINT } from "../../config/api-endpoint.config";
import { ApiService } from '../common/api.service';
import { IAlertMessage } from '../../interface/alert-message.interface';
import { ILogin } from '../../interface/login.interface';
import { IRegister } from 'src/app/interface/register.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends ApiService {

    private loginInfo!: ILogin;
    private alertMessages!: IAlertMessage;
    private jwtHelperService = new JwtHelperService();

    private userSubject = new BehaviorSubject<any>(this.getUser());
    public user$ = this.userSubject.asObservable();

    constructor(
        private _http: HttpClient,
        private router: Router,
    ) {
        super(_http);
    }
    

    login(form: ILogin): Observable<ILogin> {
        return new Observable(observer => {
          this.post<ILogin>(API_ENDPOINT.auth.base + API_ENDPOINT.auth.login, { 
            email: form.email.trim(), 
            password: form.password.trim() 
          })
          .subscribe({
            next: (data) => {
              console.log('[AuthService] Login response:', data); 
              localStorage.setItem('token', data.token || '');
              if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                this.userSubject.next(data.user); 
              } else {
                this.userSubject.next(null); 
              }
              observer.next(data); 
              observer.complete();
            },
            error: (err) => {
              console.error('[AuthService] Login error:', err);
              observer.error(err); 
            }
          });          
        });
      }
      
      
    getIdLogin() {
        if (this.loginInfo) {
            return this.loginInfo.email;
        }
        return null;
    }

    isLoggedIn(): boolean {
        if (this.getToken()) {
            const expired = this.jwtHelperService.isTokenExpired(this.getToken());
            if (expired) {
                localStorage.clear();
            }
            return !expired;
        }
        return false;
    }

    override getToken() {
        return localStorage.getItem('token');
    }

    register(data: IRegister): Observable<any> {
        return this.post<any>(API_ENDPOINT.auth.base + '/register', data);
    }

    getUser(): any {
        const userJson = localStorage.getItem('user');
        try {
          return userJson ? JSON.parse(userJson) : null;
        } catch (err) {
          console.error('Lỗi parse user:', err);
          return null;
        }
      }
         

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.userSubject.next(null); 
    }

    forgotPassword(email: string): Observable<any> {
      return this.post(API_ENDPOINT.auth.base + '/forgot-password', { email });
    }
    
    verifyOtp(email: string, otp: string): Observable<any> {
      return this.post(API_ENDPOINT.auth.base + '/otp', { email, otp });
    }
    
    
    resetPassword(email: string, password: string): Observable<any> {
      return this.post(API_ENDPOINT.auth.base + '/reset-password', { email, password });
    }    
}
