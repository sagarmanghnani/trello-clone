import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowBoardComponent } from './show-board/show-board.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'show-board',
    pathMatch:'full'
  },
  {
    path:'show-board',
    component:ShowBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
