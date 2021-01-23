import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Navigate } from "@ngxs/router-plugin";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { AddAlert } from "../actions/Alert.actions";
import { Login, Logout } from "../actions/Auth.action";
import { SetIsUiLoading } from "../actions/Ui.action";
import { IUserData } from "../Interface/UserData";
import { AuthService } from "../services/auth.service";
import { AlertState } from "./Alert.state";

export class AuthStateModel {
    CurrentUser: IUserData;
}
@State<AuthStateModel>({
    name: 'Auth',
    defaults: {
        CurrentUser: undefined,
    }
})
@Injectable()
export class AuthState {
    constructor(private authService: AuthService, private store: Store, private router: Router) {
    }
    @Selector()
    static GetCurrentUser(state: AuthStateModel) {
        return state.CurrentUser;
    }
    @Action(Logout)
    Logout({ getState, setState }: StateContext<AuthStateModel>) {
        const state = getState();
        setState({
            ...state,
            CurrentUser: undefined
        });
        this.store.dispatch(new Navigate(['/Login']))
    }
    @Action(Login)
    Login({ getState, setState }: StateContext<AuthStateModel>, { UserName, Password }: Login) {
        this.store.dispatch(new SetIsUiLoading(true));
        const state = getState();
        const res = this.authService.login(UserName, Password);
        if (res) {
            setState({
                ...state,
                CurrentUser: res
            });
            this.store.dispatch(new Navigate(['/']))
        }
        else
            this.store.dispatch(new AddAlert({ Message: "Username Or Password Is Wrong", Title: "Error", Route: "/Login" }));
        this.store.dispatch(new SetIsUiLoading(false));
    }
}