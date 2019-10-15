import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message:any;
  constructor(private http: HttpClient) { }
  text;
  ngOnInit() {
     console.log(this.message);
    
   this.text = this.message.message;
  }
}
