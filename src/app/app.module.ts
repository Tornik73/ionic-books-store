import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { JwtInterceptor, ErrorInterceptor } from './modules/shared/interceptors';
import { PayPal } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

const firebaseConfig = {
  apiKey: 'AIzaSyCNzv4_QRpxTXSRCo3IBX7aXwHEDjIFi-Y',
  authDomain: 'book-store-1566203352826.firebaseapp.com',
  databaseURL: 'https://book-store-1566203352826.firebaseio.com',
  projectId: 'book-store-1566203352826',
  storageBucket: 'book-store-1566203352826.appspot.com',
  messagingSenderId: '893912839232',
  appID: '1:893912839232:ios:764d2cb7da3280eb'
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [
    // GooglePlus,
    StatusBar,
    SplashScreen,
    Camera,
    Stripe,
    File,
    FCM,
    PayPal,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide:  RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
