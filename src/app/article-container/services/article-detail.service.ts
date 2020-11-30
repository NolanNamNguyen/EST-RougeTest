import { Injectable } from '@angular/core';
import { Article } from 'src/app/core/models/article';

@Injectable()
export class ArticleDetailService {
  currentArticleDetail: Article
  constructor() { }
}
