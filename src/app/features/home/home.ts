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
  templateUrl: './home.html',
  styleUrl: './home.scss'
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
