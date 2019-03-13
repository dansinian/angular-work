import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_ICONS  } from 'ng-zorro-antd';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './common/home.component';
import { DetailComponent } from './common/detail.component';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
import { NavComponent } from './common/nav.component';
import { AvatarComponent } from './common/avatar.component';
import { PostDatilComponent } from './common/post-datil.component';
import { ViewAttentionComponent } from './common/view-attention.component';

registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AvatarComponent,
    PostDatilComponent,
    ViewAttentionComponent
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
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
