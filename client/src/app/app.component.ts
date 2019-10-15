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
}
