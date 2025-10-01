import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth-guard';

describe('authGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    });
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access when user is logged in', () => {
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(result).toBe(true);
  });

  it('should not navigate when access is granted', () => {
    TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  // Note: Currently the guard always returns true because loggedIn is hardcoded
  // If you modify the guard to check actual authentication, add tests like:
  
  // it('should deny access when user is not logged in', () => {
  //   // Mock authentication service to return false
  //   const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  //   expect(result).toBe(false);
  // });

  // it('should redirect to home when access denied', () => {
  //   // Mock authentication service to return false
  //   TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  //   expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  // });
});