import {Component, inject} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  toggleSidebar() {
    const wrapper = document.getElementById('wrapper');
    const sidebar = document.getElementById('sidebar');

    if (wrapper && sidebar) {
      const isOpen = sidebar.classList.toggle('open');
      wrapper.classList.toggle('sidebar-open', isOpen);
    }
  }

  injector = inject(AuthService);
  router = inject(Router);
  handleLogout() {
    this.injector.logout();

  }
}
