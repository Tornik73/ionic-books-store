import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { HTTPRequestsService } from '../services/http-requests.service';
import { PhotoService } from '../services/photo-service.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { User } from '../models/user.model';
import * as JWT from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUserId: number;
  currentUser: string;
  currentUserPassword: string;
  currentUserRights: string;
  currentUserAge: number;
  currentUserTel: string;
  currentUserImg: string;
  isAdmin: boolean;
  editMode = false;
  angForm: FormGroup;
  loadingDataSpinner = false;
  authStatus: boolean;
  user: Observable<firebase.User>;
  userData: User;

  constructor(private authService: AuthService,
              private previewPhotoService: PhotoService,
              private requestServ: HTTPRequestsService,
              private afAuth: AngularFireAuth,
              private platform: Platform,
              private gplus: GooglePlus,
              private router: Router,
              private authServ: AuthService) {
              this.user = this.afAuth.authState;
  }

  preview(files) {
    this.previewPhotoService.preview(files)
      .then( (result: string) => {
        this.currentUserImg = result;
      }
      );
  }

  // Managing of edit mode
  editModeOn() {
    this.currentUserImg = localStorage.currentUserImg; // reset picture change
    return this.editMode = !this.editMode;
  }

  logOut() {
    localStorage.clear();
    this.authServ.isLoginSubject.next(false);
    this.authService.anounceChangingAuthStatus(false);
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
    this.router.navigate(['']);
  }

  onUpload() {
    // this.loadingDataSpinner = true;
    // localStorage.currentUserImg = this.currentUserImg;

    // this.currentUserTel = localStorage.currentUserTelephone = this.angForm.value.telephone;
    // this.currentUserAge = localStorage.currentUserAge = this.angForm.value.age;
  }

  ngOnInit() {
    // this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    // const token = JSON.parse(this.token.source._value).token;
    // this.userData = JWT(token);
    let stringUser;
    this.authServ.getCurrentUser().subscribe(
      (user: any) => {
        stringUser = user;
      }
    );
    const token = JSON.parse(stringUser).token;
    this.userData = JWT(token);

    this.angForm = new FormGroup({
      age: new FormControl(this.currentUserAge, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.currentUserTel, [Validators.required])
    });
  }
}
