import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  template: `
    <div class="admin-container">
      <h1>🔐 Admin Dashboard</h1>
      <p>Welcome to the admin panel!</p>
      
      <div class="admin-card">
        <h3>Current User</h3>
        <div *ngIf="currentUser$ | async as user">
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Role:</strong> <span class="badge">{{ user.role }}</span></p>
        </div>
      </div>

      <div class="admin-card">
        <h3>Admin Features</h3>
        <ul>
          <li>✅ Manage Users</li>
          <li>✅ View All Orders</li>
          <li>✅ System Settings</li>
          <li>✅ Reports & Analytics</li>
        </ul>
      </div>

      <div class="admin-card">
        <h3>Quick Stats</h3>
        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">150</div>
            <div class="stat-label">Total Users</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">432</div>
            <div class="stat-label">Total Orders</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">$12,450</div>
            <div class="stat-label">Revenue</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { padding: 20px; }
    h1 { color: #1976d2; margin-bottom: 10px; }
    .admin-card {
      background: white;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .admin-card h3 { margin-top: 0; color: #333; }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: #f44336;
      color: white;
      border-radius: 12px;
      font-size: 14px;
      text-transform: uppercase;
    }
    ul { list-style: none; padding: 0; }
    ul li { padding: 8px 0; border-bottom: 1px solid #eee; }
    ul li:last-child { border-bottom: none; }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
    }
    .stat-item {
      text-align: center;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #1976d2;
    }
    .stat-label {
      margin-top: 8px;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class AdminDashboard {
  get currentUser$() {
    return this.authService.currentUser$;
  }

  constructor(private authService: AuthService) {}
}