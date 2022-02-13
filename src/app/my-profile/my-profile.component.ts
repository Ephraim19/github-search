import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../gitServices/profile.service';
import { User } from '../githubClass/user';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user !: User
  constructor(private profileservice:ProfileService) { }

  searchProfiles(){
    console.log('eph')
  }

  ngOnInit(): void {
    this.profileservice.userRequest()
    this.user = this.profileservice.user
  }
  
}
