import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './common/home.component';
import { PostDatilComponent } from './common/post-datil.component';
import { ViewAttentionComponent } from 'src/app/common/view-attention.component';
import { PersonPageComponent } from './common/person-page.component';
import { QuestionContentComponent } from './common/question-content.component';

const routes: Routes = [
 { path: '', redirectTo: '/home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent, canActivate: [] },
 { path: 'view-attention', component: ViewAttentionComponent },
 { path: 'post-datil', component: PostDatilComponent },
 { path:  'person', component: PersonPageComponent },
 { path: 'questionContent', component: QuestionContentComponent },
 { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
 
 // { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
