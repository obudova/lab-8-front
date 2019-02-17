import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  handleLogin() {
    this.authService.login(this.loginForm.value).subscribe((res) => {
      this.setToken(res);
    });
  }

  setToken(res) {
    localStorage.setItem('token', res.jwt);
    localStorage.setItem('user',
      JSON.stringify(
        JSON.parse(atob(res.jwt.split('.')[1]))
      )
    );
    this.router.navigate(['/']);
  }
}
