import { Component } from '@angular/core';
import {ChatService} from './../app/service/chat.service';
import {HttpClient} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import{Router} from '@angular/router'
import 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private chatService:ChatService, private httpclient:HttpClient, private router:Router){}
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


    this.chatService.get(this.Uname).subscribe(res => {this.data = res;})
    }
    handleClick(e) {
      // Prevents page reload
      e.preventDefault();
  
      // Initializes OAuth.io with API key
      // Sign-up an account to get one
      this._window().OAuth.initialize('J7xjY8iuulXzS52VEEdvqDp77eA');

      // Popup Github and ask for authorization
      this._window().OAuth.popup('github').then((provider) => {
       console.log(provider);
       console.log('access token ',provider.access_token);

        
        // Prompts 'welcome' message with User's name on successful login
        // Check console logs for additional User info
        provider.me().then((data) => {
          console.log('data: ', data);
          this.Uname = data.alias;
          console.log(this.Uname);
          this.httpclient.post('http://localhost:5000',{
            "access_token": provider.access_token,
            "Uname": this.data.alias
          }).subscribe(
           // (res)=>{this.router.navigate(['/chat'])},
            error =>{
              console.log("Server did not recieve access token ",error);
              
            }
          );
          this.router.navigate(['/chat'])
          //alert('Welcome ' + data.name + '!');
        });
  
        // You can also call Github's API using .get()
        // provider.get('/user').then((data) => {
        //   console.log('self data:', data);
        // });
      });
    }

    // gitHub(){
    //   this.data = this.httpclient.get('https://github.com/login/oauth/authorize?scope=user:email&client_id='+this.clientId+'&redirect_uri='+this.redirect_url).map(res=>{
    //     res.json();
    //   });
    //   console.log(this.data);
      
    // }
  title = 'cilent';
}
