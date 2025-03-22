import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { combineLatest, filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { createDateFrom } from '../utils/date';

export const greaterThan = (startDateField: string, startTimeField: string, endDateField: string, form$: Observable<FormGroup>) => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    console.log(control.value);
    return combineLatest([
      control.valueChanges.pipe(filter(Boolean)),
      form$.pipe(
        filter(Boolean),
        take(1),
        switchMap(form => combineLatest([
          form.get(startDateField)!.valueChanges,
          form.get(startTimeField)!.valueChanges,
          form.get(endDateField)!.valueChanges,
        ])),
      )
    ]).pipe(
      map(
        ([endTime, [startDate, startTime, endDate]]) => {
          const startDatetime = createDateFrom(startDate, startTime);
          const endDatetime = createDateFrom(endDate, endTime);

          if (startDatetime < endDatetime) {
            return null;
          }

          return { greaterThan: true, message: `Value must be greater than ${startDatetime.toISOString}` }
        }
      ),
    )
  }
}
