import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  isLoggedIn: Observable<boolean>;
  isUserLogIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
      this.isLoggedIn.subscribe(data => {
        this.isUserLogIn = data;
      });
      if (this.isUserLogIn) {
        return true;
      } else {
        this.router.navigate(['/']);
        return true;
      }
    }
}
