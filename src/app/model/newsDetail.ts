import { Observable } from "rxjs";

export class NewsDetail {
    constructor(public id: number, public text: string, public time: number,
        public date: string, public by: String) { }
}