import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatService } from './../service/chat.service';
import { create } from 'domain';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { HttpHeaders } from '@angular/common/http';


// import * as Amqp from "amqp-ts";
 
//var amqp = require('amqp-ts'); // normal use
//var amqp = require('../../lib/amqp-ts'); // for use inside this package






@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(private chatService: ChatService ) { }
  chats = [];
  Uname;
  Avatar;
  entity = null;
  msgs = [];
  private hubConnection: HubConnection;
  ngOnInit() {
    // this.hubConnection = new signalR.HubConnectionBuilder()
    // .withUrl("http://192.168.99.1:8000/chat")
    // .build();
    // this.hubConnection
    //   .start()
    //   .then(() => console.log('Connection started!'))
    //   .catch(err => console.log(err));

    // this.hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
    //   this.msgs.push({ severity: type, summary: payload });
    //   console.log(this.msgs);
      
    // });

    this.Uname = this.chatService.getUname();
    this.Avatar = this.chatService.getAvatar();
    //console.log(this.Avatar);
    // var that = this;
    
    this.chatService.get(this.Uname).subscribe(
      data => {
        console.log(data);
        console.log('aaa');
        
        // that.chats = data.message;
        // switch (data.Message.slice(-1)[0]) {
        //   case "type the name of repo":
        //     this.entity = "create_repo";
        //   default:
        //     this.entity = null;
        // }
      }
    );
  }
  submitForm = new FormGroup({
    submitInput: new FormControl(''),
  });
  onSubmit() {
    //console.log(this.submitForm.get('submitInput').value);
    //this.submitForm.get('submitInput').value;
    var name;
    var issue;
    var uname;
    var arr = this.submitForm.get('submitInput').value.split(" ");
    arr.forEach(element => {
      if(element.includes("_repo")){
        element = element.substring(0, element.length - 5);
      name = element;}
      if(element.includes("_issue")){
        element = element.substring(0, element.length - 6);
      issue = element;}
      if(element.includes("_uname")){
        element = element.substring(0, element.length - 6);
      uname = element;}
    });
    console.log(name, issue, uname);
    
    const query1 = {
      Uname: this.Uname,
      message: this.submitForm.get('submitInput').value,
      entity: this.entity
    }
    //console.log(query1);
    
    // const query = `{"Uname":"` + this.Uname + `","Message":"` + this.submitForm.get('submitInput').value + `","entity":`+this.entity+`"}`;
    // console.log(JSON.parse(query));
    //this.chats.push(query1);
    this.chats.push(query1);
    this.chatService.add(query1).subscribe(res => {
      this.chats.push({
        message: "Query executed successfully"
      });
      console.log("query stored");

    }, err => {
      this.chats.push({
        message: "error while executing query try again"
      });
    });
  }
}
