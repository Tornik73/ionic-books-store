import { Component, OnInit, ViewChild } from '@angular/core';
import { Book, AuthorsBooks } from '../models/index';
import { HTTPRequestsService } from '../services/index';
import { IonInfiniteScroll } from '@ionic/angular';
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
      for (const i in response) {
        const authorBook: AuthorsBooks = Object.assign(response[i].book, response[i].author);
        this.goodsData.push(authorBook);
      }
    });
  }
}
