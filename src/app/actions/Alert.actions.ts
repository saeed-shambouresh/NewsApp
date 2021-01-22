import { Ialert } from "../Interface/Alert"

export class GetAlert {
    static readonly type = "[Base] Get Alert"
}
export class AddAlert {
    static readonly type = "[Base] Add Alert"
    constructor(public Alert: Ialert) { }
}
