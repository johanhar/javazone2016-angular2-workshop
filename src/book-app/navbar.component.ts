import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    'directives': [ROUTER_DIRECTIVES],
    'selector': 'navbar',
    'template': `
        <nav class="nav">
            <ul class="nav__links">
                <li><a [routerLink]="['books']">Books</a></li>
                <li><a [routerLink]="['about']">About</a></li>
                <li><a [routerLink]="['contact']">Contact</a></li>
            </ul>
            <span class="nav__title">Book app</span>
        </nav>
    `
})
export class Navbar {
}