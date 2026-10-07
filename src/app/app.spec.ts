import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { PanierService } from './panier.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the navigation header', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.entete a');
    expect(links.length).toBe(3);
    expect(links[2].getAttribute('href')).toBe('/panier');
    expect(links[0].querySelector('img')?.alt).toBe('Book Market');
    expect(links[1].textContent).toContain('Catalogue');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/');
    expect(compiled.querySelector('main router-outlet')).not.toBeNull();
    TestBed.inject(PanierService).ajouter(1000);
    fixture.detectChanges();
    expect(links[2].textContent).toContain('1');
    expect(links[2].getAttribute('aria-label')).toBe('Panier : 1 livre(s)');
  });
});
