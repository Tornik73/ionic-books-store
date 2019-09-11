import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { User } from '../models/user.model';
import { environment } from '../../../../environments/environment.prod';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public toastController: ToastController,
                private authenticationService: AuthService,
                private router: Router,
                ) { }

    async presentToast(messageError) {
        const toast = await this.toastController.create({
          message: messageError,
          color: 'danger',
          duration: 2000
        });
        toast.present();
      }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = localStorage.currentUser;
        // const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.serverURL);
        if (currentUser && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error}`;
                } else {
                    errorMessage = `Error Code: ${error}`;
                }
                this.presentToast(errorMessage);
                return throwError(errorMessage);
            })
        );
    }
}
