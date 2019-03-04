import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './common/home.component';
import { PostDatilComponent } from './common/post-datil.component';

const routes: Routes = [
 { path: '', redirectTo: '/home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent, canActivate: [] },
 { path: 'post-datil', component: PostDatilComponent },
 { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
 // { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
