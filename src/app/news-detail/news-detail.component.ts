import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { News } from '../model/news';
import { NewsDetail } from '../model/newsDetail';
import { NewsState } from '../states/News.state';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  @Select(NewsState.GetCurrentNews) currentNews$: Observable<News>;

  constructor() { }

  ngOnInit(): void {
  }

}
