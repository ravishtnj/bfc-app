import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import {PopupModule} from 'ng2-opd-popup';

import {BFCServices} from './Services/BFCServices';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './userReg/user-registration/user-registration.component';
import { UserProfileComponent } from './userReg/user-profile/user-profile.component';

@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
    // PopupModule.forRoot()
  ],
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserProfileComponent
  ],
  providers: [BFCServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
