import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { CountryPhone } from 'src/app/models/country-phone.model';
import { HTTPRequestsService, AuthService } from '../../services/index';


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
    private platform: Platform,
    private authService: AuthService
  ) {
    this.user = this.afAuth.authState;
  }

  async presentToast(username: string) {
    const toast = await this.toastController.create({
      message: 'You successfully log in!' + ' Hi ' + username + ' !',
      duration: 2000,
      color: 'dark',
      showCloseButton: true,
      cssClass: 'margin-bottom: 100px;',
    });
    toast.present();
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
        webClientId: '893912839232-s3nse0a5ihs4cqe885i1okp08n9oi36s.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });
      this.router.navigate(['']);
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
      this.authService.isLoginSubject.next(true);
      this.router.navigate(['']);
      this.presentToast(credential.user.displayName);
    } catch (err) {
      console.log(err);
    }
  }

  signOut() {
    this.authService.isLoginSubject.next(false);
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
  }


  ngOnInit() {
    // reset login status
    this.authService.logout();

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

    const correctValues = {
      email: values.usernameEmail,
      password: values.matching_passwords.password,
    };
    this.authService.login(correctValues.email, correctValues.password)
      .pipe(first())
      .subscribe(
          data => {
            setTimeout(() => { // TODO: remove after tests done
              this.presentToast(correctValues.email);
              // FormGroup.prototype.reset(this.validationsForm);
              this.validationsForm.reset(this.validationsForm);
              this.httpError = '';
              this.sendingRequest = false;
              this.authService.isLoginSubject.next(true);
              this.router.navigate(['']);
            }, 1000);
          },
          error => {
              this.authService.isLoginSubject.next(false);
              this.validationsForm.reset(this.validationsForm);
              this.sendingRequest = false;
              console.log(error);
              // this.httpError =  error.error.message;
          });
  }
}
