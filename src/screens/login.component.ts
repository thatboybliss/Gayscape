import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../services/app.service';
import { GlassCardComponent } from '../components/glass-card.component';
import { AnimatedOrbComponent } from '../components/animated-orb.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, GlassCardComponent, AnimatedOrbComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black pointer-events-none"></div>
      <app-glass-card className="max-w-md w-full p-10 text-center relative z-10 block">
        <app-animated-orb [vibePoints]="80" colorBase="gold"></app-animated-orb>
        <h1 class="text-4xl font-serif tracking-widest uppercase bg-gradient-to-r from-purple-300 via-pink-200 to-cyan-200 bg-clip-text text-transparent mb-2 mt-4">
          Gayscape
        </h1>
        <p class="text-white/50 text-sm tracking-widest uppercase mb-10 font-serif">The Digital Coffeehouse</p>
        
        <form (submit)="onSubmit($event)" class="space-y-4">
          <input
            type="text"
            [(ngModel)]="name"
            name="name"
            placeholder="Enter your alias"
            class="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-center focus:ring-1 focus:ring-purple-500/50 outline-none font-serif tracking-wider transition-all"
            required
          />
          <button type="submit" class="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest hover:bg-purple-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Enter
          </button>
        </form>
      </app-glass-card>
    </div>
  `
})
export class LoginComponent {
  appService = inject(AppService);
  name = signal('');

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.name()) {
      this.appService.login(this.name());
    }
  }
}
