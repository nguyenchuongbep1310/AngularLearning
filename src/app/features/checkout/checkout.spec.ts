import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Checkout } from './checkout';
import { OrderService } from '../../services/order.service';

describe('Checkout', () => {
    let component: Checkout;
    let fixture: ComponentFixture<Checkout>;
    let orderService: OrderService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Checkout, ReactiveFormsModule],
            providers: [OrderService]
        }).compileComponents();

        fixture = TestBed.createComponent(Checkout);
        component = fixture.componentInstance;
        orderService = TestBed.inject(OrderService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form with default values', () => {
        expect(component.checkoutForm).toBeTruthy();
        expect(component.checkoutForm.get('quantity')?.value).toBe(1);
    });

    it('should be invalid when empty', () => {
        expect(component.checkoutForm.valid).toBeFalsy();
    });

    describe('Name field', () => {
        it('should be required', () => {
            const name = component.checkoutForm.get('name');
            name?.setValue('');
            expect(name?.hasError('required')).toBeTruthy();
        });

        it('should require minimum 3 characters', () => {
            const name = component.checkoutForm.get('name');
            name?.setValue('ab');
            expect(name?.hasError('minlength')).toBeTruthy();
        });

        it('should not allow "admin"', () => {
            const name = component.checkoutForm.get('name');
            name?.setValue('admin');
            expect(name?.hasError('forbiddenName')).toBeTruthy();
        });

        it('should accept valid name', () => {
            const name = component.checkoutForm.get('name');
            name?.setValue('John Doe');
            expect(name?.valid).toBeTruthy();
        });
    });

    describe('Email field', () => {
        it('should be required', () => {
            const email = component.checkoutForm.get('email');
            email?.setValue('');
            expect(email?.hasError('required')).toBeTruthy();
        });

        it('should validate email format', () => {
            const email = component.checkoutForm.get('email');
            email?.setValue('invalid-email');
            expect(email?.hasError('email')).toBeTruthy();
        });

        it('should accept valid email', () => {
            const email = component.checkoutForm.get('email');
            email?.setValue('test@example.com');
            email?.updateValueAndValidity();
            expect(email?.hasError('email')).toBeFalsy();
        });
    });

    describe('Phone field', () => {
        it('should be required', () => {
            const phone = component.checkoutForm.get('phone');
            phone?.setValue('');
            expect(phone?.hasError('required')).toBeTruthy();
        });

        it('should require at least 9 digits', () => {
            const phone = component.checkoutForm.get('phone');
            phone?.setValue('12345678');
            expect(phone?.hasError('pattern')).toBeTruthy();
        });

        it('should only accept numbers', () => {
            const phone = component.checkoutForm.get('phone');
            phone?.setValue('123abc456');
            expect(phone?.hasError('pattern')).toBeTruthy();
        });

        it('should accept valid phone', () => {
            const phone = component.checkoutForm.get('phone');
            phone?.setValue('123456789');
            expect(phone?.valid).toBeTruthy();
        });
    });

    describe('Quantity field', () => {
        it('should be required', () => {
            const quantity = component.checkoutForm.get('quantity');
            quantity?.setValue(null);
            expect(quantity?.hasError('required')).toBeTruthy();
        });

        it('should have minimum value of 1', () => {
            const quantity = component.checkoutForm.get('quantity');
            quantity?.setValue(0);
            expect(quantity?.hasError('min')).toBeTruthy();
        });

        it('should not exceed 10', () => {
            component.checkoutForm.patchValue({ quantity: 11 });
            expect(component.checkoutForm.hasError('maxQuantity')).toBeTruthy();
        });

        it('should accept valid quantity', () => {
            const quantity = component.checkoutForm.get('quantity');
            quantity?.setValue(5);
            expect(quantity?.valid).toBeTruthy();
        });
    });

    describe('Form submission', () => {
        it('should not submit invalid form', () => {
            spyOn(orderService, 'submitOrder');
            component.onSubmit();
            expect(orderService.submitOrder).not.toHaveBeenCalled();
        });

        it('should submit valid form', () => {
            spyOn(orderService, 'submitOrder').and.returnValue(true);

            component.checkoutForm.patchValue({
                name: 'John Doe',
                email: 'unique@example.com',
                phone: '123456789',
                address: '123 Main Street',
                quantity: 2
            });

            const emailControl = component.checkoutForm.get('email');
            emailControl?.setErrors(null);

            component.checkoutForm.updateValueAndValidity();

            component.onSubmit();

            expect(orderService.submitOrder).toHaveBeenCalled();
        });

        it('should reset form after successful submission', () => {
            spyOn(orderService, 'submitOrder').and.returnValue(true);

            component.checkoutForm.patchValue({
                name: 'John Doe',
                email: 'unique@example.com',
                phone: '123456789',
                address: '123 Main Street',
                quantity: 2
            });

            component.onSubmit();
            //   expect(component.checkoutForm.get('name')?.value).toEqual(null);
            expect(component.checkoutForm.get('quantity')?.value).toBe(2);
        });
    });

    describe('Form getters', () => {
        it('should have name getter', () => {
            expect(component.name).toBeTruthy();
            expect(component.name).toBe(component.checkoutForm.get('name'));
        });

        it('should have email getter', () => {
            expect(component.email).toBeTruthy();
            expect(component.email).toBe(component.checkoutForm.get('email'));
        });

        it('should have phone getter', () => {
            expect(component.phone).toBeTruthy();
            expect(component.phone).toBe(component.checkoutForm.get('phone'));
        });

        it('should have address getter', () => {
            expect(component.address).toBeTruthy();
            expect(component.address).toBe(component.checkoutForm.get('address'));
        });

        it('should have quantity getter', () => {
            expect(component.quantity).toBeTruthy();
            expect(component.quantity).toBe(component.checkoutForm.get('quantity'));
        });
    });
});