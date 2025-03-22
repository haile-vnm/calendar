import { nanoid } from 'nanoid'
import { Injectable } from '@angular/core';
import { Appointment } from '../../models/appointment';
import { BehaviorSubject, filter, map } from 'rxjs';
import { isEqualDate } from '../../utils/date';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments$ = new BehaviorSubject<Appointment[]>([]);

  constructor() { }

  create(appointment: Omit<Appointment, 'id'>) {
    this.appointments$.next([...this.appointments$.value, { ...appointment, id: nanoid() }])
  }

  update(id: string, data: Partial<Appointment>) {
    const appointments = this.appointments$.value.map(
      appointment => appointment.id === id ? { ...appointment, ...data } : appointment
    );

    this.appointments$.next(appointments);
  }

  delete(id: string) {
    this.appointments$.next(this.appointments$.value.filter(a => a.id !== id));
  }

  getDateAppointments(date: Date) {
    return this.appointments$.pipe(
      map(appointments => appointments.filter(ap => isEqualDate(date, ap.start)))
    );
  }
}
