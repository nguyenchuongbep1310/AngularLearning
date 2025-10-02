import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <h1>🚫 Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <p>Please contact your administrator if you believe this is an error.</p>
        <a routerLink="/" class="btn-primary">Go to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 20px;
    }
    .unauthorized-card {
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      max-width: 500px;
    }
    h1 {
      color: #f44336;
      margin-bottom: 20px;
    }
    p {
      color: #666;
      margin: 10px 0;
    }
    .btn-primary {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 24px;
      background: #1976d2;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
    .btn-primary:hover {
      background: #1565c0;
    }
  `]
})
export class Unauthorized {}