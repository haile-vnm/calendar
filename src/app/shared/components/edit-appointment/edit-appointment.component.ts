import { Component, inject, input, OnInit, output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Appointment } from '../../../models/appointment';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.scss'
})
export class EditAppointmentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private data = inject<Partial<Appointment>>(MAT_DIALOG_DATA);
  private appointmentService = inject(AppointmentService);

  appointment = input<Partial<Appointment>>();

  complete = output();

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.appointment()?.title || this.data.title || '', Validators.required],
      startDate: [this.appointment()?.start || this.data.start || '', Validators.required],
      endDate: [this.appointment()?.end || this.data.end || '', Validators.required],
      startTime: [this.appointment()?.start || this.data.start || '', Validators.required],
      endTime: [this.appointment()?.end || this.data.end || '', Validators.required],
    });
  }

  submitForm() {
    const id = this.getAppointmentId();
    if (id) {
      this.appointmentService.update(id, this.getAppointmentChanges());
    } else {
      this.appointmentService.create(this.getAppointmentChanges());
    }
    this.complete.emit();
  }

  private getAppointmentId() {
    return this.data.id || this.appointment()?.id;
  }

  private getAppointmentChanges(): Omit<Appointment, 'id'> {
    return {
      title: this.form.value.title,
      start: new Date(
        this.form.value.startDate.getFullYear(),
        this.form.value.startDate.getMonth(),
        this.form.value.startDate.getDate(),
        this.form.value.startTime.getHours(),
        this.form.value.startTime.getMinutes()
      ),
      end: new Date(
        this.form.value.endDate.getFullYear(),
        this.form.value.endDate.getMonth(),
        this.form.value.endDate.getDate(),
        this.form.value.endTime.getHours(),
        this.form.value.endTime.getMinutes()
      ),
    };
  }
}
