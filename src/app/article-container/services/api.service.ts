import { FilterOptionService } from './filter-option.service';
import { Article } from './../../core/models/article';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private filterListOptin: FilterOptionService
  ) { }

  getArticleWithId(id: number){
    return this.http.get<Article>(`/blogs/${id}`).pipe(map((res: Article) => {
      return res
    }))
  }

  getPageArticleList(){
    let filterParam = new HttpParams();
    if(this.filterListOptin.itemsPerPage){
      filterParam = filterParam.append('p',this.filterListOptin.selectedPage.toString());
      filterParam = filterParam.append('l',this.filterListOptin.itemsPerPage.toString());
    }
    if(this.filterListOptin.searchContent){
      filterParam = filterParam.append(this.filterListOptin.searchOption,this.filterListOptin.searchContent);
    }
    if(this.filterListOptin.sortByOption){
      filterParam = filterParam.append('sortBy',this.filterListOptin.sortByOption);
      filterParam = filterParam.append('order',this.filterListOptin.orderOption);
    }
    return this.http.get<Article[]>(`/blogs`,{params: filterParam}).pipe(map((res: Article[]) => {
      return res;
    }))
  }
}
