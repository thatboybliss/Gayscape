import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../services/app.service';
import { GlassCardComponent } from '../components/glass-card.component';
import { AnimatedOrbComponent } from '../components/animated-orb.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule, GlassCardComponent, AnimatedOrbComponent],
  template: `
    <div class="animate-in fade-in zoom-in-95 duration-700 max-w-sm mx-auto">
      <div class="text-center mb-8 relative">
        <app-animated-orb [vibePoints]="appService.user()?.vibePoints || 50" colorBase="gold"></app-animated-orb>
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-1 shadow-xl">
          <mat-icon class="text-[12px] w-[12px] h-[12px] text-yellow-400">workspace_premium</mat-icon>
          <span class="text-[10px] uppercase tracking-widest font-bold text-yellow-400">Vogue House</span>
        </div>
      </div>
      
      <div class="text-center mb-8">
        <h2 class="text-3xl font-serif tracking-widest uppercase mb-1">{{ appService.user()?.name }}</h2>
        <p class="text-white/40 text-xs tracking-widest uppercase font-serif italic">Verified {{ appService.user()?.role }}</p>
      </div>

      <div class="space-y-3 mb-8">
        <app-glass-card className="p-4 flex justify-between items-center block">
          <div>
            <h4 class="text-xs uppercase tracking-widest font-bold">Vibe Points</h4>
            <p class="text-[10px] text-white/50 font-serif italic mt-1">Aura intensity level</p>
          </div>
          <span class="text-xl font-serif text-purple-300">{{ appService.user()?.vibePoints }}</span>
        </app-glass-card>

        <app-glass-card className="p-4 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors block" (click)="isPlatonic.set(!isPlatonic())">
          <div>
            <h4 class="text-xs uppercase tracking-widest font-bold">Platonic Toggle</h4>
            <p class="text-[10px] text-white/50 font-serif italic mt-1">Hide from dating searches</p>
          </div>
          <div class="w-12 h-6 rounded-full p-1 transition-colors" [class.bg-green-500]="isPlatonic()" [class.bg-white]="!isPlatonic()" [class.bg-opacity-20]="!isPlatonic()">
            <div class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform" [class.translate-x-6]="isPlatonic()" [class.translate-x-0]="!isPlatonic()"></div>
          </div>
        </app-glass-card>
      </div>

      <button (click)="appService.logout()" class="w-full py-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all uppercase tracking-widest">
        Disconnect
      </button>
    </div>
  `
})
export class ProfileComponent {
  appService = inject(AppService);
  isPlatonic = signal(true);
}
