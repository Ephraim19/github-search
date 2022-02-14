import { Component, OnInit } from '@angular/core';
import { Repos } from '../githubClass/repos';
import { RepositoriesService } from '../gitServices/repositories.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-my-repos',
  templateUrl: './my-repos.component.html',
  styleUrls: ['./my-repos.component.css']
})
export class MyReposComponent implements OnInit {
  repos!: Repos[]
  search!:string

  constructor(private reposService:RepositoriesService,private http:HttpClient) {
    this.repos = [new Repos('', '','')];
   }
  searchRepos(){
    interface ApiResponse {
      name: string;
      url: string;
    }
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<ApiResponse>('https://api.github.com/users/Ephraim19/' + this.search)
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
  ngOnInit(): void {
    this.reposService.reposRequest()
    this.repos = this.reposService.repos
  }

}
