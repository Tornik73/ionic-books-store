import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class UnauthorizedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>  {
      let isAuthorize: boolean;
      const result = new BehaviorSubject<boolean>(false);
      this.authService.isLoggedIn().subscribe(response => {
        isAuthorize = response;
      });
      if (isAuthorize) {
        this.router.navigate(['']);
        result.next(false);
        return result;
      }
      result.next(true);
      return result;
  }
}

