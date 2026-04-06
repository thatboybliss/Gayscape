import { Component, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../services/app.service';
import { GlassCardComponent } from '../components/glass-card.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, MatIconModule, GlassCardComponent],
  template: `
    <div class="h-[75vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header class="mb-4 flex justify-between items-end">
        <div>
          <h1 class="text-2xl font-serif tracking-widest uppercase">The Vault</h1>
          <p class="text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-1 mt-1">
            <mat-icon class="text-[10px] w-[10px] h-[10px] text-green-400">security</mat-icon> End-to-End Encrypted
          </p>
        </div>
      </header>

      <app-glass-card className="flex-1 flex flex-col overflow-hidden block h-full">
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          @for (msg of messages(); track msg.id) {
            <div class="flex flex-col" [class.items-end]="msg.isMe" [class.items-start]="!msg.isMe">
              @if (!msg.isSys) {
                <span class="text-[9px] uppercase tracking-wider text-white/40 mb-1 px-1">{{ msg.user }}</span>
              }
              <div class="px-4 py-3 rounded-2xl text-sm tracking-wide"
                   [class.w-full]="msg.isSys" [class.bg-purple-900]="msg.isSys" [class.bg-opacity-20]="msg.isSys" [class.text-purple-300]="msg.isSys" [class.text-center]="msg.isSys" [class.italic]="msg.isSys" [class.border]="msg.isSys" [class.border-purple-500]="msg.isSys" [class.border-opacity-20]="msg.isSys"
                   [class.bg-white]="msg.isMe && !msg.isSys" [class.text-black]="msg.isMe && !msg.isSys" [class.rounded-tr-none]="msg.isMe && !msg.isSys"
                   [class.bg-white]="!msg.isMe && !msg.isSys" [class.bg-opacity-10]="!msg.isMe && !msg.isSys" [class.rounded-tl-none]="!msg.isMe && !msg.isSys" [class.border-white]="!msg.isMe && !msg.isSys" [class.border-opacity-5]="!msg.isMe && !msg.isSys">
                {{ msg.text }}
              </div>
            </div>
          }
          <div #endRef></div>
        </div>

        <form (submit)="send($event)" class="p-3 border-t border-white/10 bg-black/40 flex gap-2">
          <input
            type="text"
            [(ngModel)]="text"
            name="text"
            placeholder="Whisper to the room..."
            class="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 font-serif tracking-wide"
          />
          <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
            <mat-icon class="text-[16px] w-[16px] h-[16px]">send</mat-icon>
          </button>
        </form>
      </app-glass-card>
    </div>
  `
})
export class ChatComponent {
  appService = inject(AppService);
  
  messages = signal([
    { id: 1, user: "System", text: "Welcome to the Brotherhood. Messages self-destruct in 24h.", isSys: true, isMe: false }
  ]);
  text = signal("");

  @ViewChild('endRef') endRef!: ElementRef;

  send(e: Event) {
    e.preventDefault();
    if (!this.text().trim()) return;
    
    this.messages.update(msgs => [
      ...msgs, 
      { id: Date.now(), user: this.appService.user()?.name || 'Me', text: this.text(), isMe: true, isSys: false }
    ]);
    this.text.set("");
    
    setTimeout(() => {
      this.endRef?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}
