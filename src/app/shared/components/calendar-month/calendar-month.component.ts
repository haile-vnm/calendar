import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CalendarService } from '../../services/calendar.service';
import { CalendarDateComponent } from '../calendar-date/calendar-date.component';
import { CommonModule } from '@angular/common';
import {CdkDragDrop, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { Appointment } from '../../../models/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { createDateFrom } from '../../../utils/date';


@Component({
  selector: 'app-calendar-month',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDropListGroup,

    CalendarDateComponent
  ],
  templateUrl: './calendar-month.component.html',
  styleUrl: './calendar-month.component.scss'
})
export class CalendarMonthComponent {
  private calendarService = inject(CalendarService);
  private appointmentService = inject(AppointmentService);

  weeks = toSignal(this.calendarService.getCurrentWeeks());
  weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  drop(event: CdkDragDrop<Date, Date, Appointment>) {
    const appointment = event.item.data;
    const newSelectedDate = event.container.data;
    const newStart = createDateFrom(newSelectedDate, appointment.start);

    this.appointmentService.update(
      appointment.id,
      {
        start: newStart,
        end: new Date(appointment.end.getTime() + (newStart.getTime() - appointment.start.getTime()))
      }
    );
  }
}
