import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `
    <h3>Product Detail</h3>
    <p>You are viewing product with ID: {{ id }}</p>
  `
})
export class ProductDetail {
  id: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
