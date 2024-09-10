import { Component, NgModule, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

import {SidebarComponent} from "./sidebar/sidebar.component";
import {NavbarComponent} from "./navbar/navbar.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterModule,
        RouterLink,
        HttpClientModule,
        RouterLinkActive,
        RouterOutlet,
        SidebarComponent,
        NavbarComponent,

        ReactiveFormsModule,FormsModule]
})

export class AppComponent implements OnInit{
    constructor(private authService:AuthService){}
    ngOnInit() {
        this.authService.loadJwtTokenFromLocalStorage()
    }

    title = 'staffcheck';
}
