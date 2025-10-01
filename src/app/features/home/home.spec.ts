import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let productService: ProductService;

  const mockProducts: Product[] = [
    { id: 1, name: 'Phone', price: 199, created: new Date(2025, 8, 1) },
    { id: 2, name: 'Laptop', price: 49, created: new Date(2025, 7, 15) }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with products from service', () => {
    expect(component.products).toBeTruthy();
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should filter products by name', () => {
    component.filter = 'phone';
    const filtered = component.filteredProducts();
    
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every(p => p.name.toLowerCase().includes('phone'))).toBe(true);
  });

  it('should return all products when filter is empty', () => {
    component.filter = '';
    const filtered = component.filteredProducts();
    
    expect(filtered.length).toBe(component.products.length);
  });

  it('should return empty array when no products match filter', () => {
    component.filter = 'nonexistent';
    const filtered = component.filteredProducts();
    
    expect(filtered.length).toBe(0);
  });

  it('should sort products by price ascending', () => {
    component.sortAsc = true;
    const initialFirst = component.products[0].price;
    
    component.sortByPrice();
    
    expect(component.products[0].price).toBeLessThanOrEqual(component.products[1].price);
    expect(component.sortAsc).toBe(false);
  });

  it('should sort products by price descending', () => {
    component.sortAsc = false;
    
    component.sortByPrice();
    
    expect(component.products[0].price).toBeGreaterThanOrEqual(component.products[1].price);
    expect(component.sortAsc).toBe(true);
  });

  it('should toggle sortAsc when sorting', () => {
    const initialSortAsc = component.sortAsc;
    component.sortByPrice();
    expect(component.sortAsc).toBe(!initialSortAsc);
  });

  it('should filter case-insensitively', () => {
    component.filter = 'PHONE';
    const filtered = component.filteredProducts();
    
    const hasPhone = filtered.some(p => p.name.toLowerCase().includes('phone'));
    expect(hasPhone).toBe(true);
  });
});