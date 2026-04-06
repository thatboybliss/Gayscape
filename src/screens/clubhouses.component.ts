import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GlassCardComponent } from '../components/glass-card.component';

@Component({
  selector: 'app-clubhouses',
  standalone: true,
  imports: [MatIconModule, GlassCardComponent],
  template: `
    <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header class="mb-8">
        <h1 class="text-3xl font-serif tracking-widest uppercase">Clubhouses</h1>
        <p class="text-white/50 text-sm font-serif italic mt-2">Find your vibe. Window shop the lobby.</p>
      </header>

      <div class="grid gap-4">
        @for (event of mockEvents; track event.id) {
          <app-glass-card className="p-6 relative overflow-hidden group cursor-pointer hover:border-white/30 transition-colors block">
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b {{ event.color }}"></div>
            
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-[9px] font-bold px-2 py-1 bg-white/10 rounded-full text-white/80 uppercase tracking-widest border border-white/5">
                  {{ event.time }}
                </span>
                <h3 class="text-xl font-serif tracking-wide mt-3 mb-1">{{ event.name }}</h3>
                <p class="text-xs text-white/50 tracking-wider flex items-center gap-1">
                  <mat-icon class="text-[12px] w-[12px] h-[12px]">group</mat-icon> {{ event.attendees }} Orbs Inside
                </p>
              </div>
              <div class="w-12 h-12 rounded-full bg-gradient-to-br {{ event.color }} flex items-center justify-center shadow-lg opacity-80">
                <mat-icon class="text-white">auto_awesome</mat-icon>
              </div>
            </div>

            <div class="pt-4 border-t border-white/5 flex items-center justify-between">
              <div class="flex -space-x-3">
                @for (initial of event.lobby; track $index) {
                  <div class="w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-serif shadow-lg">
                    {{ initial }}
                  </div>
                }
                <div class="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-[10px] text-white/40 italic">
                  +{{ event.attendees - event.lobby.length }}
                </div>
              </div>
              <button class="text-xs uppercase tracking-widest font-bold text-white hover:text-purple-300 transition-colors flex items-center gap-1">
                Enter <mat-icon class="text-[14px] w-[14px] h-[14px]">chevron_right</mat-icon>
              </button>
            </div>
          </app-glass-card>
        }
      </div>
    </div>
  `
})
export class ClubhousesComponent {
  mockEvents = [
    { id: 'ev1', name: "Queer Chess Night", type: "gaming", attendees: 14, color: "from-pink-500 to-purple-500", time: "LIVE", lobby: ['A', 'B', 'C'] },
    { id: 'ev2', name: "Trap & Drill Lounge", type: "music", attendees: 42, color: "from-blue-500 to-cyan-500", time: "In 2h", lobby: ['X', 'Y'] },
    { id: 'ev3', name: "House of X Ball", type: "fashion", attendees: 89, color: "from-yellow-500 to-orange-500", time: "Tonight", lobby: ['L', 'M', 'N', 'O'] }
  ];
}
