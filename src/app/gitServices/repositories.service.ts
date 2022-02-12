import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repos } from '../githubClass/repos';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  repos!: Repos[];
  constructor(private http: HttpClient) {
    this.repos = [new Repos('', '')];
  }
  reposRequest() {
    interface ApiResponse {
      name: string;
      url: string;
    }
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<ApiResponse>(environment.reposUrl)
        .toPromise()
        .then(
          (response: any) => {
            for (let i = 0; i < response.length; i++) {
              this.repos[i].name = response[i].name;
              this.repos[i].url = response[i].html_url;
              console.log(this.repos[i]);

              this.repos.push(this.repos[i]);
            }

            resolve(response);
          },
          (error) => {
            this.repos[0].name = 'eph';
            this.repos[0].url = 'ephu';
            reject(error);
          }
        );
    });
    return promise;
  }
}
