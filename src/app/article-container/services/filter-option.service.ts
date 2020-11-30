import { Injectable } from '@angular/core';

@Injectable()
export class FilterOptionService {
  searchOption: string;
  searchContent: string;
  itemsPerPage: number;
  selectedPage: number;
  sortByOption: string;
  orderOption: string;

  constructor() { }
}
