import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LucideHeart, LucideStar, LucideZap } from '@lucide/angular';
import { CounterStore } from './counter.store';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, CardModule, LucideHeart, LucideStar, LucideZap],
  providers: [CounterStore],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly store = inject(CounterStore);
}
