import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HTTPRequestsService } from '../services/http-requests.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
})
export class ConfirmEmailPage implements OnInit {

  code: string;
  successConfirmation: boolean;
  dissmis = false;
  constructor(private route: ActivatedRoute,
              private httpRequests: HTTPRequestsService,
              public loadingController: LoadingController) {}

 async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    if (this.dissmis) {
      await loading.dismiss();
    }
    const { role, data } = await loading.onDidDismiss();
  }

  ngOnInit() {
      this.presentLoading();
      this.code = this.route.snapshot.paramMap.get('code');
      this.httpRequests.httpUserActive(this.code).subscribe(
        (data: any) => {
          this.dissmis = true;
          if ( data.data[0] ) {
            this.successConfirmation = true;
          } else {
            this.successConfirmation = false;
          }
        }
      );

  }

}
