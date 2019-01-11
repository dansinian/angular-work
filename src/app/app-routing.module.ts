import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './common/error.component';
import { LoginComponent } from './common/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  { path: 'error', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
