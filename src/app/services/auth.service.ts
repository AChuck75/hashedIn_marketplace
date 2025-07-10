
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, tap, throwError, of, map } from 'rxjs';


interface User{
    id:number,
    username:string,
    email:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000'; // Your Express API base URL

  private http: HttpClient= inject(HttpClient);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    signup(username: string, password: string,email:string): Observable<unknown> {
        return this.http.post(`${this.apiUrl}/auth/signup`, { username, password, email });
    }
    login(username: string, password: string): Observable<{ user: User }> {
        return this.http.post<{ user: User }>(
        `${this.apiUrl}/auth/login`,
        { username, password },
        { withCredentials: true }
        ).pipe(
        tap((res) => {
            this.isAuthenticatedSubject.next(true);
            if (res && (res.user)) {
                sessionStorage.setItem('user', JSON.stringify(res.user));
            }
        }),
        catchError(error => {
            this.isAuthenticatedSubject.next(false);
            if (error.status === 401) {
            console.error('Login failed: Unauthorized');
            } else {
            console.error('Login failed:', error);
            }
            return throwError(() => error);
        })
        );
        
    }
    logout(): Observable<unknown> {
        return this.http.post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
        tap(() => {
            
            this.isAuthenticatedSubject.next(false);
        }),
        catchError(error => {
            this.isAuthenticatedSubject.next(false);
            return throwError(() => error);
        })
        );
    }
    checkAuthStatus(): Observable<boolean> {
        return this.http.get<{authenticated:boolean}>(`${this.apiUrl}/auth/health`, { withCredentials: true })
        .pipe(
            map((res) => {
                this.isAuthenticatedSubject.next(res.authenticated);
                return res.authenticated;
            }),
            catchError(() => {
            this.isAuthenticatedSubject.next(false);
            return of(false);
            })
        );
    }
}
