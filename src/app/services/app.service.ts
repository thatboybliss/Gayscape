import { Injectable, signal } from '@angular/core';

export interface User {
  uid: string;
  name: string;
  role: string;
  vibePoints: number;
}

@Injectable({ providedIn: 'root' })
export class AppService {
  user = signal<User | null>(null);
  currentPage = signal<'pulse' | 'clubhouses' | 'chat' | 'profile'>('pulse');
  hasPostedTea = signal<boolean>(false);

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const savedName = localStorage.getItem('gs_name');
      if (savedName) {
        this.user.set({ uid: 'mock-uid-123', name: savedName, role: 'Resident', vibePoints: 120 });
      }
    }
  }

  login(name: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('gs_name', name);
    }
    this.user.set({ uid: 'mock-uid-123', name, role: 'Resident', vibePoints: 120 });
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('gs_name');
    }
    this.user.set(null);
  }
}
