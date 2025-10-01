import { FormControl, FormGroup } from '@angular/forms';
import { forbiddenNameValidator } from './forbidden-name.validator';
import { maxQuantityValidator } from './max-quantity.validator';
import { emailUniqueValidator } from './email-unique.validator';

describe('Validators', () => {
  describe('forbiddenNameValidator', () => {
    it('should return null for allowed names', () => {
      const control = new FormControl('John Doe');
      const result = forbiddenNameValidator(control);
      expect(result).toBeNull();
    });

    it('should return error for "admin"', () => {
      const control = new FormControl('admin');
      const result = forbiddenNameValidator(control);
      expect(result).toEqual({ forbiddenName: { value: 'admin' } });
    });

    it('should be case insensitive', () => {
      const control = new FormControl('Admin');
      const result = forbiddenNameValidator(control);
      expect(result).toEqual({ forbiddenName: { value: 'Admin' } });
    });

    it('should detect "admin" in longer strings', () => {
      const control = new FormControl('administrator');
      const result = forbiddenNameValidator(control);
      expect(result).toEqual({ forbiddenName: { value: 'administrator' } });
    });

    it('should return null for empty value', () => {
      const control = new FormControl('');
      const result = forbiddenNameValidator(control);
      expect(result).toBeNull();
    });
  });

  describe('maxQuantityValidator', () => {
    it('should return null when quantity is within limit', () => {
      const form = new FormGroup({
        quantity: new FormControl(5)
      });
      const result = maxQuantityValidator(form);
      expect(result).toBeNull();
    });

    it('should return null when quantity equals 10', () => {
      const form = new FormGroup({
        quantity: new FormControl(10)
      });
      const result = maxQuantityValidator(form);
      expect(result).toBeNull();
    });

    it('should return error when quantity exceeds 10', () => {
      const form = new FormGroup({
        quantity: new FormControl(11)
      });
      const result = maxQuantityValidator(form);
      expect(result).toEqual({ maxQuantity: true });
    });

    it('should return error when quantity is much higher', () => {
      const form = new FormGroup({
        quantity: new FormControl(100)
      });
      const result = maxQuantityValidator(form);
      expect(result).toEqual({ maxQuantity: true });
    });

    it('should return null when quantity control is missing', () => {
      const form = new FormGroup({});
      const result = maxQuantityValidator(form);
      expect(result).toBeNull();
    });

    it('should return null when quantity is 1', () => {
      const form = new FormGroup({
        quantity: new FormControl(1)
      });
      const result = maxQuantityValidator(form);
      expect(result).toBeNull();
    });
  });

  describe('emailUniqueValidator (async)', () => {
    it('should return null for unique email', (done) => {
      const control = new FormControl('unique@example.com');
      const result$ = emailUniqueValidator(control);
      
      result$.subscribe(result => {
        expect(result).toBeNull();
        done();
      });
    });

    it('should return error for taken email', (done) => {
      const control = new FormControl('test@example.com');
      const result$ = emailUniqueValidator(control);
      
      result$.subscribe(result => {
        expect(result).toEqual({ emailTaken: true });
        done();
      });
    });

    it('should return error for another taken email', (done) => {
      const control = new FormControl('admin@example.com');
      const result$ = emailUniqueValidator(control);
      
      result$.subscribe(result => {
        expect(result).toEqual({ emailTaken: true });
        done();
      });
    });

    it('should handle empty email', (done) => {
      const control = new FormControl('');
      const result$ = emailUniqueValidator(control);
      
      result$.subscribe(result => {
        expect(result).toBeNull();
        done();
      });
    });

    it('should be case sensitive', (done) => {
      const control = new FormControl('TEST@example.com');
      const result$ = emailUniqueValidator(control);
      
      result$.subscribe(result => {
        expect(result).toBeNull();
        done();
      });
    });
  });
});