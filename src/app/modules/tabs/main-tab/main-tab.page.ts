import { Component, OnInit, ViewChild } from '@angular/core';
import { Book, AuthorsBooks } from '../../shared/models/index';
import { HTTPRequestsService } from '../../shared/services/index';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'main-tab',
  templateUrl: 'main-tab.page.html',
  styleUrls: ['main-tab.page.scss']
})
export class MainPage implements OnInit  {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  goodsData = [];
  constructor(private requestServ: HTTPRequestsService) {
  }
  doRefresh(event) {
    this.goodsData = [];
    setTimeout(() => { // TODO: remove
      this.updateBooks();
      event.target.complete();
    }, 500);
  }
  ngOnInit() {
    this.goodsData = [];
    this.updateBooks();
  }
  loadData(event) {

    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.updateBooks();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.goodsData.length > 50) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  public updateBooks(): void {
    this.requestServ.httpBooksGet()
    .subscribe((response: AuthorsBooks) => {
      
      // tslint:disable-next-line: forin
      for (const i in response) {
        const authorBook: AuthorsBooks = Object.assign(response[i].book, response[i].author);
        this.goodsData.push(authorBook);
      }
    });
  }
}
