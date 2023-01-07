import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFrameComponent,
    AuthorizationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
