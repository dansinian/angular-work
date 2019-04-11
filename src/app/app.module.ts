import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICONS  } from 'ng-zorro-antd';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './common/home.component';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
import { NavComponent } from './common/nav.component';
import { AvatarComponent } from './common/avatar.component';
import { PostDatilComponent } from './common/post-datil.component';
import { ViewAttentionComponent } from './common/view-attention.component';
import { PersonPageComponent } from './common/person-page.component';
import { QuestionContentComponent } from './common/question-content.component';

registerLocaleData(zh);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AvatarComponent,
    PostDatilComponent,
    ViewAttentionComponent,
    PersonPageComponent,
    QuestionContentComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    AppService, 
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
