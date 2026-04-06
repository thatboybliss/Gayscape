import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../services/app.service';
import { GlassCardComponent } from '../components/glass-card.component';

@Component({
  selector: 'app-pulse',
  standalone: true,
  imports: [MatIconModule, GlassCardComponent],
  template: `
    <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header class="mb-8 flex justify-between items-center">
        <h1 class="text-3xl font-serif tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200">
          The Pulse
        </h1>
        <div class="px-3 py-1 rounded-full border border-white/10 text-xs font-serif tracking-widest text-white/50">
          24H CYCLE
        </div>
      </header>

      <app-glass-card className="p-8 mb-8 relative overflow-hidden block">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        <span class="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-3 block">Today's Global Tea</span>
        <h2 class="text-2xl font-serif leading-snug mb-6">"{{ prompt }}"</h2>
        
        @if (!appService.hasPostedTea()) {
          <button 
            (click)="appService.hasPostedTea.set(true)"
            class="w-full group flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-purple-100 transition-all"
          >
            <mat-icon class="text-[18px] w-[18px] h-[18px]">camera_alt</mat-icon>
            Snap to Unlock Feed
          </button>
        } @else {
          <div class="flex items-center gap-2 text-green-300 bg-green-900/20 px-4 py-2 rounded-lg border border-green-500/20 w-fit">
            <mat-icon class="text-[14px] w-[14px] h-[14px]">auto_awesome</mat-icon>
            <span class="text-xs tracking-wider uppercase font-bold">Feed Unlocked</span>
          </div>
        }
      </app-glass-card>

      <div class="space-y-6">
        @if (!appService.hasPostedTea()) {
          <div class="flex flex-col items-center justify-center py-16 opacity-40">
            <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <mat-icon class="text-purple-300">lock</mat-icon>
            </div>
            <p class="text-center font-serif tracking-wider">Spill your tea<br/>to see the community.</p>
          </div>
        } @else {
          <div class="grid grid-cols-2 gap-3">
            @for (post of mockTeaPosts; track post.id) {
              <div class="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-white/10">
                <img [src]="post.img" alt="fit" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerpolicy="no-referrer" />
                <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <h3 class="font-bold text-sm tracking-wide">{{ post.user }}</h3>
                  <div class="flex justify-between items-end mt-1">
                    <span class="text-[10px] text-purple-300 font-serif italic">{{ post.role }}</span>
                    <span class="text-[9px] uppercase tracking-wider text-white/50">{{ post.time }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class PulseComponent {
  appService = inject(AppService);
  prompt = "What's the tea on your current fit?";
  
  mockTeaPosts = [
    { id: 1, user: "House of X", role: "Motha", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400", time: "2h ago" },
    { id: 2, user: "NeonPulse", role: "Gaybro", img: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&q=80&w=400", time: "4h ago" }
  ];
}
