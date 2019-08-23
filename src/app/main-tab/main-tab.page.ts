import { Component, OnInit } from '@angular/core';
import { Book, AuthorsBooks } from '../models/book.model';
import { HTTPRequestsService } from '../services/http-requests.service';
// import { BatteryStatus } from '@ionic-native/battery-status/ngx';

@Component({
  selector: 'main-tab',
  templateUrl: 'main-tab.page.html',
  styleUrls: ['main-tab.page.scss']
})
export class MainPage implements OnInit  {
  goodsData = [];

  constructor(private requestServ: HTTPRequestsService) {
  }

  ngOnInit() {
    this.requestServ.httpBooksGet()
    .subscribe((response: AuthorsBooks) => {
      this.goodsData = [];
      // tslint:disable-next-line: forin
      for (let i in response) {
        console.log(response[i]);
        let authorBook = Object.assign(response[i].book, response[i].author);
        console.log(authorBook);
        this.goodsData.push(authorBook);
      }
    });
  }
}
