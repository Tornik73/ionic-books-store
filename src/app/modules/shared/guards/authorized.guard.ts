import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      let isAuthorize: boolean;
      this.authService.isLoggedIn().subscribe(response => {
        isAuthorize = response;
      });

      const result = new BehaviorSubject<boolean>(false);
      if (!isAuthorize) {
          this.router.navigate(['tabs/login']);
          result.next(false);
      } else {
        result.next(true);
      }
      return result;
  }
}
