import { Component, HostListener, inject, input } from '@angular/core';
import { Appointment } from '../../../models/appointment';
import { EditAppointmentComponent } from '../edit-appointment/edit-appointment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-appointment',
  imports: [],
  templateUrl: './calendar-appointment.component.html',
  styleUrl: './calendar-appointment.component.scss'
})
export class CalendarAppointmentComponent {
  private dialog = inject(MatDialog);

  appointment = input.required<Appointment>();

  @HostListener('click', ['$event'])
  updateAppointment(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    const dialog = this.dialog.open(EditAppointmentComponent, { data: this.appointment() });
    dialog.componentInstance.complete.subscribe(() => dialog.close());
  }

}
