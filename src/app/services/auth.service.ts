import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, delay, catchError } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse, RegisterRequest, UserRole } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.getToken();
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserValue?.role === role;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.mockLogin(credentials).pipe(
      tap(response => {
        this.setSession(response.user, response.token);
      }),
      map(response => response.user)
    );
  }

  register(request: RegisterRequest): Observable<User> {
    return this.mockRegister(request).pipe(
      tap(response => {
        this.setSession(response.user, response.token);
      }),
      map(response => response.user)
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  refreshToken(): Observable<string> {
    const newToken = 'refreshed-token-' + Date.now();
    localStorage.setItem('token', newToken);
    return of(newToken);
  }

  private setSession(user: User, token: string): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.currentUserSubject.next(user);
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }

  private mockLogin(credentials: LoginRequest): Observable<LoginResponse> {
    const mockUsers = [
      { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' as UserRole },
      { id: 2, username: 'user', password: 'user123', email: 'user@example.com', role: 'user' as UserRole },
      { id: 3, username: 'guest', password: 'guest123', email: 'guest@example.com', role: 'guest' as UserRole }
    ];

    return of(credentials).pipe(
      delay(500),
      map(creds => {
        const user = mockUsers.find(u => u.username === creds.username && u.password === creds.password);
        
        if (!user) {
          throw new Error('Invalid username or password');
        }

        const { password, ...userWithoutPassword } = user;
        const token = 'mock-jwt-token-' + user.id + '-' + Date.now();

        return { user: userWithoutPassword, token };
      }),
      catchError(error => throwError(() => error))
    );
  }

  private mockRegister(request: RegisterRequest): Observable<LoginResponse> {
    return of(request).pipe(
      delay(500),
      map(req => {
        const newUser: User = {
          id: Math.floor(Math.random() * 10000),
          username: req.username,
          email: req.email,
          role: 'user'
        };

        const token = 'mock-jwt-token-' + newUser.id + '-' + Date.now();
        return { user: newUser, token };
      })
    );
  }
}