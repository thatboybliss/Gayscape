import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-orb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative flex justify-center items-center py-6 scale-75 md:scale-100">
      <div 
        class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white relative"
        [class.animate-pulse]="animate()"
        [style.boxShadow]="boxShadow()"
      >
        @if (animate()) {
          <div class="absolute inset-0 rounded-full animate-spin duration-[4000ms] opacity-50 border-2 border-white/20"></div>
        }
      </div>
    </div>
  `
})
export class AnimatedOrbComponent {
  vibePoints = input<number>(50);
  colorBase = input<'purple' | 'cyan' | 'gold'>('purple');
  animate = input<boolean>(true);

  intensity = computed(() => Math.min(this.vibePoints() / 2, 60));
  
  colors = computed(() => {
    const map = {
      purple: ['#ee82ee', '#8a2be2'],
      cyan: ['#00F3FF', '#0088FF'],
      gold: ['#FFD700', '#FFA500']
    };
    return map[this.colorBase()] || map.purple;
  });

  boxShadow = computed(() => {
    const [c1, c2] = this.colors();
    const int = this.intensity();
    return `
      inset 0 0 20px #fff,
      inset 10px 0 40px ${c1},
      inset -10px 0 40px ${c2},
      0 0 ${int}px ${c1},
      -10px 0 ${int + 20}px ${c1},
      10px 0 ${int + 20}px ${c2}
    `;
  });
}
