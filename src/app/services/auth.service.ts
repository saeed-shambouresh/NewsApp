import { Injectable } from '@angular/core';
import { IUserData } from '../Interface/UserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: IUserData[] = [{ FullName: "Mhd Saeed Shambouresh", UserName: "saeed@gmail.com", Password: "P@ssw0rd" }, { FullName: "User1", UserName: "user1@gmail.com", Password: "User1" }, { FullName: "User2", UserName: "user2@gmail.com", Password: "User2" }];

  constructor() { }
  login(UserName: string, Password: string) {
    const ind: number = this.users.findIndex(r => r.UserName.toLowerCase().trim() == UserName.toLowerCase().trim() && r.Password == Password);
    if (ind > -1) return this.users[ind];
    else return null;
  }
}
