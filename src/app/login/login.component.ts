import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      EmailAddress: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
  }
  Login() {
    this.submitted = true;
    if (this.loginForm.valid) {
    }
  }
}
