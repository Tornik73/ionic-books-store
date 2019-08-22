import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { HTTPRequestsService } from '../services/http-requests.service';
import { PhotoService } from '../services/photo-service.service';
import { User } from '../models/user.model';
import { AuthService, SocialUser } from 'angularx-social-login';

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

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(// private service: AuthService,
              // private infoService: HeaderObserveService,
              private previewPhotoService: PhotoService,
              private requestServ: HTTPRequestsService,
              private authService: AuthService) {
  }

  preview(files) {
    this.previewPhotoService.preview(files)
      .then( (result: string) =>
        this.currentUserImg = result
      );
  }

  // Managing of edit mode
  editModeOn() {
    this.currentUserImg = localStorage.currentUserImg; // reset picture change
    return this.editMode = !this.editMode;
  }

  onUpload() {
    this.loadingDataSpinner = true;
    localStorage.currentUserImg = this.currentUserImg;

    this.currentUserTel = localStorage.currentUserTelephone = this.angForm.value.telephone;
    this.currentUserAge = localStorage.currentUserAge = this.angForm.value.age;

    // const userJSON: User = {
    //   id: this.currentUserId,
    //   email: this.currentUser,
    //   password: this.currentUserPassword,
    //   telephone: this.currentUserTel,
    //   age: this.currentUserAge,
    //   img: this.currentUserImg,
    //   isAdmin: this.service.authUserRights
    // };

    // this.requestServ.httpUserPut(userJSON)
    // .subscribe( () => {
    //   setTimeout(() => {
    //     this.loadingDataSpinner = false;
    //     this.infoService.anounceHeaderImg(this.currentUserImg); // Notify that the picture has changed
    //   }, 2000);
    //   return this.editMode = false;
    // })
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    // if (!this.service.authUserRights) {
    //   this.currentUserRights = 'admin';
    // } else {
    //   this.currentUserRights = 'user';
    // }
    this.angForm = new FormGroup({
      age: new FormControl(this.currentUserAge, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.currentUserTel, [Validators.required])
    });
  }
}
