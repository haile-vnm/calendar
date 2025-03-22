import { Component, inject } from '@angular/core';
import { CalendarMonthComponent } from '../../shared/calendar-month/calendar-month.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { CalendarService } from '../../shared/services/calendar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [
    MatButtonModule,
    MatIconModule,
    DatePipe,

    CalendarMonthComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  private calendarService = inject(CalendarService);

  date = toSignal(this.calendarService.selectedDate);

  nextMonth() {
    this.calendarService.incrementMonth();
  }
  previousMonth() {
    this.calendarService.incrementMonth(-1)
  }

  goToToday() {
    this.calendarService.gotoToday()
  }
}
