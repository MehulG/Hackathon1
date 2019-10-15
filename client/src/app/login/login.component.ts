import { Component, OnInit } from '@angular/core';
import { ChatService } from './../../app/service/chat.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'
import 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private chatService: ChatService, private httpclient: HttpClient, private router: Router) { }
  data;
  auth_url = 'https://github.com/login/oauth/authorize';
  redirect_url = 'https://localhost:4200';
  clientId = 'f08f84679de56701ddf4'

  Uname = '';


  _window(): any {
    // return the global native browser window object
    return window;
  }





  ngOnInit(): void {


    const oauthScript = document.createElement('script');
    oauthScript.src = 'https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js';
    document.body.appendChild(oauthScript);


    this.chatService.get(this.Uname).subscribe(res => { this.data = res; })
  }
  handleClick(e) {

    e.preventDefault();
    this._window().OAuth.initialize('J7xjY8iuulXzS52VEEdvqDp77eA');

    this._window().OAuth.popup('github').then((provider) => {
     console.log(provider);
     console.log('access token ',provider.access_token);


      provider.me().then((data) => {
        console.log('data: ', data);
        this.Uname = data.alias;
        console.log(this.Uname);
        this.chatService.setUname(this.Uname);
        this.chatService.setAvatar(data.avatar);
        this.httpclient.post('http://server/api/ChatDetails',{
          "access_token": provider.access_token,
          "Uname": this.data.alias
        },{headers: new HttpHeaders({"Access-Control-Allow-Origin": "*"})}).subscribe(
         (res)=>{this.router.navigate(['/chat'])},
          error =>{
            console.log("Server did not recieve access token ",error);

          }
        );
      });

    });
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   var header = new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*',
  //      "client_id": "f08f84679de56701ddf4"
  //     //"redirect_uri": "http://localhost:4200/",

  //   });
  //   header.set("client_id", "f08f84679de56701ddf4");

  //   // let params = new HttpParams({
  //   // }).set()
  //   // .set("redirect_uri", "https://localhost:4200")
  //   // .set("scope", "repo"); //Create new HttpParams
  //   // console.log(params);

  //   var p = this.httpclient.get('https://github.com/login/oauth/authorize', { headers: header }).subscribe(
  //     res => console.log(res)

  //   );
  // }
  title = 'cilent';
}
