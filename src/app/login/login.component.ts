import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formControls: any = {
    username: [''],
    password: [''],
  };

  loginForm: FormGroup = this.formBuilder.group(this.formControls);
  attempts: number = 0;
  bsModalRef: BsModalRef | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  login() {
    if (
      this.authService.authenticate(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      )
    ) {
      this.router.navigate(['/cvs']);
    }
  }
}
