import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, HasRoleDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  currentUser$: any;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }
}