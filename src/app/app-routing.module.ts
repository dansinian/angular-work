import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './common/error.component';
import { LoginComponent } from './common/login.component';
import { LeaveComponent } from 'src/app/leave/leave.component';
import { AccountComponent } from 'src/app/account/account.component';
import { DetailComponent } from 'src/app/detail/detail.component';
import { LoginGuardService } from './common/login-guard.service';
import { CheckComponent } from 'src/app/check/check.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }, // canActivate: [LoginGuardService]
  { path: 'leave', component: LeaveComponent  },
  { path: 'detail', component: DetailComponent },
  { path: 'account', component: AccountComponent },
  { path: 'check', component: CheckComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
