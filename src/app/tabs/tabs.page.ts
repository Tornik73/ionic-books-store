import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  user: Observable<firebase.User>;
  isLoggedIn: Observable<boolean>;
  authStatus: boolean;
  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {
    this.authService.observeAuthStatus.subscribe(
      (status: boolean) => {
        this.authStatus = status;
      }
    );
  }
  checkStatus(): boolean {
    if (this.isLoggedIn) {
      return true;
    }
    return false;
  }
}
