import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repos } from '../githubClass/repos';
@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
   repos!:Repos[];
  constructor(private http:HttpClient) {
    this.repos = [
      new Repos("","")
    ]
   }
   reposRequest() {
    interface ApiResponse {
      name: string;
      url: string;

    }
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<ApiResponse>('https://api.github.com/users/Ephraim19/repos')
        .toPromise()
        .then(
          (response: any) => {

            this.repos[0] = response.name
            this.repos[1] = response.html_url

            resolve(response);
          },
          (error) => {

            reject(error);
          }
        );
    });
    return promise;
  }
}
