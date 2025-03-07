import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterRequest } from '../auth.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    public router: Router
    ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authService.register(new RegisterRequest(username, password))
      .pipe(take(1))
      .subscribe((response) => {
        this.registerForm.reset();
        this.router.navigate(['login']);
      });
    }
  }
}