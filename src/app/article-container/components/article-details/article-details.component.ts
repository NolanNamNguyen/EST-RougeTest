import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core/models/article';
import { error } from '@angular/compiler/src/util';
import { concatMap, first, map, take, takeUntil, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
    ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        concatMap((params) => this.apiService.getArticleWithId(+params.get('id'))),
        tap((article) => (this.article = article)),
      )
      .subscribe();
  }
}
