import { Component } from '@angular/core';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  attempts: number = 0;
  bsModalRef: BsModalRef | undefined;

  constructor(private router: Router,private authService: AuthenticationService) {}
  login() {
    if (this.authService.authenticate(this.username, this.password)) {
        this.router.navigate(['/cvs']);
    }  
  }
}
