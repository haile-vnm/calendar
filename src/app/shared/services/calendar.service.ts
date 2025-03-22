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

  getCurrentWeeks() {
    return this.selectedDate$.pipe(
      map(date => getWeeksInMonth(date))
    )
  }
}
