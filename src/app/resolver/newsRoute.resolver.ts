import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { GetTopNews, LoadNewsDetails, LoadTopNews } from '../actions/News.action';
import { NewsService } from '../services/news.service';
import { NewsState } from '../states/News.state';

@Injectable()
export class NewsRouteResolver implements Resolve<any> {

    constructor(public store: Store, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot) {
        let myParam = route.params['id'];
        return this.store.dispatch(new LoadNewsDetails(myParam)).pipe(
            map(() => {
                if (!this.store.selectSnapshot(NewsState.GetCurrentNews).id)
                    this.router.navigate(['/NotFound']);
            })
        );
    }

}