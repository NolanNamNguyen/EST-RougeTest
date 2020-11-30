import { FilterOptionService } from './services/filter-option.service';
import { ApiService } from './services/api.service';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Article } from '../core/models/article';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { tap, concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.scss'],
})
export class ArticleContainerComponent implements OnInit {
  articleList: Article[];
  isNextDisabled: boolean;
  finalPage = 3;
  isPrevDisabled: boolean;
  optionVisible: boolean = true;
  sortOption = ['createdAt','title'];
  orderOption = ['asc','desc'];
  searchOptionList = ['search','filter','title']
  paginationPages = [ 2 , 1 , 0 ];
  constructor(
    private apiService: ApiService,
    private router: Router,
    public filterList: FilterOptionService
    ) {}

  ngOnInit() {
    this.filterList.selectedPage = 1;
    this.filterList.itemsPerPage = 5;
    this.filterList.searchOption = this.searchOptionList[2];
    this.updateArticleList(this.filterList.selectedPage);
  }

  // ↓ This function will update article list each time user interact with the pagination
  updateArticleList(pagiSelectedPage: number){
    this.filterList.selectedPage = pagiSelectedPage;
    if(this.filterList.selectedPage == 1){
      this.finalPage = 3;
      this.isPrevDisabled = true;
    }else{
      this.isPrevDisabled = false;
    }
    if(this.filterList.selectedPage == this.finalPage){
      this.checkFinalPage(this.filterList.selectedPage);
    }else{
      this.isNextDisabled = false;
    }
    this.apiService.getPageArticleList().pipe(tap(
      (data) => {
        this.articleList = data;
      }
    )).subscribe();
  }
  // ↑ This function will update article list each time user interact with the pagination

  checkFinalPage(pageNum: number){
    this.apiService.getPageArticleList().pipe(map(
      (data) => {
        if(data.length < this.filterList.itemsPerPage){
          this.isNextDisabled = true;
        }else{
          this.isNextDisabled = false;
        }
      }
    )).subscribe();
  }

  nextBtnClick(){
    if(this.filterList.selectedPage == this.finalPage){
      this.finalPage++;
    }
    this.filterList.selectedPage++;
    this.updateArticleList(this.filterList.selectedPage);
  }

  preBtnClick(){
    this.filterList.selectedPage--;
    if(this.filterList.selectedPage < this.finalPage - 2){
      this.finalPage--;
    }
    this.updateArticleList(this.filterList.selectedPage);
  }

  // onChangePage(pageOfItems: Array<Article>) {
  //   // update current page of items
  //   this.pageOfItems = pageOfItems;
  // }

  toArticleDetail(inArticle: Article){
    this.router.navigate([`/article-details/${inArticle.id}`]);
  }

  getSearchOption(option: string){
    this.filterList.searchOption = option;
    this.optionVisible = !this.optionVisible
  }

  getSortOption(option: string){
    this.filterList.selectedPage = 1;
    this.filterList.sortByOption = option;
    this.updateArticleList(this.filterList.selectedPage);
  }

  getOrderOption(option: string){
    this.filterList.selectedPage = 1;
    this.filterList.orderOption = option;
    this.updateArticleList(this.filterList.selectedPage);
  }
  
  onSearchEnter(){
    this.filterList.selectedPage = 1;
    this.updateArticleList(this.filterList.selectedPage);
  }

  checkLimitInput(event: any){
    //allow number input only
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.which);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
