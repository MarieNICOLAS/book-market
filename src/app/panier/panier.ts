import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanierService } from '../panier.service';
import { Livre } from '../livres';

@Component({
  selector: 'app-panier',
  imports: [RouterLink],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Panier {
  protected readonly panier = inject(PanierService);
  protected readonly message = signal('');

  protected retirer(livre: Livre) {
    this.panier.retirer(livre.id);
    this.message.set(`${livre.titre} a été retiré du panier.`);
  }
}
