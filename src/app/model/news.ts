import { NewsDetail } from "./newsDetail";

export class News {
    constructor(public id: number, public title: string, public type: string,
        public date: string, public author: String, public score: number, public kids: number[], public commits: NewsDetail[]) { }
}