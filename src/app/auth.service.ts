import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'; 
import { AlertService } from '../app/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //'redstar',Redstar34.;
  //'zehra',Zehra37.
   private validPassword = 'password';
   private maxLoginAttempts = 3;
   private loginAttempts = 0;
   private lastLoginTime: Date | null = null;
   bsModalRef: BsModalRef | undefined; 
   
   private users: any[] = []
 
 constructor(private modalService: BsModalService,private http:HttpClient,private alertService:AlertService) {
   this.http.get<any>('/assets/data/users.json').subscribe(data => { 
     this.users = data.users;
   });
 }
   authenticate(username: string, password: string): boolean {
     if (this.isLoginLocked()) {
       this.alertService.showAlert('danger','Yanlış giriş yapma hakkınız doldu');
       return false;
     }
     const user = this.users.find(u => u.username === username);
      if (user && this.verifyPassword(password, user.password)) {
       this.resetLoginAttempts(); 
       this.alertService.showAlert('success', 'Giriş yapıldı!'); 
       return true;  
     } else {
       this.loginAttempts++;
       if (this.loginAttempts >= this.maxLoginAttempts) { 
         this.alertService.showAlert('danger', ' 3 kez yanlış şifre girdiniz. Lütfen 10 dakika sonra tekrar deneyiniz.');
         this.lastLoginTime = new Date();
       }else { 
        this.alertService.showAlert('warning', 'Yanlış kullanıcı adı veya şifre.');
       }
       return false;
     }
  
 }
 
 
 private verifyPassword(enteredPassword: string, hashedPassword: string): boolean {
   const decryptedPassword = CryptoJS.AES.decrypt(hashedPassword, 'secret_key').toString(CryptoJS.enc.Utf8);
   console.log(decryptedPassword)
   return enteredPassword === decryptedPassword;
 }
   private isLoginLocked(): boolean {
     if (!this.lastLoginTime) {
       return false;
     }
 
     const currentTime = new Date();
     const timeDiff = currentTime.getTime() - this.lastLoginTime.getTime();
     const minutesPassed = Math.floor(timeDiff / (1000 * 60));
 
     return minutesPassed < 10;
   }
 
   private resetLoginAttempts(): void {
     this.loginAttempts = 0;
     this.lastLoginTime = null;
   }
 
 } 