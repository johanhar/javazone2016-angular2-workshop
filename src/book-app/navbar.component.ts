import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {Book} from "./books/book.model";

@Component({
    'directives': [SearchComponent, ROUTER_DIRECTIVES],
    'selector': 'navbar',
    'template': `
        <nav class="nav">
            <ul class="nav__links">
                <li><a [routerLink]="['books']">Books</a></li>
                <li><a [routerLink]="['about']">About</a></li>
                <li><a [routerLink]="['contact']">Contact</a></li>
                <li><search (onSearchResult)="showResult($event)"></search></li>
            </ul>
            <span class="nav__title">Book app</span>
        </nav>
    `
})
export class Navbar {
    searchResult: Book[];

    // foreløpig tom
    showResult(result: Book[]) {
        console.log("Showing result in list " + result);
        this.searchResult = result;
    }

}