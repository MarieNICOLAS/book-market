import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PanierService } from './panier.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly panier = inject(PanierService);
}
