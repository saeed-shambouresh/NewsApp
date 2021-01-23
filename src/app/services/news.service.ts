import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { News } from '../model/news';
import { NewsDetail } from '../model/newsDetail';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, public datepipe: DatePipe) {
  }

  getTopNews() {
    return this.http.get<number[]>(environment.ApiUrl + 'topstories.json?print=pretty').pipe(
      mergeMap((ids: number[]) => {
        return forkJoin(
          ids.map((id: number) => {
            return this.http.get(environment.ApiUrl + 'item/' + id + '.json?print=pretty').pipe(
              map((newsData: any): News => {
                return new News(newsData.id, newsData.title, newsData.type,
                  this.datepipe.transform(new Date(newsData.time * 1000), 'dd MMM, yyyy'), newsData.by, newsData.score, newsData.kids, []);
              })
            )
          })
        )
      })
    ).pipe(
      tap(results => {
        results.sort((one, two) => (one.score > two.score ? -1 : 1));
      })
    );
  }

  // getRecursive1(id: number): Observable<any> {
  //   return this.http.get(environment.ApiUrl + 'item/' + id + '.json?print=pretty').pipe(
  //     map((data: any): { parent: NewsDetail, childIds: number[] } => ({
  //       parent: new NewsDetail(
  //         data.id, data.text, this.datepipe.transform(new Date(data.time * 1000), 'dd MMM, yyyy'),
  //         data.by, []
  //       ),
  //       childIds: data.kids || []
  //     })),
  //     mergeMap((parentWithChildIds: { parent: NewsDetail, childIds: number[] }) => forkJoin([
  //       of(parentWithChildIds.parent),
  //       ...parentWithChildIds.childIds.map((childId: number) => this.getRecursive1(childId))
  //     ])),
  //     tap(([parent, ...children]) => parent.children = children),
  //     map(([parent,]) => parent)
  //   );
  // }
  getNewsCommets(CommitsId: number[]) {
    if (CommitsId.length <= 0)
      return of([]);
    return forkJoin(
      CommitsId.map((id: number) => {
        return this.http.get(environment.ApiUrl + 'item/' + id + '.json?print=pretty').pipe(
          map((newsData: any): NewsDetail => {
            return new NewsDetail(newsData.id, newsData.text, newsData.time,
              this.datepipe.transform(new Date(newsData.time * 1000), 'dd MMM, yyyy'), newsData.by);
          })
        )
      })
    ).pipe(
      tap(results => {
        results.sort((one, two) => (one.time > two.time ? -1 : 1));
      })
    );

  }
}
