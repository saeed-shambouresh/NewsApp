
export class GetIsUiLoading {
    static readonly type = "[Base] Get Is UI Loading"
}
export class SetIsUiLoading {
    static readonly type = "[Base] Set Is Ui Loading"
    constructor(public flag: boolean) { }
}
