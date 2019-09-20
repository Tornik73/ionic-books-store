import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HTTPRequestsService } from './http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public availableChatsForUser = new BehaviorSubject<number[]>([]);
  public notAcceptedInvitesToChat = new BehaviorSubject<number[]>([]);

  constructor(private http: HTTPRequestsService) {

  }

  public addNotAcceptedChatInvite(newNotAcceptedChat: number): void {
    const newState: number[] = this.addChatTo(this.notAcceptedInvitesToChat, newNotAcceptedChat);
    this.notAcceptedInvitesToChat.next(newState);
  }

  public deleteChatInvite(inviteToAccept: number): void {
    const chats: number[] = this.notAcceptedInvitesToChat.getValue();
    const index: number = chats.findIndex((value) =>  value === inviteToAccept);
    chats.splice(index);
    this.notAcceptedInvitesToChat.next(chats);
  }

  public addNewAvailableChat(newAvailableChat: number): void {
    const newState: number[] = this.addChatTo(this.availableChatsForUser, newAvailableChat);
    this.availableChatsForUser.next(newState);
  }

  public leaveChat(inviteToAccept: number): void {
    const chats: number[] = this.availableChatsForUser.getValue();
    const index: number = chats.findIndex((value) =>  value === inviteToAccept);
    chats.splice(index);
    this.availableChatsForUser.next(chats);
  }


  private addChatTo(behaviorSubject: BehaviorSubject<number[]>, newChatTtem: number): number[] {
    let chats: number[] = behaviorSubject.getValue();
    chats.push(newChatTtem);
    chats = [...new Set(chats)]; // removing the same chat to apply
    return chats;
  }
}
