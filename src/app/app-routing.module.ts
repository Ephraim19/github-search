import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReposComponent } from './my-repos/my-repos.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {path: 'repos', component:MyReposComponent},
  {path: '',component:MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
