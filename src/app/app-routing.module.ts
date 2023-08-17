import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CvListComponent } from './cv-list/cv-list.component';
import { CvFormComponent } from './cv-form/cv-form.component';
import { CvDetailComponent } from './cv-detail/cv-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cv', component: CvFormComponent },
  { path: 'cvs', component: CvListComponent },
  { path: 'cv/:index', component: CvDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 


  