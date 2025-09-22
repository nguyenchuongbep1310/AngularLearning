import { Component } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Highlight } from '../../pipes/highlight.pipe';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, CurrencyPipe, DatePipe, Highlight],
  template: `
    <h1>Product List</h1>

    <input type="text" [(ngModel)]="filter" placeholder="Filter products..." />
    <button (click)="sortByPrice()">Sort by Price</button>

    <ul>
      <li *ngFor="let p of filteredProducts()" [ngClass]="{ expensive: p.price > 100 }">
        <span [innerHTML]="p.name | highlight:filter"></span> –
        {{ p.price | currency:'USD' }} –
        {{ p.created | date:'mediumDate' }}
      </li>
    </ul>

    <p *ngIf="filteredProducts().length === 0">No products found.</p>
  `,
  styles: [`
    input { margin: 8px 0; padding:4px; }
    button { margin-left:8px; }
    ul { margin:12px 0; padding:0; list-style:none; }
    li { padding:4px 0; }
    .expensive { color: darkred; font-weight:600; }
    mark { background: yellow; }
  `]
})
export class Home {
  filter = '';
  sortAsc = true;
  products: Product[];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  filteredProducts() {
    const f = this.filter.toLowerCase();
    return this.products.filter(p => p.name.toLowerCase().includes(f));
  }

  sortByPrice() {
    this.products = [...this.products].sort((a, b) =>
      this.sortAsc ? a.price - b.price : b.price - a.price
    );
    this.sortAsc = !this.sortAsc;
  }
}
