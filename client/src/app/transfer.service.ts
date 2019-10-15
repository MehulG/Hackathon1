import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {


  chat: any[] = [];
  subject: BehaviorSubject<any[]> = new BehaviorSubject(this.chat);

  constructor() { }
  
  PushInChat(value) {
    this.chat.push(value);
    return this.subject.next(this.chat);
  }

  GetChat() {
    return this.subject;
  }

}
