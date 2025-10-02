import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Register</h2>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Username:</label>
            <input 
              type="text" 
              formControlName="username"
              [class.invalid]="username?.invalid && username?.touched"
            />
            <div class="error" *ngIf="username?.hasError('required') && username?.touched">
              Username is required
            </div>
            <div class="error" *ngIf="username?.hasError('minlength') && username?.touched">
              Username must be at least 3 characters
            </div>
          </div>

          <div class="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              formControlName="email"
              [class.invalid]="email?.invalid && email?.touched"
            />
            <div class="error" *ngIf="email?.hasError('required') && email?.touched">
              Email is required
            </div>
            <div class="error" *ngIf="email?.hasError('email') && email?.touched">
              Invalid email format
            </div>
          </div>

          <div class="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              formControlName="password"
              [class.invalid]="password?.invalid && password?.touched"
            />
            <div class="error" *ngIf="password?.hasError('required') && password?.touched">
              Password is required
            </div>
            <div class="error" *ngIf="password?.hasError('minlength') && password?.touched">
              Password must be at least 6 characters
            </div>
          </div>

          <div class="form-group">
            <label>Confirm Password:</label>
            <input 
              type="password" 
              formControlName="confirmPassword"
              [class.invalid]="confirmPassword?.invalid && confirmPassword?.touched"
            />
            <div class="error" *ngIf="confirmPassword?.hasError('required') && confirmPassword?.touched">
              Please confirm your password
            </div>
            <div class="error" *ngIf="registerForm.hasError('passwordMismatch') && confirmPassword?.touched">
              Passwords do not match
            </div>
          </div>

          <div class="error" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button 
            type="submit" 
            [disabled]="registerForm.invalid || loading"
            class="btn-primary"
          >
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </form>

        <p class="login-link">
          Already have an account? <a routerLink="/login">Login here</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 20px;
    }
    .register-card {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 100%;
    }
    h2 {
      margin: 0 0 20px 0;
      text-align: center;
      color: #1976d2;
    }
    .form-group {
      margin-bottom: 16px;
    }
    label {
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }
    input.invalid {
      border-color: #f44336;
    }
    .error {
      color: #f44336;
      font-size: 13px;
      margin-top: 4px;
    }
    .btn-primary {
      width: 100%;
      padding: 10px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 8px;
    }
    .btn-primary:hover:not(:disabled) {
      background: #1565c0;
    }
    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .login-link {
      text-align: center;
      margin-top: 16px;
    }
    .login-link a {
      color: #1976d2;
      text-decoration: none;
    }
    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { confirmPassword, ...registerData } = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (user) => {
        console.log('Registration successful:', user);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}