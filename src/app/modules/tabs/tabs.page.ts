import { Component } from '@angular/core';
import { AuthService } from '../shared/services/index';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user: Observable<any>;
  isLoggedIn: Observable<boolean>;
  authStatus: boolean;
  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
    this.isLoggedIn = authService.isLoggedIn();
  }

  checkStatus(): boolean {
    if (this.isLoggedIn) {
      return true;
    }
    return false;
  }
}
