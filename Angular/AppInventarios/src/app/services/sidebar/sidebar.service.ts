import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarVisibleSubject = new BehaviorSubject<boolean>(true);
  sidebarVisible$ = this.sidebarVisibleSubject.asObservable();

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private checkScreenSize() {
    if (window.innerWidth <= 1080) {
      this.sidebarVisibleSubject.next(false);
    } else {
      this.sidebarVisibleSubject.next(true);
    }
  }

  toggleSidebar() {
    this.sidebarVisibleSubject.next(!this.sidebarVisibleSubject.value);
  }

  setSidebarVisible(value: boolean) {
    this.sidebarVisibleSubject.next(value);
  }

  getSidebarVisible(): boolean {
    return this.sidebarVisibleSubject.value;
  }
}
