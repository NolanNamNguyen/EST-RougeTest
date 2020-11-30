import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleContainerComponent } from './article-container.component';

const routes: Routes = [
  { path: '', component: ArticleContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleContainerRoutingModule { }
