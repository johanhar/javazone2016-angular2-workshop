import { Component } from '@angular/core';
import { Navbar } from './navbar.component';

@Component({
    'directives': [Navbar],
    'selector': 'book-app',
    'template': `
        <div class="main-container">
        
            <navbar></navbar>

            <div class="container">              
               
            </div>
        </div>
    `
    //templateUrl: 'book-app.template.html'
})
export class BookApp {}