import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../auth.models';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    public router: Router
    ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(new AuthenticationRequest(username, password))
    }
  }

  navigateToRegister() {
  try {
    this.router.navigate(['register']);
  } catch (error) {
    console.error('Navigation failed', error);
  }
}
}

