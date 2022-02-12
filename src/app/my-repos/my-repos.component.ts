import { Component, OnInit } from '@angular/core';
import { Repos } from '../githubClass/repos';
import { RepositoriesService } from '../gitServices/repositories.service';

@Component({
  selector: 'app-my-repos',
  templateUrl: './my-repos.component.html',
  styleUrls: ['./my-repos.component.css']
})
export class MyReposComponent implements OnInit {
  repos!: Repos[]

  constructor(private reposService:RepositoriesService) { }

  ngOnInit(): void {
    this.reposService.reposRequest()
    this.repos = this.reposService.repos
  }

}
