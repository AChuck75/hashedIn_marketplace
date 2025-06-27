import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SortService {
  private sortTypeSubject = new BehaviorSubject<string>('');
  sortType$ = this.sortTypeSubject.asObservable();

  setsortType(type: string) {
    this.sortTypeSubject.next(type);
  }
}