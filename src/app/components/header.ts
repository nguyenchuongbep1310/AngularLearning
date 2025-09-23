import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="hdr">
      <a routerLink="/" class="brand">Angular 20 Demo</a>
      <nav>
        <a routerLink="/" class="link">Home</a>
        <a routerLink="/products" class="link">Products</a>
        <a routerLink="/cart" class="link">Cart</a>
      </nav>
    </header>
  `,
  styles: [`
    .hdr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid #ddd;
      background: #f8f8f8;
    }
    .brand {
      font-weight: 600;
      text-decoration: none;
      color: #1976d2;
    }
    nav .link {
      margin-left: 12px;
      text-decoration: none;
      color: #333;
    }
    nav .link:hover {
      text-decoration: underline;
    }
  `]
})
export class Header {}
