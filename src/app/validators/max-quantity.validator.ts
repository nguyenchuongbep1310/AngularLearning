import { AbstractControl, ValidationErrors } from '@angular/forms';

export function maxQuantityValidator(control: AbstractControl): ValidationErrors | null {
  const quantity = control.get('quantity')?.value;
  return quantity > 10 ? { maxQuantity: true } : null;
}
