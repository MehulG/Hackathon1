import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ChatService } from './chat.service';
import {observable} from 'rxjs';

describe('ChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[ChatService]
 
  }));

  it('should be created', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });
  it('should have add function', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service.add).toBeTruthy();
   });
   it('add function should not return null', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service.add({
      Uname:"a",
      message:"aaaa"
    })).not.toBeNull();
   });

   it('should have get function', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service.get).toBeTruthy();
   });
   it('should have setUname function', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service.setUname).toBeTruthy();
   });
   it('should have setAvatar function', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service.setAvatar).toBeTruthy();
   });
  //  it('should have postData function', () => {
  //   const service: LeaderboardService = TestBed.get(LeaderboardService);
  //   expect(service.postLeaderboard).toBeTruthy();
  //  });
  //  it('should have updateData function', () => {
  //   const service: LeaderboardService = TestBed.get(LeaderboardService);
  //   expect(service.updateLeaderboard).toBeTruthy();
  //  });
});
