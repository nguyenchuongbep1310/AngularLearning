import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Header } from './header';
import { By } from '@angular/platform-browser';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display brand name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector('.brand');
    expect(brand?.textContent).toContain('Angular 20 Demo');
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('nav .link');
    expect(links.length).toBe(5);
  });

  it('should have Home link', () => {
    const links = fixture.debugElement.queryAll(By.css('nav .link'));
    const homeLink = links.find(link => link.nativeElement.textContent.includes('Home'));
    expect(homeLink).toBeTruthy();
  });

  it('should have Products link', () => {
    const links = fixture.debugElement.queryAll(By.css('nav .link'));
    const productsLink = links.find(link => link.nativeElement.textContent.includes('Products'));
    expect(productsLink).toBeTruthy();
  });

  it('should have Cart link', () => {
    const links = fixture.debugElement.queryAll(By.css('nav .link'));
    const cartLink = links.find(link => link.nativeElement.textContent.includes('Cart'));
    expect(cartLink).toBeTruthy();
  });

  it('should have Checkout link', () => {
    const links = fixture.debugElement.queryAll(By.css('nav .link'));
    const checkoutLink = links.find(link => link.nativeElement.textContent.includes('Checkout'));
    expect(checkoutLink).toBeTruthy();
  });

  it('should have Order link', () => {
    const links = fixture.debugElement.queryAll(By.css('nav .link'));
    const orderLink = links.find(link => link.nativeElement.textContent.includes('Order'));
    expect(orderLink).toBeTruthy();
  });

  it('should have correct routerLink for home', () => {
    const links = fixture.debugElement.queryAll(By.css('nav .link'));
    const homeLink = links[0];
    expect(homeLink.nativeElement.getAttribute('href')).toBe('/');
  });

  it('should have correct routerLink for products', () => {
    const links = fixture.debugElement.queryAll(By.css('nav .link'));
    const productsLink = links[1];
    expect(productsLink.nativeElement.getAttribute('href')).toBe('/products');
  });
});