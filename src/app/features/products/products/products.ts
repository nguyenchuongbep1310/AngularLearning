import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, NgFor],
  template: `
    <h2>Products Page</h2>
    <ul>
      <li *ngFor="let p of products">
        <a [routerLink]="['/products', p.id]">{{ p.name }}</a>
      </li>
    </ul>
  `
})
export class Products {
  products = [
    { id: 1, name: 'Phone' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Shoes' }
  ];
}
