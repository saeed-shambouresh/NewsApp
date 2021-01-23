import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { AddAlert } from "../actions/Alert.actions";
import { Ialert } from "../Interface/Alert";

export class AlertStateModel {
    Alert: Ialert;
}
@State<AlertStateModel>({
    name: 'Alert',
    defaults: {
        Alert: undefined,
    }
})
@Injectable()
export class AlertState {
    constructor() {
    }
    @Selector()
    static GetAlert(state: AlertStateModel) {
        return state.Alert;
    }
    @Action(AddAlert)
    SetIsAlert({ getState, setState }: StateContext<AlertStateModel>, { Alert }: AddAlert) {
        const state = getState();
        setState({
            ...state,
            Alert: Alert
        });
    }
}