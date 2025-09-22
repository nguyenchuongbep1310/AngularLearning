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
      </nav>
    </header>
  `,
  styles: [`
    .hdr { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; border-bottom:1px solid #ddd; }
    .brand { font-weight:600; text-decoration:none; }
    .link { margin-left:12px; text-decoration:none; }
  `]
})
export class Header {}
