import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = authService.isLoggedIn();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
}
