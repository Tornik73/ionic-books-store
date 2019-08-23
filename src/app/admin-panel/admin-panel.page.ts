import { Component, OnInit } from '@angular/core';
import { HTTPRequestsService } from '../services/http-requests.service';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';

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
    this.requestServ.httpUsersGet()
    .subscribe((response: User) => {
      // tslint:disable-next-line: forin
      for (let i in response) {
        console.log(response);
        this.usersData.push(response[i]);
      }
    });
    this.requestServ.httpBooksGet()
    .subscribe((response: Book) => {
      // tslint:disable-next-line: forin
      for (let i in response) {
        console.log(response);
        this.booksData.push(response[i]);
      }
    });
  }
}
