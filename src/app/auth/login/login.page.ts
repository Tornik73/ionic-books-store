import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CountryPhone } from 'src/app/models/country-phone.model';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HTTPRequestsService } from 'src/app/services/http-requests.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  validationsForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  countryPhoneGroup: FormGroup;
  countries: Array<CountryPhone>;
  genders: Array<string>;
  sendingRequest = false;
  httpError = '';

  user: Observable<firebase.User>;

  validationMessages: object = {
    usernameEmail: [
      { type: 'required', message: 'This field is required.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
    ],
  };


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    private requestServ: HTTPRequestsService,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform
  ) {
    this.user = this.afAuth.authState;
  }

  googleLogin() {
    if (this.platform.is('cordova'))  {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<any> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '893912839232-s3nse0a5ihs4cqe885i1okp08n9oi36s.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });
      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You successfully log in! Hi, username!',
      duration: 2000,
      color: 'dark',
      showCloseButton: true,
      cssClass: 'margin-bottom: 100px;',
    });
    toast.present();
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  ngOnInit() {

    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.required),
    });

    this.validationsForm = this.formBuilder.group({
      usernameEmail: new FormControl('', Validators.required),
      matching_passwords:  this.matchingPasswordsGroup,
    });
  }

  onSubmit(values) {
    this.sendingRequest = true;

    const corectValues = {
      email: values.usernameEmail,
      password: values.matching_passwords.password,
    };

    const registerSubcription = this.requestServ.httpUsersAuth(corectValues)
      .subscribe(
        response => {
          setTimeout(() => {
            this.validationsForm.reset(this.validationsForm);
            this.presentToast();
            this.sendingRequest = false;
            this.httpError = '';
            this.router.navigate(['']);
          }, 1000);
        },
        error => {
          setTimeout(() => {
            this.sendingRequest = false;
            this.httpError =  error.error.message;
          }, 1000);
      });

  }
}
