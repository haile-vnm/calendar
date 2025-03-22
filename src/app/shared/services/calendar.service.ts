import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { getWeeksInMonth } from '../../utils/date';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private selectedDate$ = new BehaviorSubject(new Date());

  constructor() { }

  get selectedDate() {
    return this.selectedDate$.asObservable();
  }

  incrementMonth(months = 1) {
    const selectedDate = this.selectedDate$.value;
    this.selectedDate$.next(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + months, 1));
  }

  gotoToday() {
    this.selectedDate$.next(new Date());
  }

  getCurrentWeeks() {
    return this.selectedDate$.pipe(
      map(date => getWeeksInMonth(date))
    )
  }
}
