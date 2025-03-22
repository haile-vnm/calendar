import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CalendarService } from '../../services/calendar.service';
import { CalendarDateComponent } from '../calendar-date/calendar-date.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-month',
  imports: [
    CommonModule,

    CalendarDateComponent
  ],
  templateUrl: './calendar-month.component.html',
  styleUrl: './calendar-month.component.scss'
})
export class CalendarMonthComponent {
  private calendarService = inject(CalendarService);

  weeks = toSignal(this.calendarService.getCurrentWeeks());
  weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
}
