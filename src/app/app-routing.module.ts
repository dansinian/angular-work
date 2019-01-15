import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './common/error.component';
import { LoginComponent } from './common/login.component';
import { LoginGuard } from 'src/app/common/login.guard';
import { LeaveComponent } from 'src/app/leave/leave.component';
import { AccountComponent } from 'src/app/account/account.component';
import { DetailComponent } from 'src/app/detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'leave', component: LeaveComponent },
  { path: 'detail', component: DetailComponent},
  { path: 'account', component: AccountComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }
