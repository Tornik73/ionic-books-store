import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalUser } from '../models/index';
import { HTTPRequestsService } from './http-requests.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    currrentAvailableChats = new BehaviorSubject<number[]>([]);

  constructor(private http: HTTPRequestsService) {
  }

  public anounceChangingCurrentChats(newChats: number[]): void {
    console.log(newChats);
    this.currrentAvailableChats.next(newChats);
  }

}
