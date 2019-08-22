import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCNzv4_QRpxTXSRCo3IBX7aXwHEDjIFi-Y',
  authDomain: "book-store-1566203352826.firebaseapp.com",
  databaseURL: "https://book-store-1566203352826.firebaseio.com",
  projectId: "book-store-1566203352826",
  storageBucket: "book-store-1566203352826.appspot.com",
  messagingSenderId: "893912839232",
  appID: "1:893912839232:ios:764d2cb7da3280eb"
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
    GooglePlus,
    StatusBar,
    SplashScreen,
    {
      provide:  RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
