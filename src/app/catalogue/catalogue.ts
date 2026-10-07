import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LIVRES } from '../livres';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-catalogue',
  imports: [RouterLink],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalogue {
  protected readonly filtre = signal('');
  protected readonly resultats = computed(() => 
    LIVRES.filter(livre => livre.auteur.toLowerCase().includes(this.filtre().toLowerCase()))
  );
}
