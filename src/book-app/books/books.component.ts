import { Component } from '@angular/core';

@Component({
    'selector': 'books',
    'template': `
        <h1>Look at all these books!</h1>
        <ul>
            <li *ngFor="let book of books">{{book}}</li>
        </ul>
    `
})
export class Books {
    books: [String] = ['Steelheart', 'Enders game', 'The Name of the Wind']
}