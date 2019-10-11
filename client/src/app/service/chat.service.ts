import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  data;
  subject:BehaviorSubject<any> = new BehaviorSubject(this.data);

  constructor(private httpClient: HttpClient) { }
  public get(Uname): Observable<any> {
    this.data = this.httpClient.get(`http://localhost:5000/`+Uname);
    return of(this.subject);
  }
  public add(msg):Observable<any>{
    this.httpClient.post("http://localhost:5000/",
    {
      "Uname": msg.Uname,
      "Message" : msg.message,
      "Client": true,
      "DateTime": Date()
    }).subscribe(
      res => {
        this.data = res;
        return (this.subject.next(this.data));
        
      },
      error => {
        console.log(error);
        return of(this.subject.next(this.data))
      }
    );
    return of(1);
  }
}
