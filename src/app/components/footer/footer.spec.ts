import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Footer } from "./footer";

describe("Footer", () => {
    let component: Footer;
    let fixture: ComponentFixture<Footer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Footer]
        }).compileComponents();

        fixture = TestBed.createComponent(Footer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have current year", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const year = new Date().getFullYear().toString();
        expect(compiled.querySelector("span")?.textContent).toContain(year);
    });

    it('should display copyright text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angualar 20 Demo');
  });

  it('should have footer element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('.ftr');
    expect(footer).toBeTruthy();
  });

  it('should initialize year property', () => {
    const currentYear = new Date().getFullYear();
    expect(component.year).toBe(currentYear);
  });

  it('should update display when year changes', () => {
    component.year = 2026;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2026');
  });
});