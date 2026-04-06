import { Component, input } from '@angular/core';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  template: `
    <div 
      class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] {{ className() }}"
      (click)="onClick()"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class GlassCardComponent {
  className = input<string>('');
  
  onClick() {
    // Optional click handler
  }
}
