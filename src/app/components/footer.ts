import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="ftr">
      <span>© {{ year }} Angular 20 Demo</span>
    </footer>
  `,
  styles: [`
    .ftr { margin-top:40px; padding:16px; border-top:1px solid #ddd; text-align:center; color:#666; }
  `]
})
export class Footer {
  year = new Date().getFullYear();
}
