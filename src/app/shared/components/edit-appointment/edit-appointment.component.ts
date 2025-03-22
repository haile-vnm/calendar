import { Component, computed, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { distinctUntilChanged, map, ReplaySubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createDateFrom } from '../../../utils/date';

@Component({
  selector: 'app-edit-appointment',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.scss'
})
export class EditAppointmentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private data = inject<Partial<Appointment>>(MAT_DIALOG_DATA);
  private appointmentService = inject(AppointmentService);
  private destroyRef = inject(DestroyRef);

  appointment = input<Partial<Appointment>>();
  appointmentId = computed(() => this.appointment()?.id || this.data.id);
  errorMessage = signal('');

  complete = output();

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.appointment()?.title || this.data.title || '', Validators.required],
      startDate: [this.appointment()?.start || this.data.start || '', Validators.required],
      endDate: [this.appointment()?.end || this.data.end || '', Validators.required],
      startTime: [this.appointment()?.start || this.data.start || '', Validators.required],
      endTime: this.fb.control(
        this.appointment()?.end || this.data.end || '',
        Validators.required
      ),
    });

    this.validateEventTime();
  }

  submitForm() {
    if (this.errorMessage()) {
      return;
    }

    const id = this.appointmentId();
    if (id) {
      this.appointmentService.update(id, this.getAppointmentChanges());
    } else {
      this.appointmentService.create(this.getAppointmentChanges());
    }

    this.complete.emit();
  }

  deleteAppointment() {
    this.appointmentService.delete(this.appointmentId()!);
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

  private validateEventTime() {
    this.form.valueChanges.pipe(
      map(({ startDate, startTime, endDate, endTime }) => {
        if (!(startDate && startTime && endDate && endTime)) {
          return true;
        }

        const start = createDateFrom(startDate, startTime);
        const end = createDateFrom(endDate, endTime);

        return start < end && start > new Date();
      }),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(ok => {
      this.errorMessage.set(ok ? '' : 'Only allow to create future event.');
    });
  }
}
