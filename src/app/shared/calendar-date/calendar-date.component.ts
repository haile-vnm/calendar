import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-calendar-date',
  imports: [
    CommonModule,
  ],
  templateUrl: './calendar-date.component.html',
  styleUrl: './calendar-date.component.scss'
})
export class CalendarDateComponent {
  date = input.required<Date>();
}
