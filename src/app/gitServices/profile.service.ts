import { Injectable } from '@angular/core';
import { User } from '../githubClass/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  user!: User;

  constructor(private http: HttpClient) {
    this.user = new User('', '', 0, 0, 0);
  }

  userRequest() {
    interface ApiResponse {
      login: string;
      avatar_url: string;
      public_repos: number;
      followers: number;
      following: number;
    }
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<ApiResponse>('https://api.github.com/users/Ephraim19')
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
    });
    return promise;
  }
}
