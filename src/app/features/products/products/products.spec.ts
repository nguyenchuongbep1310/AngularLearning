import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Products } from './products';
import { By } from '@angular/platform-browser';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have products array', () => {
    expect(component.products).toBeTruthy();
    expect(Array.isArray(component.products)).toBe(true);
  });

  it('should have 3 products', () => {
    expect(component.products.length).toBe(3);
  });

  it('should display all products', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const productLinks = compiled.querySelectorAll('li a');
    expect(productLinks.length).toBe(3);
  });

  it('should have correct product names', () => {
    expect(component.products[0].name).toBe('Phone');
    expect(component.products[1].name).toBe('Laptop');
    expect(component.products[2].name).toBe('Shoes');
  });

  it('should have correct product ids', () => {
    expect(component.products[0].id).toBe(1);
    expect(component.products[1].id).toBe(2);
    expect(component.products[2].id).toBe(3);
  });

  it('should render product links with correct routerLink', () => {
    const links = fixture.debugElement.queryAll(By.css('a[routerLink]'));
    expect(links.length).toBe(3);
    expect(links[0].nativeElement.getAttribute('href')).toBe('/products/1');
    expect(links[1].nativeElement.getAttribute('href')).toBe('/products/2');
    expect(links[2].nativeElement.getAttribute('href')).toBe('/products/3');
  });

  it('should display heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h2');
    expect(heading?.textContent).toContain('Products Page');
  });

  it('should log message on construction', () => {
    spyOn(console, 'log');
    const newComponent = new Products();
    expect(console.log).toHaveBeenCalledWith('✅ Products component loaded');
  });
});