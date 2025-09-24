import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const usedEmails = ['test@example.com', 'admin@example.com'];

export function emailUniqueValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  return of(control.value).pipe(
    delay(800),
    map(email => usedEmails.includes(email) ? { emailTaken: true } : null)
  );
}
