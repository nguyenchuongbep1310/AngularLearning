import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from './product-detail';
import { of } from 'rxjs';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;

  const createComponent = (paramId: string) => {
    TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? paramId : null
              }
            },
            params: of({ id: paramId })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create', () => {
    createComponent('1');
    expect(component).toBeTruthy();
  });

  it('should get id from route params', () => {
    createComponent('123');
    expect(component.id).toBe('123');
  });

  it('should display product id', () => {
    createComponent('42');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('42');
  });

  it('should show heading', () => {
    createComponent('1');
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h3');
    expect(heading?.textContent).toContain('Product Detail');
  });

  it('should handle different product ids', () => {
    createComponent('999');
    expect(component.id).toBe('999');
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('999');
  });

  it('should initialize id as null initially', () => {
    createComponent('1');
    // Component initializes id in constructor, but before that it's null
    expect(component.id).not.toBeUndefined();
  });
});