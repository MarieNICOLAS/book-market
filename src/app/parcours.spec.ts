import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { PanierService } from './panier.service';

describe('Parcours de la librairie', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding())],
    });
  });

  it('filtre les auteurs sans tenir compte de la casse et actualise le compteur', async () => {
    const harness = await RouterTestingHarness.create('/');
    const page = harness.routeNativeElement!;
    expect(page.querySelectorAll('li').length).toBe(8);
    const input = page.querySelector('input')!;
    for (const valeur of ['ferrand', 'FERRAND']) {
      input.value = valeur;
      input.dispatchEvent(new Event('input'));
      harness.detectChanges();
      expect(page.querySelectorAll('li').length).toBe(2);
      expect(page.querySelector('.result-count')!.textContent).toContain('2 livre(s)');
    }
    input.value = 'inconnu';
    input.dispatchEvent(new Event('input'));
    harness.detectChanges();
    expect(page.querySelectorAll('.book-card').length).toBe(0);
    expect(page.querySelector('.empty')!.textContent).toContain('Aucun livre');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    harness.detectChanges();
    expect(page.querySelectorAll('li').length).toBe(8);
  });

  it('désactive le bouton du livre ajouté sans désactiver celui des suggestions', async () => {
    const harness = await RouterTestingHarness.create('/livre/1000');
    const fiche = harness.routeDebugElement!.componentInstance;
    const bouton = () => harness.routeNativeElement!.querySelector('button')!;
    const suggestions = harness.routeNativeElement!.querySelectorAll('.suggestions a');
    expect(suggestions.length).toBe(4);
    expect([...suggestions].map((lien) => lien.getAttribute('href'))).not.toContain('/livre/1000');
    expect(bouton().disabled).toBe(false);
    bouton().click();
    harness.detectChanges();
    expect(bouton().disabled).toBe(true);
    expect(bouton().textContent!.trim()).toBe('Ajouté');

    await harness.navigateByUrl(suggestions[0].getAttribute('href')!);
    expect(harness.routeDebugElement!.componentInstance).toBe(fiche);
    expect(harness.routeNativeElement!.querySelector('h1')!.textContent).toBe(
      'Les clairs veilleurs',
    );
    expect(bouton().disabled).toBe(false);
    expect(bouton().textContent!.trim()).toBe('Ajouter au panier');
    await harness.navigateByUrl('/livre/1000');
    expect(bouton().disabled).toBe(true);
  });

  it('affiche une fiche en accès direct et un message pour un livre inconnu', async () => {
    const harness = await RouterTestingHarness.create('/livre/1003');
    expect(harness.routeNativeElement!.querySelector('h1')!.textContent).toBe(
      'Les perdus veilleurs',
    );
    await harness.navigateByUrl('/livre/9999');
    expect(harness.routeNativeElement!.textContent).toContain("Ce livre n'existe pas.");
    expect(harness.routeNativeElement!.querySelector('button')).toBeNull();
    expect(harness.routeNativeElement!.querySelector('.suggestions')).toBeNull();
  });

  it('conserve les ajouts après le catalogue, calcule le total et permet de retirer les livres', async () => {
    const harness = await RouterTestingHarness.create('/panier');
    expect(harness.routeNativeElement!.textContent).toContain('Votre panier est vide');
    const panier = TestBed.inject(PanierService);
    for (const id of [1000, 1001]) {
      await harness.navigateByUrl('/livre/' + id);
      harness.routeNativeElement!.querySelector('button')!.click();
      harness.detectChanges();
      await harness.navigateByUrl('/');
    }
    panier.ajouter(1000);
    panier.ajouter(9999);
    expect(panier.nombre()).toBe(2);
    await harness.navigateByUrl('/panier');
    expect(harness.routeNativeElement!.querySelectorAll('.cart-items li').length).toBe(2);
    expect(harness.routeNativeElement!.querySelector('.total')!.textContent).toContain('37,25 €');
    harness.routeNativeElement!.querySelector('button')!.click();
    harness.detectChanges();
    expect(panier.nombre()).toBe(1);
    expect(harness.routeNativeElement!.querySelector('.total')!.textContent).toContain('18,41 €');
    await harness.navigateByUrl('/livre/1000');
    expect(harness.routeNativeElement!.querySelector('button')!.disabled).toBe(false);
    await harness.navigateByUrl('/panier');
    harness.routeNativeElement!.querySelector('button')!.click();
    harness.detectChanges();
    expect(harness.routeNativeElement!.textContent).toContain('Votre panier est vide');
    expect(panier.nombre()).toBe(0);
    expect(panier.total()).toBe(0);
  });
});
