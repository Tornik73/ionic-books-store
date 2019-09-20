import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ChatService } from './modules/shared/services';
import { NotificationService } from './modules/shared/services/';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.initPushNatification();
  }
  initPushNatification() {
    setTimeout(() => {
      this.fcm.getToken().then(token => {
        console.log(token);
        localStorage.firebase_token = token;
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log('refresh:', token);
      });
      this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            this.notificationService.addNotAcceptedChatInvite(parseInt(data.chatId, 0)); // TODO: REMOVE PARSE INT
            this.router.navigate(['/tabs/', data.landing_page]);
          } else {
            this.notificationService.addNotAcceptedChatInvite(parseInt(data.chatId, 0)); // TODO: REMOVE PARSE INT
            this.router.navigate(['/tabs/', data.landing_page]);
          }
        });
    }, 500);
  }
}
