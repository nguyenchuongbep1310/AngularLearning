import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { emailUniqueValidator } from '../../validators/email-unique.validator';
import { forbiddenNameValidator } from '../../validators/forbidden-name.validator';
import { maxQuantityValidator } from '../../validators/max-quantity.validator';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit {
  orders: any[] = [];
  checkoutForm: any;

  constructor(private fb: FormBuilder, private orderService: OrderService) {}

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
      email: ['', [Validators.required, Validators.email], [emailUniqueValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    }, { validators: [maxQuantityValidator] });

    this.orders = this.orderService.getOrders();
  }

  get name() { return this.checkoutForm.get('name')!; }
  get email() { return this.checkoutForm.get('email')!; }
  get phone() { return this.checkoutForm.get('phone')!; }
  get address() { return this.checkoutForm.get('address')!; }
  get quantity() { return this.checkoutForm.get('quantity')!; }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const order = this.checkoutForm.value;
      this.orderService.submitOrder(order as any);
      this.checkoutForm.reset({ quantity: 1 });
      this.orders = this.orderService.getOrders();
    }
  }
}
