import { Component, Input, OnInit } from '@angular/core';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { News } from '../model/news';

@Component({
  selector: '[app-news-item]',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input('news') news: News;
  fapapper;
  constructor() {
    this.fapapper = faPaperclip;
  }

  ngOnInit(): void {
  }

}
