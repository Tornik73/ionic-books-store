import { Component, OnInit } from '@angular/core';
import { HTTPRequestsService } from '../services/index';
import { User, Book } from '../models/index';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  usersData = [];
  booksData = [];
  constructor(private requestServ: HTTPRequestsService) { }

  ngOnInit() {

    // TODO: REFACTOR
    this.requestServ.httpUsersGet()
    .subscribe((response: User) => {
      // tslint:disable-next-line: forin
      for (const i in response) {
        console.log(response);
        this.usersData.push(response[i]);
      }
    });
    this.requestServ.httpBooksGet()
    .subscribe((response: Book) => {
      // tslint:disable-next-line: forin
      for (const i in response) {
        console.log(response);
        this.booksData.push(response[i]);
      }
    });
  }
}
