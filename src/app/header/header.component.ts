import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../states/Auth.state';
import { IUserData } from '../Interface/UserData';
import { Logout } from '../actions/Auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Select(AuthState.GetCurrentUser) currentUser$: Observable<IUserData>;
  constructor(private store: Store) { }

  ngOnInit(): void {
  }
  logOut() {
    this.store.dispatch(new Logout());
  }
}

