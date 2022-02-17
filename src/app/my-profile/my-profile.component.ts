import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../gitServices/profile.service';
import { RepositoriesService } from '../gitServices/repositories.service';
import { User } from '../githubClass/user';
import { HttpClient } from '@angular/common/http';
import { Repos } from '../githubClass/repos';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  user!: User;
  search: string = 'Ephraim19';
  repos!: Repos[];

  constructor(
    private profileservice: ProfileService,
    private http: HttpClient,
    private reposService:RepositoriesService
  ) {
    this.user = new User('', '', 0, 0, 0);
    this.repos = [new Repos('', '', '')];
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
        .get<ApiResponse>('https://api.github.com/users/' + this.search)
        .toPromise()
        .then(
          (response: any) => {
            this.user.login = response.login;
            this.user.avatar_url = response.avatar_url;
            this.user.public_repos = response.public_repos;
            this.user.followers = response.followers;
            this.user.following = response.following;
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
          }
        );
      this.http
        .get<ApiResponse>('https://api.github.com/users/'+this.search+'/repos')
        .toPromise()
        .then(
          (response: any) => {
            for (let i = 0; i < response.length; i++) {
              this.repos[i].name = response[i].name;
              this.repos[i].url = response[i].html_url;
              this.repos[i].description = response[i].description;
              console.log(this.repos[i]);
              this.repos.push(
                new Repos(
                  this.repos[i].name,
                  this.repos[i].url,
                  this.repos[i].description
                )
              );
            }
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
          }
        );
    });

    return promise;
  }

  ngOnInit(): void {
    this.profileservice.userRequest();
    this.user = this.profileservice.user;

    this.reposService.reposRequest()
    this.repos = this.reposService.repos
  }
}
