import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CvListComponent } from './cv-list/cv-list.component'; 
import { CvFormComponent } from './cv-form/cv-form.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CvListComponent, 
    CvFormComponent,
    CustomAlertComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    ModalModule.forRoot(),
    HttpClientModule,
    ImageCropperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{ }
 