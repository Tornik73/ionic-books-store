import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { HTTPRequestsService } from '../services/http-requests.service';
// import { BatteryStatus } from '@ionic-native/battery-status/ngx';

@Component({
  selector: 'main-tab',
  templateUrl: 'main-tab.page.html',
  styleUrls: ['main-tab.page.scss']
})
export class MainPage implements OnInit  {
  goodsData: Book[] = [];

  constructor(private requestServ: HTTPRequestsService) {
  }

  ngOnInit() {
    this.requestServ.httpBooksGet()
    .subscribe((response: Book) => {
      this.goodsData = [];
      // tslint:disable-next-line: forin
      for (let i in response) {
          this.goodsData.push(response[i]);
      }
    });
  // // watch change in battery status
  //   const subscription = this.batteryStatus.onChange().subscribe(status => {
  //     console.log(status.level, status.isPlugged);
  //   });

  // // stop watch
  // subscription.unsubscribe();
  }
}
