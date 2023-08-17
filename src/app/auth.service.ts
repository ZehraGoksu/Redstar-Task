// authentication.service.ts

import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private validUsername = 'admin';
  private validPassword = 'password';
  private maxLoginAttempts = 3;
  private loginAttempts = 0;
  private lastLoginTime: Date | null = null;
  bsModalRef: BsModalRef | undefined; 
  

constructor(private modalService: BsModalService) {}
  authenticate(username: string, password: string): boolean {
    if (this.isLoginLocked()) {
      alert('Yanlış giriş yapma hakkınız doldu');
      return false;
    }

    if (username === this.validUsername && password === this.validPassword) {
      this.resetLoginAttempts();
      this.showAlert('success', 'Giriş yapıldı!'); 
      return true;  
    } else {
      this.loginAttempts++;
      if (this.loginAttempts >= this.maxLoginAttempts) {
        this.showAlert('danger', ' 3 kez yanlış şifre girdiniz. Lütfen 10 dakika sonra tekrar deneyiniz.');
        this.lastLoginTime = new Date();
      }else {
        this.showAlert('warning', 'Yanlış kullanıcı adı veya şifre.');
      }
      return false;
    }
  
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

  showAlert(type: string, message: string): void {
    this.bsModalRef = this.modalService.show(AlertComponent);
    if (this.bsModalRef.content) {
      this.bsModalRef.content.type = type;
      this.bsModalRef.content.message = message;
    }
    setTimeout(() => {
      this.bsModalRef?.hide();
    }, 5000); 
  }
} 