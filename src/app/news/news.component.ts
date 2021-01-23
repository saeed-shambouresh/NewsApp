import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetTopNews, LoadTopNews } from '../actions/News.action';
import { News } from '../model/news';
import { NewsState } from '../states/News.state';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Select(NewsState.GetTopNews) topNews$: Observable<News[]>;
  math;
  page = 1;
  topNews: News[];
  faRefresh;
  constructor(private store: Store) {
    this.faRefresh = faSync;
    this.math = Math;
    this.topNews$.subscribe(res => {
      this.topNews = res;
      console.log(res);
      if (!this.topNews.length)
        this.loadData();

    })
  }
  loadData() {
    this.store.dispatch(new LoadTopNews());
  }
  ngOnInit(): void {
  }
  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
