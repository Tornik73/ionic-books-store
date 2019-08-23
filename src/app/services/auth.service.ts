import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalUser } from '../models/index';
import { HTTPRequestsService } from './http-requests.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentAuthUser = new BehaviorSubject<string>(this.getToken());
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  currentUser: Observable<LocalUser>;
  authUserRights: boolean;
  private currentUserSubject: BehaviorSubject<LocalUser>;

  constructor(private http: HTTPRequestsService) {
    this.currentUserSubject = new BehaviorSubject<LocalUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getToken(): string {
    return localStorage.getItem('currentUser');
  }
  private hasToken(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): Observable<string> {
    return this.currentAuthUser.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  anounceChangingCurrentUser(newUser: string): void {
    this.currentAuthUser.next(newUser);
  }

  get currentUserValue(): LocalUser {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<LocalUser> {
      return this.http.httpUsersAuth({ email, password })
          .pipe(map((user: LocalUser) => {
              if (user && user.token) {
                  localStorage.setItem('currentUser', JSON.stringify(user.token));
                  this.isLoginSubject.next(true);
                  this.anounceChangingCurrentUser(user.token);
                  this.currentUserSubject.next(user);
              }
              return user;
          }));
  }

  logout(): void {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.isLoginSubject.next(false);
  }
}
