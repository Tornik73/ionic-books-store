import * as JWT from 'jwt-decode';
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform, LoadingController } from '@ionic/angular';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { User } from '../../../shared/models/index';
import { PhotoService, AuthService } from '../../../shared/services/index';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

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
  user: Observable<any>;
  userData: User;
  loadingImg = false;

  constructor(private previewPhotoService: PhotoService,
              private afAuth: AngularFireAuth,
              private platform: Platform,
              // private gplus: GooglePlus,
              private router: Router,
              private authServ: AuthService,
              private camera: Camera,
              private file: File,
              public loadingController: LoadingController) {
              this.user = this.afAuth.authState;
  }

  ngOnInit() {
    this.angForm = new FormGroup({
      age: new FormControl(this.currentUserAge, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.currentUserTel, [Validators.required])
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true,
    };
    this.loadingImg = true;
    this.camera.getPicture(options).then((imageData) => {
     const filename = imageData.substring(imageData.lastIndexOf('/') + 1);
     const path =  imageData.substring(0, imageData.lastIndexOf('/') + 1);
     this.file.readAsDataURL(path, filename).then(res =>  {this.currentUserImg = res; this.loadingImg = false; });
    }, (err) => {
      // this.presentLoading(false);
      this.loadingImg = false;
      console.error(err);
    });
  }

  async presentLoading(loadingImg) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: loadingImg,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
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
      // this.gplus.logout();
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
