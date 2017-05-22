import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { rootRouterConfig } from './app.router';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {PopupModule} from 'ng2-opd-popup';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ViewcommentComponent } from './viewcomment/viewcomment.component';
import {DATATestService} from './data-test.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsComponent,
    ViewcommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    AlertModule.forRoot(),
    PopupModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'})
  ],
  providers:[DATATestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
