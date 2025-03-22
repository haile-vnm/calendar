import { Component } from '@angular/core';
import { CalendarMonthComponent } from '../../shared/calendar-month/calendar-month.component';

@Component({
  selector: 'app-calendar',
  imports: [CalendarMonthComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
