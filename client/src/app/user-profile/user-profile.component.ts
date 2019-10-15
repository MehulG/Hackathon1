import { Component, OnInit } from '@angular/core';
import{ChatService} from '../service/chat.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private chatService: ChatService,private route: ActivatedRoute) { }
   jsonName;
  ngOnInit() {
    //var a=
    this.UserProfile();
    this.UserRepos();
    //console.log(a);
}
UserProfile(){
  //console.log('profile',this.chatService.userProfile());
  this.jsonName=this.chatService.userProfile();
  console.log('user-profile',this.jsonName);

}
UserRepos(){
  console.log('repos',this.chatService.userRepos());
}
setimg(){
  return sessionStorage.getItem('avatar');
}
}
