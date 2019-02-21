import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { HomeComponent } from './home/home.component';

const routes: Routes = [
 // { path: '', redirectTo: '/login', pathMatch: 'full' },
 // { path: 'login', component: LoginComponent, canActivate: [] },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
 // { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
