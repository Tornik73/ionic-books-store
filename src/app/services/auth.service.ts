import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HTTPRequestsService } from './http-requests.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatus = new Subject<boolean>();
  currentAuthUser = new BehaviorSubject<string>(this.getToken());
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  observeAuthStatus = this.authStatus.asObservable();
  observeCurrentAuthUser = this.currentAuthUser.asObservable();

  authUserRights: boolean;

  // authStatus$ = this.observeAuthStatus;

  constructor(private http: HTTPRequestsService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
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

  anounceChangingAuthStatus(newAuthStatus: boolean) {
    console.log(newAuthStatus);
    this.authStatus.next(newAuthStatus);
  }

  anounceChangingCurrentUser(newUser: string) {
    this.currentAuthUser.next(newUser);
  }

  get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      return this.http.httpUsersAuth({ email, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  console.log(user, user.token);
                  this.isLoginSubject.next(true);
                  this.anounceChangingCurrentUser(user.token);
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.isLoginSubject.next(false);
  }
}
