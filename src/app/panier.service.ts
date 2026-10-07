import { computed, Injectable, signal } from '@angular/core';
import { LIVRES } from './livres';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private readonly ids = signal<number[]>([]);
  readonly livres = computed(() =>
    this.ids().flatMap((id) => LIVRES.filter((livre) => livre.id === id)),
  );
  readonly nombre = computed(() => this.livres().length);
  readonly total = computed(
    () => this.livres().reduce((somme, livre) => somme + Math.round(livre.prix * 100), 0) / 100,
  );

  contient(id: number): boolean {
    return this.ids().includes(id);
  }

  ajouter(id: number): void {
    if (LIVRES.some((livre) => livre.id === id) && !this.contient(id)) {
      this.ids.update((ids) => [...ids, id]);
    }
  }

  retirer(id: number): void {
    this.ids.update((ids) => ids.filter((valeur) => valeur !== id));
  }
}
