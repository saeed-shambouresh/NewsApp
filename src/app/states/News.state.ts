import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { GetTopNews, LoadNewsDetails, LoadTopNews } from "../actions/News.action";
import { SetIsUiLoading } from "../actions/Ui.action";
import { News } from "../model/news";
import { NewsService } from "../services/news.service";

export class TopNewsStateModel {
    TopNews: News[];
    CurrentNews: News;
}
@State<TopNewsStateModel>({
    name: 'TopNews',
    defaults: {
        TopNews: [],
        CurrentNews: undefined
    }
})
@Injectable()
export class NewsState {
    constructor(private newsService: NewsService, private store: Store) {
    }
    @Selector()
    static GetTopNews(state: TopNewsStateModel) {
        return state.TopNews;
    }
    @Selector()
    static GetCurrentNews(state: TopNewsStateModel) {
        return state.CurrentNews;
    }
    @Action(LoadTopNews)
    LoadTopNews({ getState, setState }: StateContext<TopNewsStateModel>) {
        this.store.dispatch(new SetIsUiLoading(true));
        return this.newsService.getTopNews().pipe(tap(news => {
            const state = getState();
            setState({
                ...state,
                TopNews: news
            });
            this.store.dispatch(new SetIsUiLoading(false));
        }))

    }
    @Action(LoadNewsDetails)
    LoadNewsDetails({ getState, patchState }: StateContext<TopNewsStateModel>, action: LoadNewsDetails) {
        this.store.dispatch(new SetIsUiLoading(true));
        const state = getState();
        let currentNews = { ...state.TopNews.filter(r => r.id == action.newsId)[0] };
        return this.newsService.getNewsCommets(currentNews.kids || []).pipe(tap(commets => {
            currentNews.commits = commets;
            patchState({
                CurrentNews: currentNews
            });
            this.store.dispatch(new SetIsUiLoading(false));
        }))

    }
}