
export class Login {
    static readonly type = "[Base] Login"
    constructor(public UserName: string, public Password: string) { }
}
export class Logout {
    static readonly type = "[Base] Logout"
}

export class GetCurrentUser {
    static readonly type = "[Base] Get Current User"
}   
