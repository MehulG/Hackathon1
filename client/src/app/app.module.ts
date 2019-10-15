import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './message/message.component';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatIcon } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    MessageComponent,
    UserProfileComponent,
  ],
  imports: [
    MatGridListModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    ScrollingModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
