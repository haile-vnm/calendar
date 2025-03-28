import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditAppointmentComponent } from '../edit-appointment/edit-appointment.component';
import { isEqualDate, shiftTime } from '../../../utils/date';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppointmentService } from '../../services/appointment.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CalendarAppointmentComponent } from '../calendar-appointment/calendar-appointment.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Appointment } from '../../../models/appointment';

@Component({
  selector: 'app-calendar-date',
  imports: [
    CommonModule,
    CdkDrag,

    CalendarAppointmentComponent,
  ],
  templateUrl: './calendar-date.component.html',
  styleUrl: './calendar-date.component.scss'
})
export class CalendarDateComponent {
  private dialog = inject(MatDialog);
  private appointmentService = inject(AppointmentService);

  date = input.required<Date>();
  isToday = computed(() => isEqualDate(this.date(), new Date()))


  appointments = toSignal(
    toObservable(this.date)
      .pipe(switchMap(date => this.appointmentService.getDateAppointments(date)))
  );

  @HostListener('click')
  updateAppointment() {
    const now = new Date();
    now.setDate(this.date().getDate());
    now.setMonth(this.date().getMonth());
    now.setFullYear(this.date().getFullYear());

    const dialog = this.dialog.open(EditAppointmentComponent, { data: { start: now, end: shiftTime(30, 'min', now) } });
    dialog.componentInstance.complete.subscribe(() => dialog.close());
  }
}
