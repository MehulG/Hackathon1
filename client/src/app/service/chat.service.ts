import { Injectable, Output } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, BehaviorSubject } from 'rxjs';
import { Options } from 'selenium-webdriver/opera';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  data;
  subject:BehaviorSubject<any> = new BehaviorSubject(this.data);

  constructor(private httpClient: HttpClient) { }
  public get(Uname): Observable<any> {
    console.log("get");
    
    // this.data = this.httpClient.get(`http://localhost:5001/api/ChatDetails`+Uname);
    console.log(this.httpClient.get(`http://localhost:5000/api/ChatDetails/`+ Uname));
    this.data = this.httpClient.get(`http://localhost:5000/api/ChatDetails/`+ Uname);
    //  {headers: new HttpHeaders({
    //   "Content-Type": "application/json",
    //   'Access-Control-Allow-Origin': '*'
    // })});
     return of(this.subject);
  }
  flag = 0;
  public add(msg):Observable<any>{
    var a;
    var flag = 0;
    this.data = null;
      
    console.log('add method', sessionStorage.getItem('name'));
    
    return this.httpClient.post("http://localhost:5000/api/ApiService/"+sessionStorage.getItem('name'),
    {
      "Uname": msg.Uname,
      "Message" : msg.message,
      "Client": true,
      "Date":Date().toString()
    })
    // .subscribe(
    //   res => {
    //     console.log("from server",res);
    //     (this.subject.next(this.data));

        
    //   },
    //   error => {
    //     console.log(error);
    //     (this.subject.next(this.data));
    //     // return a;
    //   }
      
    // );
    // return this.subject;

  }
  userName;
  repoName;
  jsonName;
  jsonRepo;
  UserName;
  avatar
  setUname(name){
    console.log('aaaa',name);
    sessionStorage.setItem('name',name);
    this.UserName = name;
  }
  setAvatar(avatar){
    sessionStorage.setItem('avatar',avatar);
    this.avatar = avatar;
  }
  setDetails(obj){
    var c = obj.toString();
    sessionStorage.setItem("data",c);
  }
  
  getAvatar(){
    return sessionStorage.getItem('avatar');
  }
  getUname(){
    return sessionStorage.getItem('name');
  }
  API_KEY = 'b7704a6c3f43efd60b82c6ccc4f10a35a1ad347b';
  public userProfile(){
    this.httpClient.get(`https://api.github.com/user?access_token=` + this.API_KEY,
    {headers: new HttpHeaders({Authorization : "Bearer " +  this.API_KEY})})
    .subscribe(res => {
     // console.log(res);
      this.jsonName=res;
      //this.UserName=this.jsonName.name;
     // console.log(this.UserName);
      console.log(this.jsonName);
      return this.jsonName;
      
    });
    //console.log(this.jsonName);
    //return this.jsonName;
    }
  public userRepos(){
    this.httpClient.get(`https://api.github.com/user/repos?access_token=`+this.API_KEY,
    {headers: new HttpHeaders({"Authorization" : "Bearer " +  this.API_KEY})})
    .subscribe(res => {
    //  console.log(res);
      this.jsonRepo=res;
      this.repoName=this.jsonRepo.name;
    console.log(res);
      return this.jsonRepo;
    });
  }
}
