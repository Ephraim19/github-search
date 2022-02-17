import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../gitServices/profile.service';
import { User } from '../githubClass/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  user!: User;
  search!: string;
  constructor(
    private profileservice: ProfileService,
    private http: HttpClient
  ) {
    this.user = new User('', '', 0, 0, 0);
  }

  searchProfiles() {
    interface ApiResponse {
      login: string;
      avatar_url: string;
      public_repos: number;
      followers: number;
      following: number;
    }
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<ApiResponse>('https://api.github.com/users/' + this.search, )
        .toPromise()
        .then(
          (response: any) => {
            this.user.login = response.login;
            this.user.avatar_url = response.avatar_url;
            this.user.public_repos = response.public_repos;
            this.user.followers = response.followers;
            this.user.following = response.following;
            console.log(this.user.avatar_url);
            resolve(response);
          },
          (error) => {
            this.user.login = 'Ephraim19';
            this.user.avatar_url =
              'https://avatars.githubusercontent.com/u/57092540?v=4';
            this.user.public_repos = 14;
            this.user.followers = 3;
            this.user.following = 2;

            reject(error);
            console.log();
          }
          
        );
    });
    
    return promise;
  }
  //'https://api.github.com/users/${Ephraim19}/repos'
  ngOnInit(): void {
    this.profileservice.userRequest();
    this.user = this.profileservice.user;
  }
}
