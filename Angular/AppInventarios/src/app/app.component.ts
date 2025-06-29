import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { SidebarService } from './services/sidebar/sidebar.service';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LogginComponent} from './views/loggin/loggin.component'
import { AuthService} from './services/auth/auth.service'

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    LogginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentTitle: string = '';
  sidebarVisible: boolean = true;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sidebarService = inject(SidebarService);
  private authService = inject(AuthService);

  isAuthenticated : boolean = false

  constructor() {

    this.authService.authStatus$.subscribe(status => {
    this.isAuthenticated = status;
  });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.route;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.data['title'] || route.snapshot.routeConfig?.title || '';
      })
    ).subscribe(title => {
      this.currentTitle = title;
    });

    this.sidebarService.sidebarVisible$.subscribe(value => {
      this.sidebarVisible = value;
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

  }
}
