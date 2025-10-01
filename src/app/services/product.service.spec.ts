import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of products', () => {
    const products = service.getProducts();
    expect(products).toBeTruthy();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('should return products with correct properties', () => {
    const products = service.getProducts();
    const firstProduct = products[0];
    
    expect(firstProduct.hasOwnProperty('id')).toBe(true);
    expect(firstProduct.hasOwnProperty('name')).toBe(true);
    expect(firstProduct.hasOwnProperty('price')).toBe(true);
    expect(firstProduct.hasOwnProperty('created')).toBe(true);
  });

  it('should return 4 products', () => {
    const products = service.getProducts();
    expect(products.length).toBe(4);
  });

  it('should have valid product data types', () => {
    const products = service.getProducts();
    products.forEach(product => {
      expect(typeof product.id).toBe('number');
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(product.created instanceof Date).toBe(true);
    });
  });
});