import { FilterOptionService } from './services/filter-option.service';
import { ArticleDetailService } from './services/article-detail.service';
import { ApiService } from './services/api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleContainerRoutingModule } from './article-container-routing.module';
import { ArticleContainerComponent } from './article-container.component';
import { ArticleComponent } from './components/article/article.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleContainerComponent, ArticleComponent, ArticleDetailsComponent],
  imports: [
    CommonModule,
    ArticleContainerRoutingModule,
    JwPaginationModule,
    FormsModule
  ],
  providers: [
    ApiService, 
    ArticleDetailService,
    FilterOptionService
  ]
})
export class ArticleContainerModule { }
