import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Products } from './products';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

describe('Products Component', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Products,
        RouterTestingModule // provides ActivatedRoute and RouterLink stubs
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have a products array with 3 items', () => {
    expect(component.products.length).toBe(3);
  });

  it('should render product names in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li a');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('Phone');
  });

  it('should render correct router links for each product', () => {
    const debugEls = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const links = debugEls.map(de => de.injector.get(RouterLinkWithHref));

    expect(links.length).toBe(3);
    expect(links[0].href).toBe('/products/1');
    expect(links[1].href).toBe('/products/2');
    expect(links[2].href).toBe('/products/3');
  });
});
