import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash, faKey, faPassport, faUser } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { Login } from '../actions/Auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  submitted = false;
  faUser = faUser;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  

  constructor(private store: Store, private formBuilder: FormBuilder) {
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
      this.store.dispatch(new Login(this.f.EmailAddress.value, this.f.Password.value)).subscribe(() => {
        this.submitted = false;
      })
    }
  }
}
