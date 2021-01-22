import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetIsUiLoading } from "../actions/Ui.action";

export class UIStateModel {
    IsLoading: boolean;
}
@State<UIStateModel>({
    name: 'IsLoading',
    defaults: {
        IsLoading: false,
    }
})
@Injectable()
export class UIState {
    constructor() {
    }
    @Selector()
    static GetUiLoading(state: UIStateModel) {
        return state.IsLoading;
    }
    @Action(SetIsUiLoading)
    SetIsUiLoading({ getState, setState }: StateContext<UIStateModel>, { flag }: SetIsUiLoading) {
        const state = getState();
        setState({
            ...state,
            IsLoading: flag
        });
    }
}