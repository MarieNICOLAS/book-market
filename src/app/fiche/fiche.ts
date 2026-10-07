import { Component, computed, input, signal } from '@angular/core';
import { LIVRES } from '../livres';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fiche',
  imports: [RouterLink],
  templateUrl: './fiche.html',
  styleUrl: './fiche.css',
})
export class Fiche {
  readonly id = input.required<string>();
  protected readonly livre = computed(() => 
  LIVRES.find(livre => livre.id === Number(this.id())));
  protected readonly panier = signal<number[]>([]);
  protected readonly ajoute = computed(() =>
    this.panier().includes(Number(this.id())));
  protected readonly suggestions = computed(() =>
    LIVRES.filter(livre => livre.id !== Number(this.id())).slice(0, 4));

  protected ajouter() {
    const livre = this.livre();
    if (livre && !this.ajoute()) {
      this.panier.update(panier => [...panier, livre.id]);
    }
  }
}
