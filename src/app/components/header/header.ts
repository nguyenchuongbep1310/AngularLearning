import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { HasRoleDirective } from '../../directives/has-role.directive';
import { Observable } from 'rxjs';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, HasRoleDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }
}