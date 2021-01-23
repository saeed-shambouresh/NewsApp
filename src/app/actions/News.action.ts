
export class GetTopNews {
    static readonly type = "[Base] Get Top News"
}

export class GetCurrentNews {
    static readonly type = "[Base] Get Current News"
}

export class LoadTopNews {
    static readonly type = "[Base] Load Top News"
}
export class LoadNewsDetails {
    static readonly type = "[Base] Load News Details"
    constructor(public newsId: number) {

    }
}
