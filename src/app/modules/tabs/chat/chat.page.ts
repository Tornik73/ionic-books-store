import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService, NotificationService } from '../../shared';
import { FCM, NotificationData } from '@ionic-native/fcm/ngx';
import { AvalaibleChats } from '../../shared/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  public notAcceptedInvitesToChats: AvalaibleChats = new AvalaibleChats();
  public currentChats: number[] = [];
  public notAcceptedChatsSubscription: Subscription;
  public availableChatsSubscription: Subscription;
  public fcmSubscription: Subscription;

  constructor(private route: ActivatedRoute, private notificationService: NotificationService, private fcm: FCM, private router: Router) {

   }

   doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

   ngOnInit() {

    this.availableChatsSubscription = this.notificationService.availableChatsForUser.subscribe((response: number[]) => {
      this.currentChats = response;
    });
    this.notAcceptedChatsSubscription = this.notificationService.notAcceptedInvitesToChat.subscribe((response: number[]) => {
      this.notAcceptedInvitesToChats.chatsId = response;
    });

    this.fcmSubscription = this.fcm.onNotification().subscribe(data => {
      setTimeout(() => {
        if (data.wasTapped) {
          this.notificationService.addNotAcceptedChatInvite(parseInt(data.chatId, 0)); // TODO: REMOVE PARSE INT
          this.router.navigate(['/tabs/', data.landing_page]);
        } else {
          this.notificationService.addNotAcceptedChatInvite(parseInt(data.chatId, 0)); // TODO: REMOVE PARSE INT
          this.router.navigate(['/tabs/', data.landing_page]);
        }
        }, 500);
    });
  }

   ngOnDestroy() {
     this.availableChatsSubscription.unsubscribe();
     this.notAcceptedChatsSubscription.unsubscribe();
     this.fcmSubscription.unsubscribe();
   }

   acceptInvite(id: number): void {
    this.notificationService.deleteChatInvite(id);
    this.notificationService.addNewAvailableChat(id);
   }
   declineInvite(id: number): void {
    this.notificationService.deleteChatInvite(id);
   }
   leaveChat(id: number): void {
     this.notificationService.leaveChat(id);
   }
}
