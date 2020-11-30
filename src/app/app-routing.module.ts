import { ArticleDetailsComponent } from './article-container/components/article-details/article-details.component';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ArticleContainerComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent},
  { path: '*', component: ArticleContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
