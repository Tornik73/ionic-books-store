import * as JWT from 'jwt-decode';
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { User } from '../models/index';
import { HTTPRequestsService, PhotoService, AuthService } from '../services/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, DoCheck {
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

  constructor(private previewPhotoService: PhotoService,
              private afAuth: AngularFireAuth,
              private platform: Platform,
              private gplus: GooglePlus,
              private router: Router,
              private authServ: AuthService) {
              this.user = this.afAuth.authState;
  }

  ngOnInit() {


    this.angForm = new FormGroup({
      age: new FormControl(this.currentUserAge, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.currentUserTel, [Validators.required])
    });
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
    // this.currentUserImg = localStorage.currentUserImg; // reset picture change
    return this.editMode = !this.editMode;
  }

  onUpload() {
    // on Upload image in profile page
  }


  logOut() {
    localStorage.clear();
    this.authServ.isLoginSubject.next(false);
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
    this.router.navigate(['']);
  }

  ngDoCheck() {
    let stringUser: string;
    this.authServ.getCurrentUser().subscribe(
      (user: string) => {
        stringUser = user;
      }
    );
    this.userData = JWT(stringUser);
  }
}
